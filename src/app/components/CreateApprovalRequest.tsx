import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ArrowLeft, Send } from 'lucide-react'
import { toast } from 'sonner'

export function CreateApprovalRequest() {
  const navigate = useNavigate();
  const [source, setSource] = useState('SO123 - Đơn hàng bán')
  const [reason, setReason] = useState('')
  const [workflow, setWorkflow] = useState('Kinh doanh → Kế toán → Giám đốc')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reason.trim()) {
      toast.error('Vui lòng nhập lý do yêu cầu phê duyệt')
      return
    }

    toast.success('Yêu cầu phê duyệt đã được gửi')
    navigate('/approval')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-30">
        <button 
          onClick={() => navigate('/approval')}
          className="flex items-center gap-2 text-emerald-700 mb-4 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium text-sm">Quay lại</span>
        </button>
        
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Tạo yêu cầu phê duyệt
        </h1>
        <p className="text-xs text-gray-500">
          Gửi yêu cầu phê duyệt cho cấp trên
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pt-6 space-y-5">
        {/* Nguồn */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Label htmlFor="source" className="text-sm font-semibold text-gray-900 mb-2 block">
            Nguồn
          </Label>
          <Input
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Chứng từ cần phê duyệt
          </p>
        </div>

        {/* Lý do */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Label htmlFor="reason" className="text-sm font-semibold text-gray-900 mb-2 block">
            Lý do <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do yêu cầu phê duyệt..."
            rows={5}
            className="resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Mô tả chi tiết lý do cần phê duyệt
          </p>
        </div>

        {/* Luồng duyệt */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Label htmlFor="workflow" className="text-sm font-semibold text-gray-900 mb-2 block">
            Luồng duyệt
          </Label>
          <Input
            id="workflow"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Quy trình phê duyệt được áp dụng
          </p>
        </div>

        {/* Thông tin bổ sung */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h3 className="font-semibold text-emerald-900 text-sm mb-2">
            Lưu ý
          </h3>
          <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
            <li>Yêu cầu sẽ được gửi đến cấp duyệt đầu tiên</li>
            <li>Bạn sẽ nhận thông báo khi có cập nhật</li>
            <li>Có thể theo dõi tiến trình tại tab "Yêu cầu của tôi"</li>
          </ul>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-base font-medium"
          >
            <Send className="h-5 w-5 mr-2" />
            Gửi yêu cầu phê duyệt
          </Button>
        </div>
      </form>
    </div>
  )
}
