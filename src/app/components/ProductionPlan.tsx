import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { 
  Factory, 
  Calendar as CalendarIcon, 
  Filter, 
  GripVertical, 
  Play, 
  Package, 
  CheckCircle, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Settings,
  MoreVertical,
  ClipboardList,
  Search,
  User as UserIcon
} from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog'
import { Card } from './ui/card'
import { cn } from './ui/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface PlanItem {
  id: number
  soNumber: string
  customer: string
  store: string
  moNumber: string
  machine: string
  productCode: string
  film: string
  face: string
  quantity: number
  status: 'planned' | 'producing' | 'completed'
  materialsIssued: boolean
  assignee: string
}

interface QCRecord {
  id: string
  moNumber: string
  productName: string
  machine: string
  inspector: string
  status: 'in-progress' | 'completed'
  date: string
  quantity: number
  qtyB?: number
  qtyR?: number
  issues: string[]
  notes?: string
}

interface ProductionPlanGroup {
  id: string
  planCode: string
  expectedDate: string
  status: 'draft' | 'planned' | 'producing' | 'completed' | 'failed' | 'cancelled'
  items: PlanItem[]
  qcRecords: QCRecord[]
}

export function ProductionPlan() {
  const navigate = useNavigate()
  const [view, setView] = useState<'list' | 'detail'>('list')
  const [selectedPlan, setSelectedPlan] = useState<ProductionPlanGroup | null>(null)
  const [issues, setIssues] = useState<Record<string, { hasDiscrepancy: boolean; desc: string; reported?: boolean; showConsumption?: boolean }>>({})
  
  // Filters
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])
  const [statusFilter, setStatusFilter] = useState('all')
  const [machineFilter, setMachineFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  const [planGroups, setPlanGroups] = useState<ProductionPlanGroup[]>([
    {
      id: 'P001',
      planCode: 'KH-SX-001',
      expectedDate: today,
      status: 'producing',
      items: [
        { id: 1, soNumber: 'DH001', customer: 'Nội Thất Việt', store: 'Kho A', moNumber: 'MO-001', machine: 'Máy 01', productCode: 'Bàn Gỗ Sồi', film: 'Melamine', face: '2', quantity: 50, status: 'producing', materialsIssued: true, assignee: 'Quản đốc A' },
        { id: 2, soNumber: 'DH002', customer: 'Luxury Hotel', store: 'Kho B', moNumber: 'MO-002', machine: 'Máy 02', productCode: 'Ghế Ergonomic', film: 'Veneer', face: '1', quantity: 120, status: 'producing', materialsIssued: true, assignee: 'Tổ trưởng B' },
      ],
      qcRecords: [
        { 
          id: 'QC-101', 
          moNumber: 'MO-001', 
          productName: 'Bàn Gỗ Sồi',
          machine: 'Máy 01',
          inspector: 'Nguyễn QC', 
          status: 'completed', 
          date: today, 
          quantity: 50,
          qtyB: 0,
          qtyR: 0,
          issues: [],
          notes: 'Mặt bàn láng mịn, cạnh chỉ dán đều.' 
        },
        { 
          id: 'QC-102', 
          moNumber: 'MO-002', 
          productName: 'Ghế Ergonomic',
          machine: 'Máy 02',
          inspector: 'Trần QC', 
          status: 'in-progress', 
          date: today,
          quantity: 120,
          qtyB: 2,
          qtyR: 1,
          issues: ['Kiểm tra độ nhám bề mặt', 'Kiểm tra khớp nối']
        }
      ]
    },
    {
      id: 'P002',
      planCode: 'KH-SX-002',
      expectedDate: today,
      status: 'planned',
      items: [
        { id: 3, soNumber: 'DH003', customer: 'Nguyễn Văn A', store: 'Kho A', moNumber: 'MO-003', machine: 'Máy 03', productCode: 'Tủ Áo Nordic', film: 'Acrylic', face: '1', quantity: 30, status: 'planned', materialsIssued: false, assignee: 'Tổ trưởng C' },
        { id: 4, soNumber: 'DH004', customer: 'ABC Corp', store: 'Kho C', moNumber: 'MO-004', machine: 'Máy 01', productCode: 'Kệ Sách', film: 'Melamine', face: '2', quantity: 80, status: 'planned', materialsIssued: false, assignee: 'Kỹ thuật P' },
      ],
      qcRecords: []
    },
    {
      id: 'P003',
      planCode: 'KH-SX-003',
      expectedDate: today,
      status: 'draft',
      items: [
        { id: 5, soNumber: 'DH005', customer: 'Trần Thị B', store: 'Kho B', moNumber: 'MO-005', machine: 'Máy 02', productCode: 'Giường Gỗ', film: 'Veneer', face: '2', quantity: 15, status: 'planned', materialsIssued: false, assignee: 'Kỹ thuật Q' },
      ],
      qcRecords: []
    },
    {
      id: 'P004',
      planCode: 'KH-SX-004',
      expectedDate: yesterday,
      status: 'completed',
      items: [
        { id: 6, soNumber: 'DH006', customer: 'Văn phòng XYZ', store: 'Kho A', moNumber: 'MO-006', machine: 'Máy 04', productCode: 'Bàn Họp', film: 'Melamine', face: '2', quantity: 5, status: 'completed', materialsIssued: true, assignee: 'Quản đốc A' },
      ],
      qcRecords: [
        { 
          id: 'QC-098', 
          moNumber: 'MO-006', 
          productName: 'Bàn Họp',
          machine: 'Máy 04',
          inspector: 'Nguyễn QC', 
          status: 'completed', 
          date: yesterday, 
          quantity: 5,
          qtyB: 0,
          qtyR: 0,
          issues: [],
          notes: 'Đạt yêu cầu xuất xưởng.' 
        }
      ]
    },
    {
      id: 'P005',
      planCode: 'KH-SX-005',
      expectedDate: tomorrow,
      status: 'draft',
      items: [
        { id: 7, soNumber: 'DH007', customer: 'Khách lẻ H', store: 'Kho C', moNumber: 'MO-007', machine: 'Máy 01', productCode: 'Kệ TV', film: 'Laminate', face: '1', quantity: 10, status: 'planned', materialsIssued: false, assignee: 'Kỹ thuật P' },
      ],
      qcRecords: []
    }
  ])

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'draft': return { label: 'Nháp', color: 'bg-gray-100 text-gray-600 border-gray-200' }
      case 'planned': return { label: 'Lên Kế hoạch', color: 'bg-blue-100 text-blue-700 border-blue-200' }
      case 'producing': return { label: 'Đang sản xuất', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
      case 'completed': return { label: 'Hoàn Tất', color: 'bg-green-100 text-green-700 border-green-200' }
      case 'failed': return { label: 'Rớt', color: 'bg-red-100 text-red-700 border-red-200' }
      case 'cancelled': return { label: 'Hủy', color: 'bg-slate-100 text-slate-500 border-slate-200' }
      default: return { label: status, color: 'bg-gray-100 text-gray-600' }
    }
  }

  const handlePlanClick = (plan: ProductionPlanGroup) => {
    setSelectedPlan(plan)
    setView('detail')
  }

  const updatePlanStatus = (planId: string, newStatus: ProductionPlanGroup['status']) => {
    setPlanGroups(prev => prev.map(p => p.id === planId ? { ...p, status: newStatus } : p))
    if (selectedPlan?.id === planId) {
      setSelectedPlan(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const issueMaterials = (planId: string, machine: string) => {
    setPlanGroups(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          items: p.items.map(item => item.machine === machine ? { ...item, materialsIssued: true } : item)
        }
      }
      return p
    }))

    if (selectedPlan?.id === planId) {
      setSelectedPlan(prev => prev ? {
        ...prev,
        items: prev.items.map(item => item.machine === machine ? { ...item, materialsIssued: true } : item)
      } : null)
    }

    const assigneesInCharge = Array.from(new Set(selectedPlan?.items.filter(p => p.machine === machine).map(p => p.assignee))).join(', ')
    const msg = `[Hệ thống Odoo] Thông báo đẩy: "NVL cho máy ${machine} đã được tập kết đầy đủ."\nĐã gửi đến người phụ trách lệnh: ${assigneesInCharge}`;
    setTimeout(() => alert(msg), 300)
  }

  const reportDiscrepancy = (planId: string, machine: string) => {
    const discrepancy = issues[`${planId}-${machine}`];
    if (!discrepancy || !discrepancy.desc?.trim()) {
      alert("Vui lòng nhập mô tả chi tiết lý do/số lượng sai lệch NVL!");
      return;
    }

    const assigneesInCharge = Array.from(new Set(selectedPlan?.items.filter(p => p.machine === machine).map(p => p.assignee))).join(', ')
    const msg = `[QUAN TRỌNG - Báo cáo Odoo & App]\nGhi nhận sai lệch cấp NVL tại ${machine}!\nChi tiết: "${discrepancy.desc}"\nThông báo đã được đồng bộ lên Odoo và tới người phụ trách: ${assigneesInCharge}`;

    setTimeout(() => alert(msg), 300)
    setIssues(prev => ({...prev, [`${planId}-${machine}`]: {...prev[`${planId}-${machine}`], reported: true}}));
  }

  const completeMachineProduction = (planId: string, machine: string) => {
    setPlanGroups(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          items: p.items.map(item => item.machine === machine ? { ...item, status: 'completed' as const } : item)
        }
      }
      return p
    }))

    if (selectedPlan?.id === planId) {
      setSelectedPlan(prev => prev ? {
        ...prev,
        items: prev.items.map(item => item.machine === machine ? { ...item, status: 'completed' as const } : item)
      } : null)
    }

    alert(`Đã xác nhận tiêu hao và hoàn tất sản xuất cho ${machine}`);
  }

  const filteredGroups = planGroups.filter(g => {
    const matchesDate = g.expectedDate === dateFilter
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter
    const matchesMachine = machineFilter === 'All' || g.items.some(item => item.machine === machineFilter)
    
    const searchLower = searchTerm.toLowerCase().trim()
    const matchesSearch = searchLower === '' || 
      g.planCode.toLowerCase().includes(searchLower) ||
      g.items.some(item => 
        item.productCode.toLowerCase().includes(searchLower) ||
        item.moNumber.toLowerCase().includes(searchLower) ||
        item.soNumber.toLowerCase().includes(searchLower) ||
        item.assignee.toLowerCase().includes(searchLower) ||
        item.customer.toLowerCase().includes(searchLower)
      )

    return matchesDate && matchesStatus && matchesMachine && matchesSearch
  })

  const uniqueMachines = Array.from(new Set(planGroups.flatMap(g => g.items.map(i => i.machine))))

  // --- DETAIL VIEW LOGIC ---
  const handleStartItemProduction = (itemId: number) => {
    if (!selectedPlan) return
    const updatedPlan = {
      ...selectedPlan,
      items: selectedPlan.items.map(item => item.id === itemId ? { ...item, status: 'producing' as const } : item)
    }
    setSelectedPlan(updatedPlan)
    setPlanGroups(prev => prev.map(p => p.id === selectedPlan.id ? updatedPlan : p))
  }

  const renderListView = () => (
    <div className="space-y-4">
      {/* Header & Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-sm">
            <ClipboardList className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Danh sách kế hoạch</h1>
            <p className="text-xs text-gray-500">{filteredGroups.length} kế hoạch được tìm thấy</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Tìm sản phẩm, MO, SO, người phụ trách..."
          className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-100 rounded-xl leading-5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <Card className="p-3 border-0 shadow-sm bg-white space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">Ngày dự kiến</label>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              <CalendarIcon className="h-4 w-4 text-emerald-500" />
              <input 
                type="date" 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">Trạng thái</label>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              <Filter className="h-4 w-4 text-emerald-500" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-full appearance-none"
              >
                <option value="all">Tất cả</option>
                <option value="draft">Nháp</option>
                <option value="planned">Lên kế hoạch</option>
                <option value="producing">Đang sản xuất</option>
                <option value="completed">Hoàn tất</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-gray-400">Theo Máy</label>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
            <Settings className="h-4 w-4 text-emerald-500" />
            <select 
              value={machineFilter} 
              onChange={(e) => setMachineFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-full appearance-none"
            >
              <option value="All">Tất cả các máy</option>
              {uniqueMachines.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Plan Cards */}
      <div className="grid gap-4">
        {filteredGroups.map((plan) => {
          const status = getStatusInfo(plan.status)
          const machines = Array.from(new Set(plan.items.map(i => i.machine)))
          
          return (
            <Card 
              key={plan.id} 
              className="overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all active:scale-[0.98]"
              onClick={() => handlePlanClick(plan)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{plan.planCode}</h3>
                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                      <CalendarIcon className="h-3 w-3 mr-1 text-emerald-500" />
                      Ngày: {plan.expectedDate}
                    </p>
                  </div>
                  <Badge className={cn("border", status.color)}>
                    {status.label}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {machines.map(m => (
                      <Badge key={m} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-normal text-[10px]">
                        {m}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="text-xs text-gray-400">
                      <span className="font-bold text-gray-600">{plan.items.length}</span> lệnh sản xuất
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
              </div>
              
              {plan.status === 'draft' && (
                <div className="bg-emerald-50/50 p-2 border-t border-emerald-100 flex justify-end px-4">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs text-emerald-700 font-bold hover:bg-emerald-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      updatePlanStatus(plan.id, 'planned')
                    }}
                  >
                    Lên kế hoạch ngay
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderMaterialIssueList = (plan: ProductionPlanGroup) => {
    const machinesInPlan = Array.from(new Set(plan.items.map(i => i.machine)))
    
    return (
      <div className="space-y-4 pt-2 px-1">
        {machinesInPlan.filter(m => {
          const items = plan.items.filter(p => p.machine === m);
          return !items.every(p => p.status === 'completed');
        }).map(machine => {
          const itemsInMachine = plan.items.filter(p => p.machine === machine);
          const isIssued = itemsInMachine.length > 0 && itemsInMachine.every(p => p.materialsIssued);
          const totalProducts = itemsInMachine.reduce((acc, curr) => acc + curr.quantity, 0);
          const issueKey = `${plan.id}-${machine}`;

          return (
            <Card key={machine} className={`p-4 border-0 shadow-sm ${isIssued ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{machine}</h4>
                  <p className="text-xs text-gray-500">Chạy {itemsInMachine.length} lệnh sản xuất • Tổng: {totalProducts} SP</p>
                </div>
                {isIssued ? (
                  <Badge className="bg-green-100 text-green-700 border-none font-medium">Đã xuất kho</Badge>
                ) : (
                  <Badge className="bg-emerald-100 text-emerald-700 border-none">Chờ xuất NVL</Badge>
                )}
              </div>
              
              {!isIssued ? (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Vật tư dự kiến ráp cấp:</p>
                  <ul className="text-xs text-gray-600 space-y-1.5 mb-4">
                    <li className="flex justify-between"><span>Gỗ MDF / Nguyên liệu chính:</span> <strong>{totalProducts * 2} tấm</strong></li>
                    <li className="flex justify-between"><span>Viền chỉ nhựa:</span> <strong>{totalProducts * 4.5} mét</strong></li>
                    <li className="flex justify-between"><span>Keo nóng (PUR):</span> <strong>{(totalProducts * 0.1).toFixed(1)} kg</strong></li>
                  </ul>

                  <Button 
                    onClick={() => issueMaterials(plan.id, machine)}
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Cấp NVL cho {machine}
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mt-2 text-sm text-green-700 flex items-center mb-3">
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Toàn bộ NVL cho {machine} đã tập kết.
                  </div>
                  
                  {!issues[issueKey]?.reported ? (
                    <div className="bg-emerald-50/50 p-3 border border-emerald-100 rounded-lg text-sm mb-3">
                      <label className="flex items-center gap-2 cursor-pointer text-emerald-900 font-medium pb-2">
                        <input 
                          type="checkbox" 
                          className="rounded text-emerald-500 w-4 h-4 cursor-pointer focus:ring-emerald-500"
                          checked={issues[issueKey]?.hasDiscrepancy || false}
                          onChange={(e) => setIssues(prev => ({...prev, [issueKey]: {...prev[issueKey], hasDiscrepancy: e.target.checked}}))}
                        />
                        Báo cáo sai lệch / thiếu NVL
                      </label>
                      
                      {issues[issueKey]?.hasDiscrepancy && (
                        <div className="mt-1">
                          <textarea 
                            className="w-full text-sm border-emerald-300 rounded p-2 focus:border-emerald-500 focus:ring-emerald-500 outline-none block bg-white placeholder-gray-400 mb-2"
                            rows={2}
                            placeholder="Nhập chi tiết sai lệch..."
                            value={issues[issueKey]?.desc || ''}
                            onChange={(e) => setIssues(prev => ({...prev, [issueKey]: {...prev[issueKey], desc: e.target.value}}))}
                          ></textarea>
                          <Button onClick={() => reportDiscrepancy(plan.id, machine)} size="sm" variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-100">
                            <AlertCircle className="h-4 w-4 mr-2"/>
                            Gửi báo cáo Odoo
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-emerald-700 flex items-center bg-emerald-50 p-2 border border-emerald-100 rounded mb-3">
                      <AlertCircle className="h-4 w-4 mr-1.5" />
                      Đã báo cáo sai lệch lên hệ thống.
                    </div>
                  )}

                  {/* Tiêu hao NVL section */}
                  <div className="border-t border-gray-100 pt-3">
                     <Button 
                       variant="outline" 
                       size="sm" 
                       className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                       onClick={() => {
                         setIssues(prev => ({
                           ...prev, 
                           [issueKey]: { ...prev[issueKey], showConsumption: !prev[issueKey]?.showConsumption }
                         }))
                       }}
                     >
                       <ClipboardList className="h-4 w-4 mr-2" />
                       Tiêu hao NVL thực tế
                     </Button>

                     {issues[issueKey]?.showConsumption && (
                       <div className="mt-3 p-3 bg-blue-50/30 rounded-lg space-y-3 border border-blue-100">
                         <div className="grid grid-cols-2 gap-3">
                           <div className="space-y-1">
                             <label className="text-[10px] font-bold text-blue-900 uppercase">Gỗ MDF (Tấm)</label>
                             <input type="number" className="w-full p-2 text-sm rounded border-blue-200" placeholder="0" />
                           </div>
                           <div className="space-y-1">
                             <label className="text-[10px] font-bold text-blue-900 uppercase">Chỉ nhựa (Mét)</label>
                             <input type="number" className="w-full p-2 text-sm rounded border-blue-200" placeholder="0" />
                           </div>
                         </div>
                         <div className="space-y-1">
                           <label className="text-[10px] font-bold text-blue-900 uppercase">Keo nóng (Kg)</label>
                           <input type="number" className="w-full p-2 text-sm rounded border-blue-200" placeholder="0.0" step="0.1" />
                         </div>
                         <Button 
                           className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                           onClick={() => completeMachineProduction(plan.id, machine)}
                         >
                           Xác nhận tiêu hao & Hoàn tất
                         </Button>
                       </div>
                     )}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    )
  }

  const renderDetailView = () => {
    if (!selectedPlan) return null
    const status = getStatusInfo(selectedPlan.status)
    const machines = Array.from(new Set(selectedPlan.items.map(i => i.machine)))

    return (
      <div className="space-y-4">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={() => setView('list')} className="p-0 hover:bg-transparent text-emerald-600 font-bold">
            <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
          </Button>
          <Badge className={cn("border", status.color)}>{status.label}</Badge>
        </div>

        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex justify-between items-start mb-4">
             <div>
               <h2 className="text-xl font-bold text-gray-900">{selectedPlan.planCode}</h2>
               <p className="text-sm text-gray-500">Kế hoạch cho ngày {selectedPlan.expectedDate}</p>
             </div>
             <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
               <MoreVertical className="h-4 w-4" />
             </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
             {machines.map(m => (
               <Badge key={m} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1">
                 {m}
               </Badge>
             ))}
          </div>
        </Card>

        {/* Tabs for MO, NVL, and QC */}
        <div className="pb-32">
          <Tabs defaultValue="mo" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 p-1 rounded-xl shadow-sm mb-4 sticky top-16 z-20">
              <TabsTrigger value="mo" className="flex items-center justify-center space-x-2 py-2.5 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 rounded-lg transition-all">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline font-bold text-sm">Lệnh sản xuất</span>
                <span className="sm:hidden font-bold text-xs">MO</span>
              </TabsTrigger>
              <TabsTrigger value="nvl" className="flex items-center justify-center space-x-2 py-2.5 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 rounded-lg transition-all">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline font-bold text-sm">Phiếu xuất NVL</span>
                <span className="sm:hidden font-bold text-xs">NVL</span>
              </TabsTrigger>
              <TabsTrigger value="qc" className="flex items-center justify-center space-x-2 py-2.5 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 rounded-lg transition-all">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline font-bold text-sm">Kiểm tra chất lượng</span>
                <span className="sm:hidden font-bold text-xs">QC</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mo" className="mt-0">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm">Chi tiết các lệnh (MO)</h3>
                  <Badge variant="secondary" className="bg-gray-200">{selectedPlan.items.length} MO</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="px-4 py-3 text-center">Thao tác</th>
                        <th className="px-4 py-3">Mã MO</th>
                        <th className="px-4 py-3">Người phụ trách</th>
                        <th className="px-4 py-3">Sản phẩm</th>
                        <th className="px-4 py-3 text-center">SL</th>
                        <th className="px-4 py-3">Máy</th>
                        <th className="px-4 py-3">Trạng thái</th>
                        <th className="px-4 py-3">Khách hàng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <TooltipProvider>
                        {selectedPlan.items.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {item.status === 'planned' ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleStartItemProduction(item.id)}>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Bắt đầu sản xuất lệnh này</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 text-green-600 hover:bg-green-50"
                                        onClick={() => navigate('/production/quality', { state: { newQcPlan: item } })}
                                      >
                                        <ShieldCheck className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Kiểm tra chất lượng (QC KCS)</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 font-bold text-emerald-700">{item.moNumber}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2 bg-blue-50/50 px-2 py-1 rounded-md border border-blue-100 w-fit">
                                <UserIcon className="h-3 w-3 text-blue-500" />
                                <span className="text-xs font-bold text-blue-700">{item.assignee}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-gray-900 font-bold">{item.productCode}</div>
                              <div className="text-[10px] text-gray-400">{item.film} • {item.face} mặt</div>
                            </td>
                            <td className="px-4 py-4 text-center font-bold">{item.quantity}</td>
                            <td className="px-4 py-4">
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">{item.machine}</Badge>
                            </td>
                            <td className="px-4 py-4">
                              {item.status === 'planned' ? <Badge className="bg-blue-100 text-blue-700 border-0">Chờ</Badge> : 
                                item.status === 'producing' ? <Badge className="bg-emerald-100 text-emerald-700 border-0">SX</Badge> :
                                <Badge className="bg-green-100 text-green-700 border-0">Xong</Badge>}
                            </td>
                            <td className="px-4 py-4 text-gray-700 font-medium">{item.customer}</td>
                          </tr>
                        ))}
                      </TooltipProvider>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nvl" className="mt-0">
               {renderMaterialIssueList(selectedPlan)}
            </TabsContent>

            <TabsContent value="qc" className="mt-0">
               <div className="space-y-4 pt-2 px-1">
                 {selectedPlan.qcRecords.length === 0 ? (
                   <Card className="p-8 text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
                     <ShieldCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                     <p className="text-gray-500 font-medium">Chưa có bản ghi kiểm tra chất lượng nào.</p>
                     <p className="text-xs text-gray-400 mt-1">Các bản ghi sẽ xuất hiện sau khi thực hiện QC cho các lệnh MO.</p>
                   </Card>
                 ) : (
                   selectedPlan.qcRecords.map(record => (
                     <Card key={record.id} className="p-4 border-0 shadow-sm bg-white overflow-hidden relative">
                       <div className={cn(
                         "absolute top-0 right-0 w-1.5 h-full",
                         record.status === 'completed' ? "bg-green-500" : "bg-emerald-500"
                       )} />
                       
                       <div className="space-y-3">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className="font-bold text-sm text-gray-900">{record.productName}</h4>
                             <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                               <Badge variant="outline" className="px-1 py-0 text-emerald-700 border-emerald-200 bg-emerald-50 h-4">
                                 {record.moNumber}
                               </Badge>
                               <span>• {record.machine}</span>
                             </p>
                           </div>
                           <Badge className={cn(
                             "border-0 shadow-sm text-[10px] h-5",
                             record.status === 'completed' ? "bg-green-100 text-green-700" : "bg-emerald-100 text-emerald-700"
                           )}>
                             {record.status === 'completed' ? 'Hoàn tất' : 'Đang kiểm tra'}
                           </Badge>
                         </div>

                         <div className="grid grid-cols-2 gap-y-2 text-xs border-t border-gray-50 pt-3">
                           <div className="flex flex-col">
                             <span className="text-gray-400 text-[10px] uppercase font-bold">Số lượng</span>
                             <span className="font-bold text-gray-700">{record.quantity} sản phẩm</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-gray-400 text-[10px] uppercase font-bold">Người kiểm tra</span>
                             <span className="font-bold text-gray-700">{record.inspector || '---'}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-gray-400 text-[10px] uppercase font-bold">Ngày kiểm</span>
                             <span className="font-bold text-gray-700">{record.date}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-gray-400 text-[10px] uppercase font-bold">Mã bản ghi</span>
                             <span className="font-bold text-gray-700">{record.id}</span>
                           </div>
                         </div>

                         {/* Classification Detail - Matching QualityControl.tsx */}
                         <div className="bg-gray-50/80 p-2.5 rounded-lg border border-gray-100">
                           <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Phân loại chất lượng</p>
                           <div className="grid grid-cols-3 gap-2">
                             <div className="bg-white p-1.5 rounded border border-green-100 text-center shadow-sm">
                               <div className="text-[9px] text-green-600 font-bold">Hạng A</div>
                               <div className="text-sm font-black text-green-700">{(record.quantity - (record.qtyB || 0) - (record.qtyR || 0))}</div>
                             </div>
                             <div className="bg-white p-1.5 rounded border border-emerald-100 text-center shadow-sm">
                               <div className="text-[9px] text-emerald-600 font-bold">Hạng B</div>
                               <div className="text-sm font-black text-emerald-700">{record.qtyB || 0}</div>
                             </div>
                             <div className="bg-white p-1.5 rounded border border-red-100 text-center shadow-sm">
                               <div className="text-[9px] text-red-600 font-bold">Hạng R</div>
                               <div className="text-sm font-black text-red-700">{record.qtyR || 0}</div>
                             </div>
                           </div>
                         </div>

                         {record.issues && record.issues.length > 0 && (
                           <div className="space-y-1.5">
                             <p className="text-[10px] font-bold text-gray-500 uppercase">Danh sách lỗi/vấn đề</p>
                             <div className="flex flex-wrap gap-1.5">
                               {record.issues.map((issue, idx) => (
                                 <Badge key={idx} variant="secondary" className="bg-red-50 text-red-700 border-red-100 text-[10px] font-medium">
                                   • {issue}
                                 </Badge>
                               ))}
                             </div>
                           </div>
                         )}

                         {record.notes && (
                           <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                             <p className="text-[10px] font-bold text-blue-700 uppercase mb-1 flex items-center gap-1">
                               <AlertCircle className="h-3 w-3" /> Ghi chú từ QC
                             </p>
                             <p className="text-xs text-blue-900 leading-relaxed italic">"{record.notes}"</p>
                           </div>
                         )}
                       </div>
                     </Card>
                   ))
                 )}
               </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Bottom Action Bar */}
        {selectedPlan.status !== 'completed' && selectedPlan.status !== 'cancelled' && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
            <div className="max-w-md mx-auto">
              {selectedPlan.status === 'draft' ? (
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-200"
                  onClick={() => updatePlanStatus(selectedPlan.id, 'planned')}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Xác nhận Lên Kế hoạch
                </Button>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-green-200"
                  onClick={() => updatePlanStatus(selectedPlan.id, 'completed')}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Hoàn tất toàn bộ kế hoạch
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen">
       {view === 'list' ? renderListView() : renderDetailView()}
    </div>
  )
}