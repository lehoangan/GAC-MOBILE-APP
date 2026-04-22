import { Badge } from './ui/badge'

type ApprovalStatus = 'pending' | 'approved' | 'rejected'

interface ApprovalBadgeProps {
  status: ApprovalStatus
}

export function ApprovalBadge({ status }: ApprovalBadgeProps) {
  const config = {
    pending: {
      label: 'Cần duyệt',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
    approved: {
      label: 'Đã duyệt',
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    rejected: {
      label: 'Từ chối',
      className: 'bg-red-100 text-red-800 border-red-300',
    },
  }

  const { label, className } = config[status]

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}
