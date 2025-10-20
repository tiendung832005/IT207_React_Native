export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 29990000,
    image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg',
    description: 'Điện thoại cao cấp với chip A17 Pro, camera 48MP, màn hình Super Retina XDR 6.7 inch.'
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 52990000,
    image: 'https://cdn.tgdd.vn/Products/Images/44/309016/apple-macbook-pro-14-m3-2023-thumbnew-600x600.jpg',
    description: 'Laptop chuyên nghiệp với chip M3, 16GB RAM, SSD 512GB, màn hình Liquid Retina XDR 14 inch.'
  },
  {
    id: '3',
    name: 'iPad Air M2',
    price: 18990000,
    image: 'https://cdn.tgdd.vn/Products/Images/522/322096/ipad-air-6-m2-11-inch-wifi-128gb-2024-xanh-duong-thumbn-600x600.jpg',
    description: 'Máy tính bảng mạnh mẽ với chip M2, màn hình Liquid Retina 11 inch, hỗ trợ Apple Pencil.'
  },
  {
    id: '4',
    name: 'AirPods Pro Gen 2',
    price: 6290000,
    image: 'https://cdn.tgdd.vn/Products/Images/54/289780/tai-nghe-bluetooth-airpods-pro-2nd-gen-usb-c-charge-apple-mqd83-thumb-1-600x600.jpg',
    description: 'Tai nghe không dây cao cấp với chống ồn chủ động, âm thanh không gian, sạc USB-C.'
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    price: 10990000,
    image: 'https://cdn.tgdd.vn/Products/Images/7077/309137/apple-watch-s9-lte-45mm-vien-nhom-day-cao-su-thumb-600x600.jpg',
    description: 'Đồng hồ thông minh với chip S9, màn hình luôn bật, theo dõi sức khỏe toàn diện.'
  },
  {
    id: '6',
    name: 'Magic Keyboard iPad',
    price: 8990000,
    image: 'https://cdn.tgdd.vn/Products/Images/4547/228617/ban-phim-ipad-pro-11-inch-2020-apple-magic-keyboard-mxqt2-thumb-600x600.jpg',
    description: 'Bàn phím cao cấp cho iPad với trackpad, thiết kế treo nổi, cổng USB-C sạc nhanh.'
  }
];
