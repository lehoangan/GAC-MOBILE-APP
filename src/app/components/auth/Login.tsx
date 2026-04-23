import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Logo & Title */}
      <div className="mb-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-emerald-100 shrink-0">
            <img 
              src="https://goachau.vn/wp-content/uploads/2022/11/logo.png" 
              alt="Gỗ Á Châu Logo" 
              className="h-20 w-auto object-contain" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-black text-amber-950 italic tracking-tighter leading-none mb-2">ERP</h1>
            <p className="text-emerald-700/70 font-bold text-[10px] uppercase tracking-[0.2em] max-w-[150px] leading-tight">Hệ thống quản lý doanh nghiệp</p>
          </div>
        </motion.div>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-emerald-200/50 p-6"
      >

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-900 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="taikhoan@goacchau.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white/50 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-900 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white/50 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate('/auth/forgot-password')}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Đăng nhập</span>
              </>
            )}
          </button>

          {/* Note */}
          <div className="text-center pt-4 border-t border-emerald-200/50">
            <p className="text-xs text-emerald-700/60">
              Sử dụng chung mật khẩu với tài khoản Odoo
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
