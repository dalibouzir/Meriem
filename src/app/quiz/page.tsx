'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Utility to fetch role
async function fetchUserRole() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
    return { role: data?.role || null, userId: user.id };
  }
  return { role: null, userId: null };
}

// Main Page Component
export default function QuestionsPage() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRole().then(({ role, userId }) => {
      setRole(role);
      setUserId(userId);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">جاري التحقق من الصلاحيات...</div>;

  return (
    <div className="questions-page-ar">
      {role === 'therapist'
        ? <TherapistQuestionsTable therapistId={userId} />
        : <UserQuizForm userId={userId} />}
    </div>
  );
}

// Therapist CRUD Table UI
function TherapistQuestionsTable({ therapistId }) {
  const QUESTION_TYPES = [
    { value: 'multiple', label: 'اختيار واحد' },
    { value: 'checkbox', label: 'اختيارات متعددة' },
    { value: 'number', label: 'رقم' },
  ];
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ text: '', type: 'multiple', options: [''], is_active: true });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, []);

  async function fetchQuestions() {
    setLoading(true);
    const { data, error } = await supabase.from('questions').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    setQuestions(data || []);
    setLoading(false);
  }

  function handleFormChange(e, i) {
    const { name, value, type, checked } = e.target;
    if (name === 'options') {
      const options = [...form.options];
      options[i] = value;
      setForm(f => ({ ...f, options }));
    } else if (type === 'checkbox' && name === 'is_active') {
      setForm(f => ({ ...f, is_active: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function addOption() {
    setForm(f => ({ ...f, options: [...f.options, ''] }));
  }
  function removeOption(i) {
    const options = form.options.filter((_, idx) => idx !== i);
    setForm(f => ({ ...f, options }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const options = (form.type === 'number') ? null : form.options.filter(Boolean);
      if ((form.type !== 'number' && (!options || options.length < 2))) {
        setError('أضف خيارين على الأقل');
        setLoading(false);
        return;
      }
      if (!form.text.trim()) {
        setError('نص السؤال مطلوب');
        setLoading(false);
        return;
      }
      if (editingId) {
        const { error } = await supabase.from('questions').update({
          text: form.text, type: form.type, options, is_active: form.is_active
        }).eq('id', editingId);
        if (error) setError(error.message);
      } else {
        const { error } = await supabase.from('questions').insert([
          { text: form.text, type: form.type, options, is_active: form.is_active, created_by: therapistId }
        ]);
        if (error) setError(error.message);
      }
      setForm({ text: '', type: 'multiple', options: [''], is_active: true });
      setEditingId(null);
      fetchQuestions();
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(q) {
    setEditingId(q.id);
    setForm({
      text: q.text,
      type: q.type,
      options: q.options || [''],
      is_active: q.is_active,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;
    setLoading(true);
    await supabase.from('questions').delete().eq('id', id);
    fetchQuestions();
    setLoading(false);
  }

  return (
    <div className="therapist-table">
      <h2 className="page-title">إدارة الأسئلة والاختبارات</h2>
      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit} className="question-form">
        <div>
          <label>نص السؤال</label>
          <input
            name="text"
            className="input"
            value={form.text}
            onChange={handleFormChange}
            required
            placeholder="اكتب نص السؤال هنا"
          />
        </div>
        <div>
          <label>نوع السؤال</label>
          <select name="type" className="input" value={form.type} onChange={handleFormChange}>
            {QUESTION_TYPES.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {(form.type === 'multiple' || form.type === 'checkbox') && (
          <div>
            <label>الخيارات</label>
            {form.options.map((opt, i) => (
              <div key={i} className="option-row">
                <input
                  name="options"
                  value={opt}
                  onChange={e => handleFormChange(e, i)}
                  className="input"
                  placeholder={`الخيار ${i + 1}`}
                  required
                />
                {form.options.length > 2 && (
                  <button type="button" onClick={() => removeOption(i)} className="btn btn-sm btn-danger">حذف</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addOption} className="btn btn-outline btn-sm">إضافة خيار</button>
          </div>
        )}
        <div className="active-row">
          <input
            name="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={handleFormChange}
            id="is_active"
          />
          <label htmlFor="is_active">نشط</label>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" disabled={loading}>{editingId ? 'تحديث' : 'إضافة'} السؤال</button>
          {editingId && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => { setEditingId(null); setForm({ text: '', type: 'multiple', options: [''], is_active: true }) }}>
              إلغاء التعديل
            </button>
          )}
        </div>
      </form>

      <div className="questions-table-wrapper">
        <h3 className="table-title">جميع الأسئلة</h3>
        {loading ? <div>جاري التحميل...</div> : (
          questions.length === 0 ? <div>لا توجد أسئلة بعد.</div> : (
            <table className="questions-table">
              <thead>
                <tr>
                  <th>السؤال</th>
                  <th>النوع</th>
                  <th>الخيارات</th>
                  <th>نشط</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {questions.map(q => (
                  <tr key={q.id}>
                    <td>{q.text}</td>
                    <td>{QUESTION_TYPES.find(t => t.value === q.type)?.label}</td>
                    <td>
                      {(q.options && q.options.length > 0)
                        ? <ul>{q.options.map((opt, i) => <li key={i}>{opt}</li>)}</ul>
                        : <span className="muted">—</span>
                      }
                    </td>
                    <td>{q.is_active ? '✓' : '✗'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline" onClick={() => handleEdit(q)}>تعديل</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q.id)}>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}

// User Quiz Form
function UserQuizForm({ userId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActiveQuestions();
  }, []);

  async function fetchActiveQuestions() {
    setLoading(true);
    const { data } = await supabase.from('questions').select('*').eq('is_active', true);
    setQuestions(data || []);
    setLoading(false);
  }

  function handleChange(q, value) {
    setAnswers(a => ({ ...a, [q.id]: value }));
  }

  function handleCheckboxChange(q, idx) {
    const prev = Array.isArray(answers[q.id]) ? answers[q.id] : [];
    if (prev.includes(idx)) {
      handleChange(q, prev.filter(i => i !== idx));
    } else {
      handleChange(q, [...prev, idx]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      for (const q of questions) {
        const ans = answers[q.id];
        if (typeof ans === 'undefined' || ans === null || (Array.isArray(ans) && ans.length === 0) || ans === '') {
          setError('الرجاء الإجابة على جميع الأسئلة');
          setLoading(false);
          return;
        }
      }
      // Store answers one by one
      for (const q of questions) {
        let answerValue = answers[q.id];
        // For multiple: store index; for checkbox: indices; for number: value
        await supabase.from('answers').insert([
          {
            question_id: q.id,
            user_id: userId,
            answer: answerValue,
          }
        ]);
      }
      setSent(true);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ يرجى المحاولة لاحقاً');
      setLoading(false);
    }
  }

  if (loading) return <div>جاري التحميل...</div>;
  if (sent) return <div className="success-box">تم إرسال إجاباتك بنجاح، شكراً لمشاركتك!</div>;

  return (
    <form onSubmit={handleSubmit} className="user-quiz-form">
      <h2 className="page-title">استبيان الأسئلة</h2>
      {error && <div className="error-box">{error}</div>}
      {questions.length === 0
        ? <div>لا توجد أسئلة حالياً.</div>
        : (
          <>
            {questions.map(q => (
              <div className="user-question" key={q.id}>
                <div className="question-label">{q.text}</div>
                {q.type === 'multiple' && (
                  <div className="choices">
                    {q.options.map((opt, idx) => (
                      <label key={idx} className="choice">
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          checked={answers[q.id] === idx}
                          onChange={() => handleChange(q, idx)}
                          required
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === 'checkbox' && (
                  <div className="choices">
                    {q.options.map((opt, idx) => (
                      <label key={idx} className="choice">
                        <input
                          type="checkbox"
                          checked={Array.isArray(answers[q.id]) && answers[q.id].includes(idx)}
                          onChange={() => handleCheckboxChange(q, idx)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === 'number' && (
                  <input
                    type="number"
                    className="input"
                    value={answers[q.id] || ''}
                    onChange={e => handleChange(q, e.target.value)}
                    required
                  />
                )}
              </div>
            ))}
            <button className="btn btn-primary" disabled={loading}>إرسال الإجابات</button>
          </>
        )}
    </form>
  );
}

