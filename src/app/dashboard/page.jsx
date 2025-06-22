'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Helper for type labels
const TYPE_LABELS = {
  multiple: 'اختيار واحد',
  checkbox: 'اختيارات متعددة',
  number: 'رقم'
};

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: qs } = await supabase.from('questions').select('*');
      const { data: as } = await supabase.from('answers').select('*');
      setQuestions(qs || []);
      setAnswers(as || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Insights
  const totalQuestions = questions.length;
  const totalAnswers = answers.length;

  // Avg answers per question
  const avgAnswersPerQ = totalQuestions > 0 ? (totalAnswers / totalQuestions).toFixed(1) : 0;

  // Question type distribution
  const typeCounts = questions.reduce((acc, q) => {
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
  }, {});
  const typeDist = Object.entries(typeCounts).map(([type, count]) => ({
    label: TYPE_LABELS[type] || type,
    count,
    percent: totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0
  }));

  // Most answered questions (top 3)
  const qAnswerCount = questions.map(q => ({
    ...q,
    answerCount: answers.filter(a => a.question_id === q.id).length
  })).sort((a, b) => b.answerCount - a.answerCount);

  // User activity
  const userActivity = answers.reduce((acc, a) => {
    acc[a.user_id || 'زائر'] = (acc[a.user_id || 'زائر'] || 0) + 1;
    return acc;
  }, {});
  const topUsers = Object.entries(userActivity).sort((a,b)=>b[1]-a[1]).slice(0,3);

  // Storytelling text
  function getNarrative() {
    let txt = `المنصة تضم ${totalQuestions} سؤالاً تمت الإجابة عليها ${totalAnswers} مرة. `;
    if (typeDist.length > 0) {
      txt += `أكثر نوع من الأسئلة هو "${typeDist[0].label}" بنسبة ${typeDist[0].percent}%. `;
    }
    if (qAnswerCount.length > 0 && qAnswerCount[0].answerCount > 0) {
      txt += `السؤال الأكثر تفاعلاً: "${qAnswerCount[0].text}" بعدد ${qAnswerCount[0].answerCount} إجابة. `;
    }
    txt += `متوسط الإجابات لكل سؤال هو ${avgAnswersPerQ}. `;
    if (topUsers.length > 0) {
      txt += `أكثر المستخدمين نشاطاً: ${topUsers.map(([uid, count])=>uid==='زائر'?'زائر':uid).join('، ')}.`;
    }
    return txt;
  }

  return (
    <div className="dashboard-ar">
      <h1 className="dashboard-title">لوحة القيادة التحليلية للمنتدى</h1>
      {loading ? <div className="loading">جاري تحميل البيانات...</div> : (
        <div className="dashboard-content">
          <section className="dashboard-cards">
            <div className="dash-card">
              <div className="dash-card-label">عدد الأسئلة</div>
              <div className="dash-card-num">{totalQuestions}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-label">عدد الإجابات</div>
              <div className="dash-card-num">{totalAnswers}</div>
            </div>
            <div className="dash-card">
              <div className="dash-card-label">متوسط الإجابات/سؤال</div>
              <div className="dash-card-num">{avgAnswersPerQ}</div>
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">توزيع أنواع الأسئلة</h2>
            <div className="type-dist-list">
              {typeDist.map(t => (
                <div key={t.label} className="type-dist-item">
                  <span>{t.label}</span>
                  <span className="bar" style={{width: `${t.percent}%`}}></span>
                  <span className="type-dist-num">{t.count} ({t.percent}%)</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">الأسئلة الأكثر تفاعلاً</h2>
            <ul className="top-q-list">
              {qAnswerCount.slice(0,3).map(q => (
                <li key={q.id}>
                  <span className="top-q-text">{q.text}</span>
                  <span className="top-q-count">{q.answerCount} إجابة</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">أنشط المستخدمين (معرف أو زائر)</h2>
            <ul className="top-user-list">
              {topUsers.map(([uid,count], i) => (
                <li key={uid}>
                  <span className="top-user-rank">{i+1}.</span>
                  <span className="top-user-id">{uid === 'زائر' ? 'زائر' : uid}</span>
                  <span className="top-user-count">{count} إجابة</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section-title">ملخص قصصي</h2>
            <div className="narrative">
              {getNarrative()}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
