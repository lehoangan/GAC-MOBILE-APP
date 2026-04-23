import { useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Search, Filter, Eye, Package, Star, QrCode } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ColoredName } from './ColoredName'

export function Products() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: 'Ván MDF DW MBR E2 2.5x1220x2440',
      category: 'Ván MDF',
      price: 185000,
      stock: 1500,
      status: 'Có sẵn',
      image: 'https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?w=300&h=200&fit=crop',
      attributes: [
        { name: 'Cốt ván', value: 'MDF' },
        { name: 'Độ dày', value: '2.5mm' },
        { name: 'Kích thước', value: '1220x2440mm' },
        { name: 'Tiêu chuẩn', value: 'E2' }
      ],
      bom: ['Cốt ván MDF tiêu chuẩn E2', 'Keo kết dính chuyên dụng', 'Chất chống ẩm (nếu có)']
    },
    {
      id: 2,
      name: 'ECO MDF E2 12x1220x2440 Melamine 2',
      category: 'Ván ECO',
      price: 320000,
      stock: 850,
      status: 'Có sẵn',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      attributes: [
        { name: 'Loại ván', value: 'ECO MDF' },
        { name: 'Độ dày', value: '12mm' },
        { name: 'Phủ bề mặt', value: 'Melamine 2 mặt' },
        { name: 'Màu sắc', value: 'Vân gỗ Sồi' }
      ],
      bom: ['Cốt ván ECO MDF E2', 'Tấm phủ Melamine 2 mặt', 'Keo dán nóng chảy PUR']
    },
    {
      id: 3,
      name: 'ECO Chống ẩm E2 12x1220x2440 Phủ Men 3',
      category: 'Ván ECO',
      price: 450000,
      stock: 420,
      status: 'Có sẵn',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      attributes: [
        { name: 'Loại ván', value: 'ECO Chống ẩm (HMR)' },
        { name: 'Độ dày', value: '12mm' },
        { name: 'Phủ bề mặt', value: 'Men 3' },
        { name: 'Tính năng', value: 'Chống ẩm cao' }
      ],
      bom: ['Cốt ván HMR chống ẩm', 'Lớp phủ Men 3 cao cấp', 'Chất làm cứng bề mặt']
    },
    {
      id: 4,
      name: 'ECO MDF E2 15x1220x2440 Melamine',
      category: 'Ván ECO',
      material: 'MDF E2 + Melamine',
      price: 380000,
      stock: 0,
      status: 'Hết hàng',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
      bom: ['Cốt ván ECO MDF E2 15mm', 'Tấm phủ Melamine tiêu chuẩn', 'Keo dán cạnh']
    },
    {
      id: 5,
      name: 'Keo dán cạnh PUR cao cấp',
      category: 'Phụ kiện',
      material: 'Keo PUR Đức',
      price: 250000,
      stock: 500,
      status: 'Có sẵn',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?w=300&h=200&fit=crop',
      bom: ['Hợp chất Polyurethane', 'Chất xúc tác nhiệt']
    }
  ]

  const categories = ['Tất cả', 'Ván MDF', 'Ván ECO', 'Phụ kiện']

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex items-center justify-end mb-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <QrCode className="h-4 w-4 mr-2" />
            Quét QR
          </Button>
          <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm sản phẩm gỗ..."
          className="pl-10 border-gray-200 bg-white focus:border-emerald-300 focus:ring-emerald-200"
        />
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap ${
              index === 0 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600' 
                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4 border-0 shadow-sm bg-white overflow-hidden">
            <div className="flex space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8 text-emerald-600" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      <ColoredName name={product.name} />
                    </h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <Badge 
                    variant={product.status === 'Có sẵn' ? 'default' : 'destructive'}
                    className={`text-xs ${
                      product.status === 'Có sẵn' 
                        ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100' 
                        : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {product.status}
                  </Badge>
                </div>
                
                  <span className="text-sm text-gray-600">Tồn kho: {product.stock}</span>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/products/${product.id}`, { state: { product } })}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}