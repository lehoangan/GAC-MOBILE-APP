import { CheckCircle2, Circle, Clock } from 'lucide-react'

export type ApprovalStepStatus = 'approved' | 'pending' | 'waiting'

export interface ApprovalStep {
  level: number
  role: string
  status: ApprovalStepStatus
  approver?: string
  comment?: string
  timestamp?: string
}

interface ApprovalTimelineProps {
  steps: ApprovalStep[]
  currentUserLevel?: number
}

export function ApprovalTimeline({ steps, currentUserLevel }: ApprovalTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const isCurrentUser = currentUserLevel === step.level

        return (
          <div key={step.level} className="flex gap-3">
            {/* Timeline icon */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.status === 'approved' 
                  ? 'bg-green-50 border-green-500'
                  : step.status === 'pending'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                {step.status === 'approved' && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
                {step.status === 'pending' && (
                  <Clock className="h-5 w-5 text-yellow-600" />
                )}
                {step.status === 'waiting' && (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {!isLast && (
                <div className={`w-0.5 h-12 ${
                  step.status === 'approved' ? 'bg-green-200' : 'bg-gray-200'
                }`} />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-6 ${isCurrentUser ? 'bg-emerald-50 -ml-2 pl-2 pr-2 py-2 rounded-xl border-l-4 border-emerald-500' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Cấp {step.level} - {step.role}
                    </span>
                    {isCurrentUser && (
                      <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        Đang chờ bạn
                      </span>
                    )}
                  </div>
                  {step.approver && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      {step.approver}
                    </p>
                  )}
                  {step.comment && (
                    <p className="text-sm text-gray-700 mt-2 italic">
                      "{step.comment}"
                    </p>
                  )}
                </div>
                <div className="text-right">
                  {step.status === 'approved' && (
                    <span className="text-xs text-green-600 font-medium">
                      Đã duyệt
                    </span>
                  )}
                  {step.status === 'pending' && (
                    <span className="text-xs text-yellow-600 font-medium">
                      Đang chờ
                    </span>
                  )}
                  {step.status === 'waiting' && (
                    <span className="text-xs text-gray-400 font-medium">
                      Chưa tới lượt
                    </span>
                  )}
                  {step.timestamp && (
                    <p className="text-xs text-gray-500 mt-1">
                      {step.timestamp}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
