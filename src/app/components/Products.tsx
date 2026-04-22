import { useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Search, Filter, Eye, Package, Star, QrCode } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function Products() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: 'Bàn gỗ sồi cao cấp Executive',
      category: 'Bàn làm việc',
      material: 'Gỗ sồi tự nhiên',
      price: 5000000,
      stock: 12,
      status: 'Có sẵn',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      bom: ['Mặt bàn gỗ sồi (2m x 1m)', '4 Chân gỗ sồi (10x10cm)', 'Sơn PU chống xước', 'Ốc vít hợp kim']
    },
    {
      id: 2,
      name: 'Tủ áo gỗ thông Nordic Style',
      category: 'Tủ áo',
      material: 'Gỗ thông tự nhiên',
      price: 8500000,
      stock: 8,
      status: 'Có sẵn',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Ghế gỗ cao su Ergonomic',
      category: 'Ghế văn phòng',
      material: 'Gỗ cao su + Đệm',
      price: 1200000,
      stock: 25,
      status: 'Có sẵn',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Giường gỗ sồi King Size',
      category: 'Giường ngủ',
      material: 'Gỗ sồi tự nhiên',
      price: 12000000,
      stock: 0,
      status: 'Hết hàng',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Kệ sách gỗ tự nhiên',
      category: 'Kệ sách',
      material: 'Gỗ MDF phủ Veneer',
      price: 3500000,
      stock: 15,
      status: 'Có sẵn',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?w=300&h=200&fit=crop'
    }
  ]

  const categories = ['Tất cả', 'Bàn làm việc', 'Tủ áo', 'Ghế văn phòng', 'Giường ngủ', 'Kệ sách']

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
                    <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category} • {product.material}</p>
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
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-emerald-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Tồn kho: {product.stock}</span>
                </div>
                
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