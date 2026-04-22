import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ApprovalRequest } from './ApprovalCard'
import { ApprovalTimeline, ApprovalStep } from './ApprovalTimeline'
import { ApprovalBadge } from './ApprovalBadge'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ArrowLeft, FileText } from 'lucide-react'
import { toast } from 'sonner'

export function ApprovalDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const request = (location.state as { request?: ApprovalRequest })?.request

  if (!request) {
    navigate('/approval')
    return null
  }
  const [comment, setComment] = useState('')
  
  // Mock approval steps
  const approvalSteps: ApprovalStep[] = [
    {
      level: 1,
      role: 'Trưởng phòng kinh doanh',
      status: 'approved',
      approver: 'Nguyễn Văn A',
      comment: 'Đồng ý, khách hàng quan trọng',
      timestamp: '5 giờ trước'
    },
    {
      level: 2,
      role: 'Kế toán',
      status: request.status === 'pending' ? 'pending' : 'approved',
      approver: request.status !== 'pending' ? 'Trần Thị B' : undefined,
      comment: request.status !== 'pending' ? 'Đã kiểm tra, chấp thuận' : undefined,
      timestamp: request.status !== 'pending' ? '2 giờ trước' : undefined
    },
    {
      level: 3,
      role: 'Giám đốc',
      status: request.status === 'approved' ? 'approved' : 'waiting',
      approver: request.status === 'approved' ? 'Lê Văn C' : undefined,
      comment: request.status === 'approved' ? 'Phê duyệt' : undefined,
      timestamp: request.status === 'approved' ? '1 giờ trước' : undefined
    }
  ]

  const isPending = request.status === 'pending'
  const currentUserLevel = 2 // Mock: user hiện tại là kế toán (level 2)
  const canApprove = isPending && currentUserLevel === 2

  const handleApprove = () => {
    toast.success('Đã phê duyệt yêu cầu')
    navigate('/approval')
  }

  const handleReject = () => {
    toast.error('Đã từ chối yêu cầu')
    navigate('/approval')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 pt-4 pb-6 border-b border-amber-100 sticky top-0 z-10">
        <button
          onClick={() => navigate('/approval')}
          className="flex items-center gap-2 text-amber-900 mb-4 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại</span>
        </button>
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-amber-900 mb-1">
              {request.code}
            </h1>
            <p className="text-sm text-amber-700/70">{request.type}</p>
          </div>
          <ApprovalBadge status={request.status} />
        </div>
        
        {request.amount > 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50">
            <p className="text-xs text-gray-600 mb-0.5">Số tiền</p>
            <p className="text-xl font-bold text-amber-700">
              {request.amount.toLocaleString('vi-VN')} ₫
            </p>
          </div>
        )}
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Thông tin chứng từ */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-amber-600" />
            <h2 className="font-semibold text-gray-900">Thông tin chứng từ</h2>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Mã chứng từ</p>
              <p className="text-sm font-medium text-gray-900">{request.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Loại</p>
              <p className="text-sm font-medium text-gray-900">{request.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Thời gian tạo</p>
              <p className="text-sm font-medium text-gray-900">{request.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Thông tin đơn hàng (Dành riêng cho đơn hàng giá đặc biệt) */}
        {request.type === 'Đơn hàng giá đặc biệt' && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-amber-600" />
              <h2 className="font-semibold text-gray-900">Thông tin đơn hàng</h2>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Mã đơn</p>
                <p className="text-sm font-medium text-gray-900">{request.code}</p>
              </div>
              {request.customer && (
                <div>
                  <p className="text-xs text-gray-500">Khách hàng</p>
                  <p className="text-sm font-medium text-gray-900">{request.customer}</p>
                </div>
              )}
              <div className="flex gap-8">
                {request.standardPrice && (
                  <div>
                    <p className="text-xs text-gray-500">Giá chuẩn</p>
                    <p className="text-sm font-medium line-through text-gray-500">{request.standardPrice.toLocaleString('vi-VN')} ₫</p>
                  </div>
                )}
                {request.proposedPrice && (
                  <div>
                    <p className="text-xs text-gray-500">Giá đề xuất</p>
                    <p className="text-sm font-bold text-amber-700">{request.proposedPrice.toLocaleString('vi-VN')} ₫</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lý do */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">Lý do</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {request.reason}
          </p>
        </div>

        {/* Quy trình duyệt */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Quy trình duyệt</h2>
          <ApprovalTimeline 
            steps={approvalSteps} 
            currentUserLevel={canApprove ? currentUserLevel : undefined}
          />
        </div>

        {/* Input ý kiến (chỉ hiển thị nếu đang chờ duyệt) */}
        {canApprove && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">Ý kiến của bạn</h2>
            <Textarea
              placeholder="Nhập ý kiến..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        )}
      </div>

      {/* Action buttons - Fixed at bottom */}
      {canApprove && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg safe-area-pb">
          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 h-12 border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800"
            >
              Từ chối
            </Button>
            <Button
              onClick={handleApprove}
              className="flex-1 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              Duyệt
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
