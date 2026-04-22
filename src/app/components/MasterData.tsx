import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Customers } from './Customers'
import { Products } from './Products'
import { Documents } from './Documents'
import { Users, Package, FileText, Database } from 'lucide-react'

export function MasterData() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine active tab from current path
  const getActiveTab = () => {
    const path = location.pathname
    if (path.includes('/customers')) return 'customers'
    if (path.includes('/products')) return 'products'
    if (path.includes('/documents')) return 'documents'
    return 'products' // Default
  }

  const handleTabChange = (value: string) => {
    navigate(`/master-data/${value}`)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-4 bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dữ liệu gốc</h1>
            <p className="text-xs text-gray-500">Quản lý và cập nhật thông tin hệ thống</p>
          </div>
        </div>

        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 p-1 rounded-xl">
            <TabsTrigger value="products" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 rounded-lg transition-all">
              <Package className="h-4 w-4" />
              <span className="text-xs font-bold">Sản phẩm</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 rounded-lg transition-all">
              <Users className="h-4 w-4" />
              <span className="text-xs font-bold">Khách hàng</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 rounded-lg transition-all">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-bold">Tài liệu</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="pb-20">
        <Tabs value={getActiveTab()} className="w-full">
          <TabsContent value="products" className="m-0 focus-visible:ring-0">
            <Products />
          </TabsContent>
          <TabsContent value="customers" className="m-0 focus-visible:ring-0">
            <Customers />
          </TabsContent>
          <TabsContent value="documents" className="m-0 focus-visible:ring-0">
            <Documents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
