import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { CheckCircle, XCircle, Clock, AlertCircle, PackagePlus, ShieldCheck, Search } from 'lucide-react'
import { cn } from './ui/utils'

export function QualityControl() {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [qualityData, setQualityData] = useState({
    'in-progress': [
      {
        id: 3,
        productName: 'ECO Chống ẩm E2 12x1220x2440 Phủ Men 3',
        batch: 'MO-003',
        quantity: 150,
        qtyB: 2,
        qtyR: 1,
        inspector: 'Nguyễn Thị Lan',
        checkDate: '2026-04-22',
        issues: ['Kiểm tra độ bám dính Men', 'Kiểm tra độ dày thực tế']
      }
    ],
    'completed': [
      {
        id: 5,
        productName: 'Ván MDF DW MBR E2 4.75x1220x2440',
        batch: 'MO-005',
        quantity: 500,
        qtyB: 0,
        qtyR: 0,
        inspector: 'Lê Thị Hoa',
        checkDate: '2026-04-21',
        issues: []
      },
      {
        id: 6,
        productName: 'ECO MDF E2 12x1220x2440 Melamine',
        batch: 'MO-006',
        quantity: 450,
        qtyB: 5,
        qtyR: 0,
        inspector: 'Phạm Văn Đức',
        checkDate: '2026-04-20',
        issues: ['Vết xước nhẹ bề mặt']
      }
    ]
  })

  useEffect(() => {
    if (location.state?.newQcPlan) {
      const plan = location.state.newQcPlan;
      setQualityData(prev => {
        const exists = prev['in-progress'].some((p: any) => p.batch === plan.moNumber);
        if (exists) return prev;

        const newQcItem = {
          id: Date.now(),
          productName: `[${plan.productCode}] SP của ${plan.customer}`,
          batch: plan.moNumber,
          quantity: plan.quantity,
          qtyB: 0,
          qtyR: 0,
          inspector: '',
          checkDate: new Date().toISOString().split('T')[0],
          issues: []
        };
        return {
          ...prev,
          'in-progress': [newQcItem, ...prev['in-progress']]
        }
      })
    }
  }, [location.state])

  const handleUpdateQty = (id: number, type: 'qtyB' | 'qtyR', value: string) => {
    const numValue = parseInt(value) || 0;
    setQualityData(prev => {
      const newInProgress = prev['in-progress'].map((item: any) => {
        if (item.id === id) {
          return { ...item, [type]: numValue }
        }
        return item
      });
      return { ...prev, 'in-progress': newInProgress };
    });
  }

  const handleComplete = (item: any, withRequest: boolean = false) => {
    if (withRequest) {
       alert(`[Odoo] Đã hoàn thành bản ghi ${item.batch} và gửi yêu cầu cấp thêm NVL do có hàng lỗi (Hạng B/R).`);
    } else {
       alert(`[Odoo] Đã hoàn thành bản ghi kiểm tra chất lượng cho ${item.batch}.`);
    }
    
    setQualityData(prev => ({
      ...prev,
      'in-progress': prev['in-progress'].filter((i: any) => i.id !== item.id),
      'completed': [{...item, checkDate: new Date().toISOString().split('T')[0]}, ...prev['completed']]
    }));
  }

  const filterItems = (items: any[]) => {
    const searchLower = searchTerm.toLowerCase().trim()
    if (!searchLower) return items
    return items.filter(item => 
      item.productName.toLowerCase().includes(searchLower) ||
      item.batch.toLowerCase().includes(searchLower) ||
      item.inspector?.toLowerCase().includes(searchLower)
    )
  }

  const renderQualityCard = (item: any, status: string) => {
    const hasErrorQty = (item.qtyB || 0) > 0 || (item.qtyR || 0) > 0;

    return (
      <Card key={item.id} className="p-4 mb-3 border-0 shadow-sm relative overflow-hidden bg-white">
        <div className={cn(
          "absolute top-0 right-0 w-1.5 h-full",
          status === 'completed' ? "bg-green-500" : "bg-emerald-500"
        )} />
        
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-sm text-gray-900">{item.productName}</h4>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">Lô: <span className="text-emerald-700">{item.batch}</span></p>
            </div>
            {status === 'completed' ? (
              <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">Hoàn tất</Badge>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px]">Đang kiểm tra</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 text-[11px] border-t border-gray-50 pt-3">
            <div className="flex flex-col">
              <span className="text-gray-400 font-bold uppercase text-[9px]">Số lượng</span>
              <span className="font-bold text-gray-700">{item.quantity} SP</span>
            </div>
            {item.inspector && (
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold uppercase text-[9px]">Kiểm tra viên</span>
                <span className="font-bold text-gray-700">{item.inspector}</span>
              </div>
            )}
            {item.checkDate && (
              <div className="flex flex-col col-span-2">
                <span className="text-gray-400 font-bold uppercase text-[9px]">Ngày kiểm</span>
                <span className="font-bold text-gray-700">
                  {new Date(item.checkDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
            )}
          </div>
          
          {item.issues?.length > 0 && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Vấn đề cần lưu ý:</p>
              <div className="flex flex-wrap gap-1">
                {item.issues.map((issue: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px]">
                    • {issue}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {status === 'in-progress' && (
            <div className="mt-3 p-3 bg-gray-50/80 rounded-lg space-y-2 border border-gray-100 shadow-inner">
              <p className="text-[10px] font-bold text-gray-500 uppercase">Phân loại sản phẩm</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded border border-green-100 text-center shadow-sm">
                  <div className="text-[9px] text-green-600 font-bold uppercase">Hạng A</div>
                  <div className="text-sm font-black text-green-700">
                    {item.quantity - (item.qtyB || 0) - (item.qtyR || 0)}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-emerald-600 font-bold uppercase text-center mb-0.5">Hạng B</div>
                  <Input 
                    className="h-8 text-xs px-2 text-center border-emerald-200 focus:ring-emerald-500" 
                    placeholder="0" 
                    type="number" 
                    value={item.qtyB || ''} 
                    onChange={(e) => handleUpdateQty(item.id, 'qtyB', e.target.value)} 
                  />
                </div>
                <div>
                  <div className="text-[9px] text-red-600 font-bold uppercase text-center mb-0.5">Hạng R</div>
                  <Input 
                    className="h-8 text-xs px-2 text-center border-red-200 focus:ring-red-500" 
                    placeholder="0" 
                    type="number" 
                    value={item.qtyR || ''} 
                    onChange={(e) => handleUpdateQty(item.id, 'qtyR', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          )}

          {status === 'completed' && (
            <div className="mt-3 p-3 bg-green-50/50 rounded-lg space-y-2 border border-green-100/50">
              <p className="text-[10px] font-bold text-green-700/60 uppercase">Phân loại sản phẩm (Kết quả)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded border border-green-100 text-center">
                  <div className="text-[9px] text-green-600 font-bold uppercase">Hạng A</div>
                  <div className="text-sm font-black text-green-700">
                    {item.quantity - (item.qtyB || 0) - (item.qtyR || 0)}
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-emerald-100 text-center">
                  <div className="text-[9px] text-emerald-600 font-bold uppercase">Hạng B</div>
                  <div className="text-sm font-black text-emerald-700">{item.qtyB || 0}</div>
                </div>
                <div className="bg-white p-2 rounded border border-red-100 text-center">
                  <div className="text-[9px] text-red-600 font-bold uppercase">Hạng R</div>
                  <div className="text-sm font-black text-red-700">{item.qtyR || 0}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2 pt-2">
            {status === 'in-progress' && (
              <>
                <Button 
                  size="sm" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 rounded-lg shadow-sm"
                  onClick={() => handleComplete(item, false)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Hoàn thành
                </Button>
                
                {hasErrorQty && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold h-10 rounded-lg shadow-sm"
                    onClick={() => handleComplete(item, true)}
                  >
                    <PackagePlus className="h-4 w-4 mr-2" />
                    Hoàn thành + Request thêm NVL
                  </Button>
                )}
              </>
            )}
            
            {status === 'completed' && (
              null
            )}
          </div>
        </div>
      </Card>
    )
  }

  const filteredInProgress = filterItems(qualityData['in-progress'])
  const filteredCompleted = filterItems(qualityData.completed)

  return (
    <div className="p-4 pb-20 bg-gray-50/50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-sm">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Kiểm tra chất lượng</h1>
          <p className="text-xs text-gray-500">Quản lý và phân loại thành phẩm</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Tìm sản phẩm, số lô, kiểm tra viên..."
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
      
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white p-1 rounded-xl shadow-sm mb-4">
          <TabsTrigger value="in-progress" className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 rounded-lg transition-all">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-bold">Đang kiểm tra</span>
            <Badge className="ml-1.5 bg-emerald-100 text-emerald-800 border-none px-1.5 h-5 min-w-[20px] flex items-center justify-center">
              {filteredInProgress.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-lg transition-all">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-bold">Đã hoàn tất</span>
            <Badge className="ml-1.5 bg-green-100 text-green-800 border-none px-1.5 h-5 min-w-[20px] flex items-center justify-center">
              {filteredCompleted.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-0">
          <div className="space-y-3">
            {filteredInProgress.map((item) => renderQualityCard(item, 'in-progress'))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="space-y-3">
            {filteredCompleted.map((item) => renderQualityCard(item, 'completed'))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}