import { useState } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog'
import { 
  Shield, 
  Truck, 
  Camera, 
  Clock, 
  Calendar, 
  Search, 
  XCircle, 
  CheckCircle, 
  History, 
  LogIn, 
  LogOut,
  MapPin,
  User as UserIcon
} from 'lucide-react'
import { cn } from './ui/utils'

interface VehicleRecord {
  id: string
  licensePlate: string
  driverName: string
  vehicleType: string
  entryTime: string
  exitTime?: string
  photoEntry?: string
  photoExit?: string
  status: 'inside' | 'exited'
}

export function SecurityCheck() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null)
  
  // Simulation states
  const [tempLicensePlate, setTempLicensePlate] = useState('')
  const [tempPhoto, setTempPhoto] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const [records, setRecords] = useState<VehicleRecord[]>([
    {
      id: 'V001',
      licensePlate: '51C-123.45',
      driverName: 'Nguyễn Văn Nam',
      vehicleType: 'Xe tải 5 tấn (Ván MDF)',
      entryTime: '2026-04-22 08:30',
      status: 'inside'
    },
    {
      id: 'V002',
      licensePlate: '60C-987.65',
      driverName: 'Trần Minh Tuấn',
      vehicleType: 'Xe Container 40ft (Xuất khẩu)',
      entryTime: '2026-04-22 09:15',
      status: 'inside'
    },
    {
      id: 'V003',
      licensePlate: '72C-444.22',
      driverName: 'Lê Văn Tám',
      vehicleType: 'Xe tải 10 tấn (Nhập phôi)',
      entryTime: '2026-04-22 07:00',
      exitTime: '2026-04-22 10:30',
      status: 'exited'
    }
  ])

  const handleCapture = () => {
    setIsCapturing(true)
    // Simulate camera delay
    setTimeout(() => {
      setTempPhoto('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=400&auto=format&fit=crop')
      setIsCapturing(false)
    }, 1500)
  }

  const handleRecordEntry = () => {
    if (!tempLicensePlate || !tempPhoto) {
      alert('Vui lòng nhập biển số xe và chụp hình!')
      return
    }

    const newRecord: VehicleRecord = {
      id: `V${Date.now()}`,
      licensePlate: tempLicensePlate,
      driverName: 'Khách vãng lai',
      vehicleType: 'Xe tải',
      entryTime: new Date().toLocaleString('vi-VN', { hour12: false }).replace(',', ''),
      status: 'inside'
    }

    setRecords([newRecord, ...records])
    resetTemp()
    setIsRecordModalOpen(false)
  }

  const handleRecordExit = (vehicle: VehicleRecord) => {
    if (!tempPhoto) {
      alert('Vui lòng chụp hình để ghi nhận xe ra!')
      return
    }

    setRecords(records.map(r => 
      r.id === vehicle.id 
        ? { 
            ...r, 
            status: 'exited', 
            exitTime: new Date().toLocaleString('vi-VN', { hour12: false }).replace(',', ''),
            photoExit: tempPhoto
          } 
        : r
    ))
    resetTemp()
    setIsRecordModalOpen(false)
  }

  const resetTemp = () => {
    setTempLicensePlate('')
    setTempPhoto(null)
    setSelectedVehicle(null)
  }

  const openModal = (vehicle?: VehicleRecord) => {
    if (vehicle) {
      setSelectedVehicle(vehicle)
      setTempLicensePlate(vehicle.licensePlate)
    } else {
      setSelectedVehicle(null)
      setTempLicensePlate('')
    }
    setTempPhoto(null)
    setIsRecordModalOpen(true)
  }

  const filteredInside = records.filter(r => 
    r.status === 'inside' && 
    (r.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.driverName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredHistory = records.filter(r => 
    r.status === 'exited' && 
    r.entryTime.includes(dateFilter) &&
    (r.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.driverName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="p-4 pb-20 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-600">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">An Ninh & Cổng</h1>
            <p className="text-xs text-gray-500 font-medium">Role: Bảo vệ trực ban</p>
          </div>
        </div>
        <Button 
          onClick={() => openModal()}
          className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-md gap-2"
        >
          <LogIn className="h-4 w-4" />
          Ghi nhận xe VÀO
        </Button>
      </div>

      {/* Quick Search */}
      <div className="relative group mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Tìm biển số hoặc tài xế..."
          className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-100 rounded-2xl leading-5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
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

      <Tabs defaultValue="inside" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white p-1 rounded-2xl shadow-sm mb-6 border border-gray-100">
          <TabsTrigger value="inside" className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900 rounded-xl transition-all">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-bold">Trong bãi</span>
            <Badge className="ml-1.5 bg-emerald-200 text-emerald-800 border-none px-1.5 h-5 min-w-[20px] flex items-center justify-center">
              {filteredInside.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900 rounded-xl transition-all">
            <History className="h-4 w-4" />
            <span className="text-sm font-bold">Lịch sử</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inside" className="mt-0">
          <div className="space-y-4">
            {filteredInside.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Truck className="h-12 w-12 mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-medium">Không có xe trong bãi</p>
              </div>
            ) : (
              filteredInside.map(record => (
                <Card key={record.id} className="p-4 border-0 shadow-sm bg-white overflow-hidden relative group active:scale-[0.98] transition-transform">
                  <div className="absolute top-0 right-0 w-1 h-full bg-blue-500" />
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-2 py-0.5 text-lg font-black tracking-wider">
                          {record.licensePlate}
                        </Badge>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{record.vehicleType}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <UserIcon className="h-3.5 w-3.5" />
                          <span className="font-medium">{record.driverName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Vào lúc: <span className="font-bold text-emerald-800">{record.entryTime}</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => openModal(record)}
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl gap-1.5 shadow-sm"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Ghi nhận RA
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card className="p-4 mb-4 bg-white border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-emerald-500" />
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="text-sm font-bold text-emerald-800 border-none bg-transparent outline-none flex-1"
              />
            </div>
          </Card>

          <div className="space-y-4">
            {filteredHistory.map(record => (
              <Card key={record.id} className="p-4 border-0 shadow-sm bg-white/60 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1 h-full bg-gray-300" />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 px-2 py-0.5 text-base font-bold tracking-wider">
                      {record.licensePlate}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-500 border-none font-medium">Đã rời bãi</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-gray-400 font-bold mb-1 uppercase text-[9px]">Thời gian VÀO</p>
                      <p className="font-bold text-emerald-700">{record.entryTime}</p>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <p className="text-emerald-400 font-bold mb-1 uppercase text-[9px]">Thời gian RA</p>
                      <p className="font-bold text-emerald-700">{record.exitTime}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Record Modal */}
      <Dialog open={isRecordModalOpen} onOpenChange={setIsRecordModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-black text-emerald-800 uppercase italic">
              {selectedVehicle ? (
                <>
                  <LogOut className="h-5 w-5 text-emerald-500" />
                  Ghi nhận xe RA
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 text-blue-600" />
                  Ghi nhận xe VÀO
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Vui lòng chụp ảnh và kiểm tra thông tin biển số
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Photo Capture Area */}
            <div className="relative group">
              <div className={cn(
                "w-full aspect-video rounded-2xl overflow-hidden bg-emerald-100 border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center transition-all",
                tempPhoto && "border-solid border-emerald-800"
              )}>
                {tempPhoto ? (
                  <img src={tempPhoto} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className={cn("h-10 w-10 text-emerald-300 mb-2", isCapturing && "animate-pulse")} />
                    <p className="text-sm font-medium text-emerald-400">
                      {isCapturing ? 'Đang chụp ảnh...' : 'Chưa có ảnh'}
                    </p>
                  </>
                )}
              </div>
              <Button 
                onClick={handleCapture}
                disabled={isCapturing}
                className="absolute bottom-3 right-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-lg"
                size="sm"
              >
                <Camera className="h-4 w-4 mr-2" />
                {tempPhoto ? 'Chụp lại' : 'Chụp hình'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-emerald-500 uppercase flex items-center gap-1.5">
                  <Badge className="bg-emerald-500 h-1 w-3 p-0" /> Biển số xe
                </label>
                <Input 
                  placeholder="VD: 51C-123.45"
                  className="h-14 text-2xl font-black tracking-widest text-center uppercase border-emerald-200 rounded-2xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={tempLicensePlate}
                  onChange={(e) => setTempLicensePlate(e.target.value.toUpperCase())}
                  disabled={!!selectedVehicle}
                />
              </div>

              {selectedVehicle && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">Đã vào lúc</p>
                      <p className="font-bold text-emerald-900 text-lg">{selectedVehicle.entryTime}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsRecordModalOpen(false)}
              className="flex-1 h-12 rounded-xl font-bold border-emerald-200"
            >
              Hủy
            </Button>
            {selectedVehicle ? (
              <Button 
                onClick={() => handleRecordExit(selectedVehicle)}
                className="flex-1 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200"
              >
                Xác nhận XE RA
              </Button>
            ) : (
              <Button 
                onClick={handleRecordEntry}
                className="flex-1 h-12 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-lg shadow-emerald-200"
              >
                Xác nhận XE VÀO
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
