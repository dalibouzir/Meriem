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
    { title: 'إتقان إدارة التوتر', desc: 'تقنيات عملية للحد من التوتر، من تمارين التنفس إلى إعادة الهيكلة المعرفية.', imgQuery: 'stress', duration: '٤ أسابيع' },
    { title: 'معسكر المرونة', desc: 'بناء مرونة لا تهتز من خلال عادات صغيرة يومية وتحولات عقلية مستهدفة.', imgQuery: 'resilience', duration: '٦ أسابيع' },
    { title: 'أساسيات اليقظة الذهنية', desc: 'مقدمة في ممارسة اليقظة: تأملات موجهة، تمارين كتابة، وأدوات فحص ذاتي.', imgQuery: 'mindfulness', duration: '٣ أسابيع' },
  ]

  const features = [
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/artificial-intelligence.png', text: 'وحدات مساعدة ذاتية مدفوعة بالذكاء الاصطناعي مصممة خصيصاً لمشاعرك الفريدة' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/yoga.png', text: 'تمارين موجهة لتخفيف التوتر، إدارة القلق، وتعزيز التركيز' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/video-call.png', text: 'جلسات فيديو فورية مع معالجة معتمدة حسب راحتك' },
    { icon: 'https://img.icons8.com/ios-filled/50/7C3AED/combo-chart--v1.png', text: 'لوحات متابعة التقدم وتوصيات مخصصة للخطوة التالية' },
  ]

  const instaUrls = [
    'https://www.instagram.com/p/DFs2LSKsWtg/',
    'https://www.instagram.com/p/DFcimmAMFhg/',
    'https://www.instagram.com/p/DFYiYpEsoZU/',
    'https://www.instagram.com/p/DFa4E51slkg/',
  ]

  return (
    <main dir="rtl" lang="ar">

      {/* HERO */}
      <section id="home" className="hero section-white">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          عزز مشاعرك مع <span className="highlight">منصة مريم بوزير العلاجية</span>
        </motion.h1>
        <motion.p className="lead" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          منصة شاملة تجمع أحدث أدوات الذكاء الاصطناعي مع تمارين تفاعلية وجلسات علاجية مباشرة لمساعدتك على الازدهار.
        </motion.p>
        <motion.div className="btn-group" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }}>
          <Link href="/quiz" className="btn-outline">ابدأ اختبار المزاج</Link>
          <Link href="#about" className="btn-primary">اكتشف المزيد</Link>
        </motion.div>
        <motion.p className="testimonial" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.6 }}>
          "ساعدتني منصة مريم بوزير العلاجية على استعادة السيطرة على توتري — بسيطة، ذكية، وداعمة." &mdash; ألكس ر.
        </motion.p>
      </section>

      {/* ABOUT */}
      <section id="about" className="section section-purple-50 text-left-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          ماذا تقدم منصة مريم بوزير العلاجية؟
        </motion.h2>
        <motion.div className="about-grid" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          {features.map(f => (
            <div className="about-item" key={f.text}>
              <img src={f.icon} alt="" className="about-icon" />
              <p className="section-text">{f.text}</p>
            </div>
          ))}
        </motion.div>
        <p className="subheading">لماذا تختار منصة مريم بوزير العلاجية؟</p>
        <p className="section-text">
          من المبتدئين إلى المتمرسين، منصتنا تتكيف مع وتيرتك وأسلوبك. 
          استكشف وحدات التدريب عند الطلب، واحصل على شارات عند تحقيق الإنجازات، وتواصل مباشرة مع مريم بوزير، أخصائية العلاج الرئيسية لدينا.
        </p>
      </section>

      {/* COURSES & PROGRAMS */}
      <section id="courses" className="section section-white text-right-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          الدورات والبرامج
        </motion.h2>
        <motion.div className="courses-grid" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          {courses.map(c => (
            <div className="card" key={c.title}>
              <div className="card-img" style={{ backgroundImage: `url(https://source.unsplash.com/random/400x200?${c.imgQuery})` }} />
              <div className="card-content">
                <h3>{c.title}</h3>
                <p className="section-text">{c.desc}</p>
                <div className="card-meta">المدة: {c.duration}</div>
                <Link href="/signup" className="btn-primary">سجل الآن</Link>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* VIDEO HIGHLIGHTS */}
      <section id="highlights" className="section section-purple-50 text-left-md">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          مقتطفات من الدورات بالفيديو
        </motion.h2>
        <p className="subheading">
          لمحة من جلساتنا — مستخدمون حقيقيون يواجهون تحديات حقيقية، بتوجيه من الذكاء الاصطناعي والتعاطف الإنساني.
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

      {/* CONTACT */}
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
          تعرف على أخصائيتك
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
            alt="مريم بوزير"
            width={300}
            height={300}
            className="therapist-photo"
          />

          <div className="contact-info">
            <p className="section-text">
              <strong>مريم بوزير</strong> هي المؤسسة والمعالجة الرئيسية وراء منصة منصة مريم بوزير العلاجية.
              بخبرة تزيد عن عشر سنوات في العلاج المعرفي السلوكي واليقظة الذهنية،
              تمزج بين التعاطف والأساليب العلمية وذكاء الآلة لإرشادك.
            </p>
            <p className="section-text">
              احجز <strong>استشارة مجانية لمدة 15 دقيقة</strong> لاكتشاف كيف يمكن لـ منصة مريم بوزير العلاجية دعم رحلتك.
            </p>
            <div className="btn-group">
              <Link href="mailto:meriem.bouzir@example.com" className="btn-outline">
                راسل مريم
              </Link>
              <Link href="/signup" className="btn-primary">
                احجز جلسة
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
              alt="فيسبوك"
              className="social-icon"
            />
          </a>
          <a href="https://www.instagram.com/meriem.bouzir/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/000000/instagram-new.png"
              alt="إنستغرام"
              className="social-icon"
            />
          </a>
          <a href="https://www.linkedin.com/in/meriem-bouzir-917624135/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/000000/linkedin-circled.png"
              alt="لينكدإن"
              className="social-icon"
            />
          </a>
          <a href="https://www.youtube.com/@Haythem.meriem.podcast" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/000000/youtube-play.png"
              alt="يوتيوب"
              className="social-icon"
            />
          </a>
        </motion.div>
      </section>

    </main>
  )
}
