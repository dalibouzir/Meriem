"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  Emotion,
  Question,
  questionPool,
  emotions,
  emotionResults,
} from "./questions";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PIE_COLORS = [
  "#7c3aed",
  "#f59e42",
  "#22c55e",
  "#ef4444",
  "#6366f1",
  "#eab308",
  "#ec4899",
];

type PieStat = { name: Emotion; count: number };

const EMOTIONS_GRID_ORDER: Emotion[] = [
  "Joy",
  "Pride",
  "Love",
  "Hope",
  "Trust",
  "Contentment",
  "Surprise",
  "Anticipation",
  "Bittersweet",
  "Vulnerability",
  "Shame",
  "Guilt",
  "Anger",
  "Loneliness",
  "Sadness",
  "Grief",
  "Anxiety",
  "Overwhelm",
  "Exhaustion",
  "Arousal",
  "Numbness",
  "Envy",
  "Jealousy",
  "Disgust",
  "Contempt",
];

export default function QuizPage() {
  const [quizQs, setQuizQs] = useState<Question[] | null>(null);
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<Emotion, number>>(
    Object.fromEntries(emotions.map((e) => [e, 0])) as Record<Emotion, number>
  );
  const [scaleValue, setScaleValue] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Emotion | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [pieStats, setPieStats] = useState<PieStat[]>([]);

  // Quiz logic
  useEffect(() => {
    setQuizQs(shuffle(questionPool).slice(0, 25));
    // Check auth ONCE
    supabase.auth
      .getUser()
      .then(({ data }) => setUserId(data?.user?.id ?? null));
  }, []);

  // Pie stats logic
  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from("quiz_results")
        .select("top_emotion");
      if (!data) return;
      const counts: Record<Emotion, number> = Object.fromEntries(
        emotions.map((e) => [e, 0])
      ) as Record<Emotion, number>;
      (data as { top_emotion: Emotion }[]).forEach((r) => {
        if (
          r.top_emotion &&
          typeof r.top_emotion === "string" &&
          r.top_emotion in counts
        ) {
          counts[r.top_emotion as Emotion] =
            (counts[r.top_emotion as Emotion] ?? 0) + 1;
        }
      });
      const arr: PieStat[] = emotions.map((e) => ({
        name: e,
        count: counts[e],
      }));
      setPieStats(arr);
    }
    fetchStats();
  }, []);

  useEffect(() => {
    const q = quizQs?.[step];
    if (q && q.type === "scale") setScaleValue(q.min);
  }, [step, quizQs]);

  const total = quizQs?.length ?? 0;

  const handleAnswer = async (ans: string) => {
    const q = quizQs![step];
    const next = { ...scores };
    if (q.type === "yesno") {
      if (ans === "Yes") next[q.mapping]++;
    } else if (q.type === "scale") {
      next[q.mapping] += Number(ans);
    } else if (q.type === "options") {
      next[q.mapping[ans]]++;
    }
    setScores(next);

    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setSaveStatus(null);
      await new Promise((r) => setTimeout(r, 800));
      const top = (Object.entries(next) as [Emotion, number][]).sort(
        (a, b) => b[1] - a[1]
      )[0][0] as Emotion;
      setResult(top);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const uid = userData?.user?.id || null;
        setUserId(uid);
        const totalScore = Object.values(next).reduce((a, b) => a + b, 0);
        const { error } = await supabase.from("quiz_results").insert([
          {
            user_id: uid,
            date_taken: new Date().toISOString(),
            score: totalScore,
            recommended_course_id: null,
            top_emotion: top,
          },
        ]);
        if (error) setSaveStatus("❌ Error saving quiz result.");
        else setSaveStatus("✅ Quiz result saved!");
      } catch {
        setSaveStatus("❌ Exception saving quiz result.");
      }
      setLoading(false);
    }
  };

  const retake = () => window.location.reload();

  // Render
  if (!quizQs) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner mb-4" />
        <p className="text-lg font-medium">Loading your quiz…</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner mb-4" />
        <p className="text-lg font-medium">Processing your results…</p>
      </div>
    );
  }

  if (result) {
    const { emoji, label, description, tip } = emotionResults[result];
    return (
      <section className="emotion-grid-section">
        <div className="quiz-card" style={{ margin: "auto" }}>
          <div className="mb-4 text-5xl">{emoji}</div>
          <h2 className="text-3xl font-bold mb-2">{label}</h2>
          <p className="text-gray-700 text-lg mb-2">{description}</p>
          {tip && (
            <p className="text-indigo-600 text-base mb-2">
              <b>Tip:</b> {tip}
            </p>
          )}
          {saveStatus && (
            <div
              style={{
                margin: "1rem 0",
                fontWeight: 500,
                color: saveStatus.startsWith("✅") ? "#22c55e" : "#ef4444",
              }}
            >
              {saveStatus}
            </div>
          )}
          <button onClick={retake} className="btn-primary">
            Retake Quiz
          </button>
        </div>
      </section>
    );
  }

  // --- Page Intro Section ---
  const Intro = (
    <div className="emotion-intro">
      <h1>Welcome to the EmotionAI Quiz</h1>
      <p>
        Discover your most prominent emotion today! This interactive grid helps
        you recognize, understand, and manage your feelings. Take the quiz at
        the center to get your top emotion and see expert tips for every mood.
        <br />
        <span style={{ color: "#7c3aed" }}>
          Sign in to view community emotion trends.
        </span>
      </p>
    </div>
  );

  return (
    <section className="emotion-grid-section">
      {Intro}
      <div className="emotion-grid">
        {EMOTIONS_GRID_ORDER.map((em, i) =>
          i === 12 ? (
            <div key="quiz" className="emotion-quiz-cell emotion-quiz-gap">
              <div className="quiz-card quiz-card-v2 emotion-quiz-fancy">
                <div className="progress-container">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${((step + 1) / total) * 100}%` }}
                    />
                  </div>
                  <div className="progress-number">
                    {step + 1} <span className="progress-divider">/</span>{" "}
                    {total}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.38 }}
                  >
                    <h2 className="quiz-q-hero">{quizQs[step].q}</h2>
                    {quizQs[step].type === "yesno" && (
                      <div className="options">
                        {["Yes", "No"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            className="btn-outline"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {quizQs[step].type === "scale" && (
                      <div className="scale-block">
                        <input
                          type="range"
                          min={(quizQs[step] as { min: number }).min}
                          max={(quizQs[step] as { max: number }).max}
                          value={scaleValue}
                          onChange={(e) =>
                            setScaleValue(Number(e.target.value))
                          }
                          className="slider"
                        />
                        <div className="scale-labels">
                          {Array.from(
                            {
                              length:
                                (quizQs[step] as { max: number; min: number })
                                  .max -
                                (quizQs[step] as { min: number }).min +
                                1,
                            },
                            (_, idx) => (
                              <span key={idx}>
                                {(quizQs[step] as { min: number }).min + idx}
                              </span>
                            )
                          )}
                        </div>
                        <button
                          onClick={() => handleAnswer(String(scaleValue))}
                          className="btn-primary next-shadow"
                        >
                          Next
                        </button>
                      </div>
                    )}
                    {quizQs[step].type === "options" && (
                      <div className="options">
                        {(quizQs[step] as { options: string[] }).options.map(
                          (opt) => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(opt)}
                              className="btn-outline"
                            >
                              {opt}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div key={em} className="emotion-cell">
              <div className="emotion-card emotion-card-full">
                <span className="emotion-emoji">
                  {emotionResults[em].emoji}
                </span>
                <span className="emotion-name">{emotionResults[em].label}</span>
                <span className="emotion-desc">
                  {emotionResults[em].description}
                </span>
                {emotionResults[em].tip && (
                  <span className="emotion-tip">
                    <b>Tip:</b> {emotionResults[em].tip}
                  </span>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* PIE CHART + TOP 10 BOX */}
      <div className="emotion-pie-section">
        <div className="emotion-pie-card" style={{ position: "relative" }}>
          <h3>Community Emotion Distribution</h3>
          <div
            className={
              userId
                ? "pie-protected-content"
                : "pie-protected-content blurred-pie"
            }
          >
            {/* Chart */}
            <div className="emotion-pie-visual">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieStats.filter(
                      (s) => s.count > 0 && s.name !== "Grief"
                    )}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                  >
                    {pieStats
                      .filter((s) => s.count > 0 && s.name !== "Grief")
                      .map((entry, idx) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[idx % PIE_COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1.5px solid #7c3aed",
                      color: "#222",
                      borderRadius: "12px",
                      fontSize: "1.03rem",
                      boxShadow: "0 3px 16px #eee",
                      padding: "0.8rem 1rem",
                    }}
                    formatter={(value: number, name: string) => {
                      const emotion = emotionResults[name as Emotion];
                      const total = pieStats.reduce((a, b) => a + b.count, 0);
                      const percent =
                        total > 0 ? Math.round((value / total) * 100) : 0;
                      return [
                        <span>
                          <span style={{ fontSize: "1.22rem", marginRight: 8 }}>
                            {emotion.emoji}
                          </span>
                          <b>{emotion.label}</b>:{" "}
                          <span style={{ color: "#7c3aed" }}>{value}</span>{" "}
                          result
                          {value === 1 ? "" : "s"}
                          <br />
                          <span style={{ color: "#6d28d9" }}>
                            {percent}% of users
                          </span>
                        </span>,
                      ];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* TOP 10 EMOTIONS */}
            <div className="top10-emotions-box">
              <div className="top10-title">Top 10 Emotions</div>
              <div className="top10-list">
                {pieStats
                  .filter((s) => s.count > 0)
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((stat) => (
                    <div className="top10-emotion-row" key={stat.name}>
                      <span className="top10-emotion-emoji">
                        {emotionResults[stat.name].emoji}
                      </span>
                      <span className="top10-emotion-label">
                        {emotionResults[stat.name].label}
                      </span>
                      <span className="top10-emotion-value">
                        {Math.round(
                          (stat.count /
                            pieStats.reduce((a, b) => a + b.count, 0)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Overlay: Only when not logged in */}
          {!userId && (
            <div className="pie-signin-cover">
              <div>
                <p style={{ marginBottom: "1.1rem" }}>
                  Please sign in to view the community insights.
                </p>
                <a href="/auth/login" className="btn-signin">
                  Sign In
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
