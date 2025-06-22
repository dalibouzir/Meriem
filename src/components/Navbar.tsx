'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// User profile type
type UserProfile = { name: string } | null;

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from('users')
          .select('name')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            setProfile(data as UserProfile);
          });
      } else {
        setProfile(null);
      }
    });
  }, []);

  return (
    <nav className="navbar" dir="rtl" lang="ar">
      <div className="container">
        {/* Far right: Logo */}
        <Link href="/" className="logo">منصة مريم بوزير العلاجية</Link>

        {/* Middle: Links */}
        <div className="links">
          <Link href="/#home">الرئيسية</Link>
          <Link href="/#about">من نحن</Link>
          <Link href="/#courses">الدورات</Link>
          <Link href="/quiz">الأسئلة والأجوبة</Link>
          <Link href="/#contact">تواصل معنا</Link>
        </div>

        {/* Far left: Auth/Profile */}
        <div className="left-section">
          {!user ? (
            <>
              <Link href="/auth/login" className="btn-outline navbar-btn">تسجيل الدخول</Link>
              <Link href="/auth/signup" className="btn-primary navbar-btn">إنشاء حساب</Link>
            </>
          ) : (
            <>
              <div className="user-profile-name">
                {profile?.name || 'المستخدم'}
              </div>
              <button
                className="btn-outline navbar-btn"
                style={{ marginRight: '10px' }}
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/auth/login");
                }}
              >
                تسجيل الخروج
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
