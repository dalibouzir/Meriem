'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Script from 'next/script'
import Image from 'next/image'
import '../styles/globals.css'
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const courses = [
    { title: 'Stress Management Mastery', desc: 'Practical techniques to reduce stress, from breathwork to cognitive reframing.', imgQuery: 'stress', duration: '4 weeks' },
    { title: 'Resilience Bootcamp', desc: 'Build unshakeable resilience with daily micro-habits and targeted mindset shifts.', imgQuery: 'resilience', duration: '6 weeks' },
    { title: 'Mindfulness 101', desc: 'Intro to mindfulness practice: guided meditations, journaling prompts, and self-check tools.', imgQuery: 'mindfulness', duration: '3 weeks' },
  ]

  const features = [
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/artificial-intelligence.png', text: 'AI-driven self-help modules tailored to your unique emotional profile' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/yoga.png', text: 'Guided exercises for stress relief, anxiety management & improved focus' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/video-call.png', text: 'On-demand video chats with a licensed therapist at your convenience' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/combo-chart--v1.png', text: 'Progress tracking dashboards & personalized next-step recommendations' },
  ]

  const instaUrls = [
    'https://www.instagram.com/p/DFs2LSKsWtg/',
    'https://www.instagram.com/p/DFcimmAMFhg/',
    'https://www.instagram.com/p/DFYiYpEsoZU/',
    'https://www.instagram.com/p/DFa4E51slkg/',
  ]

  return (
    <main>

      {/* HERO */}
      <section id="home" className="hero section-white">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          Empower Your Emotions with <span className="highlight">EmotionAI</span>
        </motion.h1>
        <motion.p className="lead" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          A one-stop platform combining cutting-edge AI tools, interactive practices, and real-time therapy to help you thrive.
        </motion.p>
        <motion.div className="btn-group" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }}>
          <Link href="/quiz" className="btn-outline">Take the Mood Quiz</Link>
          <Link href="#about" className="btn-primary">Discover More</Link>
        </motion.div>
        <motion.p className="testimonial" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.6 }}>
          “EmotionAI helped me regain control over my stress—simple, smart, and supportive.” &mdash; Alex R.
        </motion.p>
      </section>

      {/* ABOUT */}
      <section id="about" className="section section-purple-50 text-left-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          What EmotionAI Brings
        </motion.h2>
        <motion.div className="about-grid" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          {features.map(f => (
            <div className="about-item" key={f.text}>
              <img src={f.icon} alt="" className="about-icon" />
              <p className="section-text">{f.text}</p>
            </div>
          ))}
        </motion.div>
        <p className="subheading">Why choose EmotionAI?</p>
        <p className="section-text">
          From beginners to seasoned practitioners, our platform adapts to your pace and style. 
          Dive into on-demand modules, earn badges for milestones, and chat live with Meriem Bouzir, our lead therapist.
        </p>
      </section>

      {/* COURSES & PROGRAMS */}
      <section id="courses" className="section section-white text-right-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          Courses & Programs
        </motion.h2>
        <motion.div className="courses-grid" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          {courses.map(c => (
            <div className="card" key={c.title}>
              <div className="card-img" style={{ backgroundImage: `url(https://source.unsplash.com/random/400x200?${c.imgQuery})` }} />
              <div className="card-content">
                <h3>{c.title}</h3>
                <p className="section-text">{c.desc}</p>
                <div className="card-meta">Duration: {c.duration}</div>
                <Link href="/signup" className="btn-primary">Enroll Now</Link>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* VIDEO HIGHLIGHTS */}
      <section id="highlights" className="section section-purple-50 text-left-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          Course Video Highlights
        </motion.h2>
        <p className="subheading">
          Peek inside our sessions—real users navigating real challenges, guided by AI and human empathy.
        </p>
        <motion.div className="courses-grid" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          {instaUrls.map(url => (
            <blockquote
              key={url}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            />
          ))}
        </motion.div>
        <Script
  src="https://www.instagram.com/embed.js"
  strategy="lazyOnload"
  onLoad={() => window.instgrm?.Embeds.process()}
/>

      </section>


<section
  id="contact"
  className="section section-purple-200 text-left-md"
>
  <motion.h2
    className="section-title contact-title"
    initial="hidden"
    whileInView="visible"
    variants={fadeUp}
    transition={{ duration: 0.6 }}
  >
    Meet Your Therapist
  </motion.h2>

  <motion.div
    className="contact-container"
    initial="hidden"
    whileInView="visible"
    variants={fadeUp}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
<Image
  src="/images/meriem.jpg"
  alt="Meriem Bouzir"
  width={300}
  height={300}
  className="therapist-photo"
/>


    <div className="contact-info">
      <p className="section-text">
        <strong>Meriem Bouzir</strong> is the founder and lead therapist behind EmotionAI. 
        With over 10 years of experience in Cognitive Behavioral Therapy and Mindfulness, 
        she blends empathy, evidence-based techniques, and AI insights to guide you.
      </p>
      <p className="section-text">
        Schedule a <strong>free 15-minute consultation</strong> to explore how EmotionAI can support your journey.
      </p>
      <div className="btn-group">
        <Link href="mailto:meriem.bouzir@example.com" className="btn-outline">
          Email Meriem
        </Link>
        <Link href="/signup" className="btn-primary">
          Book a Session
        </Link>
      </div>
    </div>
  </motion.div>

  <motion.div
    className="social-links"
    initial="hidden"
    whileInView="visible"
    variants={fadeUp}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <a href="https://www.facebook.com/myriem.bouzir" target="_blank" rel="noreferrer">
      <img
        src="https://img.icons8.com/color/48/000000/facebook-new.png"
        alt="Facebook"
        className="social-icon"
      />
    </a>
    <a href="https://www.instagram.com/meriem.bouzir/" target="_blank" rel="noreferrer">
      <img
        src="https://img.icons8.com/color/48/000000/instagram-new.png"
        alt="Instagram"
        className="social-icon"
      />
    </a>
    <a href="https://www.linkedin.com/in/meriem-bouzir-917624135/" target="_blank" rel="noreferrer">
      <img
        src="https://img.icons8.com/color/48/000000/linkedin-circled.png"
        alt="LinkedIn"
        className="social-icon"
      />
    </a>
    <a href="https://www.youtube.com/@Haythem.meriem.podcast" target="_blank" rel="noreferrer">
      <img
        src="https://img.icons8.com/color/48/000000/youtube-play.png"
        alt="YouTube"
        className="social-icon"
      />
    </a>
  </motion.div>
</section>


    </main>
  )
}
