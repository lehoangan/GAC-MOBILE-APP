import { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  FileText, 
  Search, 
  Download, 
  FileCode, 
  FileImage, 
  FileArchive, 
  FileVideo,
  ExternalLink,
  MoreVertical,
  Filter,
  Calendar,
  Eye,
  X,
  Play
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'

export function Documents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [previewDoc, setPreviewDoc] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (doc: any) => {
    setPreviewDoc(doc)
    setIsPreviewOpen(true)
  }

  const mockDocuments = [
    {
      id: 1,
      name: 'Chính sách bán hàng 2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      updatedAt: '2024-03-15',
      category: 'Chính sách',
      url: '#',
      binary: true
    },
    {
      id: 2,
      name: 'Catalogue Sản phẩm Nội thất gỗ sồi.pdf',
      type: 'PDF',
      size: '15.8 MB',
      updatedAt: '2024-02-10',
      category: 'Catalogue',
      url: '#',
      binary: true
    },
    {
      id: 3,
      name: 'Báo giá linh kiện quý 1.xlsx',
      type: 'Excel',
      size: '1.1 MB',
      updatedAt: '2024-03-20',
      category: 'Báo giá',
      url: '#',
      binary: true
    },
    {
      id: 4,
      name: 'Hướng dẫn lắp đặt tủ áo Nordic.mp4',
      type: 'Video',
      size: '45.0 MB',
      updatedAt: '2024-01-05',
      category: 'Hướng dẫn',
      url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
      binary: true
    },
    {
      id: 5,
      name: 'Hình ảnh thực tế dự án Luxury Hotel.zip',
      type: 'Archive',
      size: '120 MB',
      updatedAt: '2024-03-01',
      category: 'Hình ảnh',
      url: '#',
      binary: true
    },
    {
      id: 6,
      name: 'Phối cảnh phòng khách.jpg',
      type: 'IMAGE',
      size: '5.2 MB',
      updatedAt: '2024-03-22',
      category: 'Thiết kế',
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
      binary: true
    }
  ]

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'PDF': return <FileText className="h-6 w-6 text-red-500" />;
      case 'EXCEL': case 'XLSX': return <FileCode className="h-6 w-6 text-green-600" />;
      case 'VIDEO': case 'MP4': return <FileVideo className="h-6 w-6 text-purple-500" />;
      case 'ARCHIVE': case 'ZIP': return <FileArchive className="h-6 w-6 text-emerald-600" />;
      case 'IMAGE': return <FileImage className="h-6 w-6 text-blue-500" />;
      default: return <FileText className="h-6 w-6 text-gray-400" />;
    }
  }

  const filteredDocs = mockDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4">
      {/* Search & Filter */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Tìm tài liệu..."
            className="pl-10 border-0 shadow-sm bg-white rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-0 shadow-sm bg-white rounded-xl">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors border border-gray-100 group-hover:border-emerald-200">
                {getFileIcon(doc.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900 truncate pr-2">{doc.name}</h4>
                  <Badge variant="secondary" className="text-[10px] font-medium bg-gray-100 text-gray-600 border-0">
                    {doc.category}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {doc.updatedAt}
                  </span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span className="font-medium text-emerald-600">{doc.type}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handlePreview(doc)}
                  className="h-9 w-9 rounded-full hover:bg-blue-50 hover:text-blue-600"
                >
                  {doc.type.toUpperCase() === 'VIDEO' ? <Play className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-emerald-50 hover:text-emerald-600">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Không tìm thấy tài liệu nào</p>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden rounded-3xl border-0">
          <div className="flex flex-col h-full bg-gray-900">
            <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
              <div className="flex items-center space-x-3 text-white">
                {previewDoc && getFileIcon(previewDoc.type)}
                <div>
                  <h3 className="font-bold text-sm leading-tight">{previewDoc?.name}</h3>
                  <p className="text-[10px] text-white/60">{previewDoc?.size} • {previewDoc?.category}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsPreviewOpen(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 pt-20 overflow-auto bg-gray-900/50">
              {previewDoc?.type.toUpperCase() === 'IMAGE' ? (
                <div className="relative group">
                  <img 
                    src={previewDoc.url} 
                    alt={previewDoc.name}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 pointer-events-none"></div>
                </div>
              ) : previewDoc?.type.toUpperCase() === 'VIDEO' ? (
                <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <video 
                    src={previewDoc.url} 
                    controls 
                    autoPlay
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-8 text-center bg-gradient-to-b from-gray-50 to-white">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200/50 shadow-sm">
                      {getFileIcon(previewDoc?.type || '')}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{previewDoc?.name}</h3>
                    <p className="text-sm text-gray-500 italic mb-8">Hệ thống không hỗ trợ xem trực tiếp loại tệp này</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-left mb-8">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Dung lượng</p>
                        <p className="text-sm font-bold text-gray-700">{previewDoc?.size}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Định dạng</p>
                        <p className="text-sm font-bold text-emerald-600">{previewDoc?.type}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Cập nhật</p>
                        <p className="text-sm font-bold text-gray-700">{previewDoc?.updatedAt}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Danh mục</p>
                        <p className="text-sm font-bold text-gray-700">{previewDoc?.category}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl font-bold shadow-lg shadow-emerald-200/50">
                        <Download className="h-5 w-5 mr-2" />
                        Tải về ngay
                      </Button>
                      <p className="text-[10px] text-gray-400 font-medium">An toàn & Bảo mật bởi Gỗ Á Châu ERP</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
