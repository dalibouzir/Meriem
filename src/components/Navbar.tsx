'use client';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">EmotionAI</Link>

        <div className="links">
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#courses">Courses</Link>
          <Link href="/quiz">Q&A</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
  <Link href="/auth/login" className="btn-outline navbar-btn">Login</Link>
  <Link href="/auth/signup" className="btn-primary navbar-btn">Sign Up</Link>
</div>

      </div>
    </nav>
  );
}
