'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

type UserProfile = { name: string } | null;

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(null);
  const router = useRouter();

  // Fetch and listen for auth changes
  useEffect(() => {
    // Helper to fetch user and profile
    const fetchProfile = async (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        const { data } = await supabase
          .from('users')
          .select('name')
          .eq('id', currentUser.id)
          .single();
        setProfile(data as UserProfile);
      } else {
        setProfile(null);
      }
    };

    // Initial user check
    supabase.auth.getUser().then(({ data: { user } }) => {
      fetchProfile(user);
    });

    // Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchProfile(session?.user ?? null);
    });

    // Cleanup on unmount
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="navbar" dir="rtl" lang="ar">
      <div className="container">
        {/* Right: Logo */}
        <Link href="/" className="logo">منصة مريم بوزير العلاجية</Link>

        {/* Middle: Navigation */}
        <div className="links">
          <Link href="/#home">الرئيسية</Link>
          <Link href="/#about">من نحن</Link>
          <Link href="/#courses">الدورات</Link>
          <Link href="/quiz">الأسئلة والأجوبة</Link>
          <Link href="/#contact">تواصل معنا</Link>
        </div>

        {/* Left: Auth/Profile actions */}
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
