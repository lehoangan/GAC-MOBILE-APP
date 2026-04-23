import { ApprovalBadge } from './ApprovalBadge'
import { Clock } from 'lucide-react'

type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface ApprovalRequest {
  id: string
  code: string
  type: string
  amount: number
  reason: string
  status: ApprovalStatus
  currentStep: string
  timestamp: string
  customer?: string
  standardPrice?: number
  proposedPrice?: number
}

interface ApprovalCardProps {
  request: ApprovalRequest
  onClick: () => void
}

export function ApprovalCard({ request, onClick }: ApprovalCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {request.code} - {request.type}
          </h3>
          <p className="text-lg font-bold text-emerald-700">
            {request.amount.toLocaleString('vi-VN')} ₫
          </p>
        </div>
        <ApprovalBadge status={request.status} />
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-1">
        {request.reason}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
          <span className="font-medium text-gray-700">{request.currentStep}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{request.timestamp}</span>
        </div>
      </div>
    </div>
  )
}
