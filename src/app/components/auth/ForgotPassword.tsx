import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/auth/login')}
        className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Quay lại đăng nhập</span>
      </button>

      {/* Logo & Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4"
        >
          <Mail className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Quên mật khẩu</h1>
        <p className="text-amber-700/70 text-sm">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-amber-200/50 p-6"
      >
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="taikhoan@goacchau.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white/50 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Gửi yêu cầu đặt lại mật khẩu</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Email đã được gửi!</h3>
            <p className="text-sm text-amber-700/70 mb-6">
              Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className="text-amber-600 hover:text-amber-700 font-medium hover:underline transition-colors"
            >
              Quay lại đăng nhập
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
