
interface ColoredNameProps {
  name: string;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  'LMR': 'text-[#84a98c]',     // Sage Green
  'E2': 'text-[#4895ef]',      // Sky Blue
  '1M': 'text-[#d90429]',      // Bright Red
  'HMR': 'text-[#2d6a4f]',     // Dark Green
  'Chống ẩm': 'text-[#2d6a4f]', // Dark Green
  'Phủ Men': 'text-amber-600',
  'MDF': 'text-gray-500',
  'Melamine': 'text-amber-700',
};

export function ColoredName({ name, className = "" }: ColoredNameProps) {
  if (!name) return null;

  // Tạo Regex từ các từ khóa trong COLOR_MAP
  // Sử dụng dấu ngoặc đơn () để giữ lại các từ khóa trong kết quả split
  const keywords = Object.keys(COLOR_MAP).sort((a, b) => b.length - a.length); // Ưu tiên từ dài hơn
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');

  const parts = name.split(regex).filter(p => p !== undefined && p !== "");

  return (
    <span className={`inline-flex flex-wrap gap-x-1 ${className}`}>
      {parts.map((part, index) => {
        // Tìm key khớp (không phân biệt hoa thường)
        const matchedKey = keywords.find(k => k.toLowerCase() === part.toLowerCase().trim());
        const colorClass = matchedKey ? COLOR_MAP[matchedKey] : 'text-gray-900';

        return (
          <span key={index} className={colorClass}>
            {part.trim()}
          </span>
        );
      })}
    </span>
  );
}
