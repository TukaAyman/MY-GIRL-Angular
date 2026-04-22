export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Makeup' | 'Skincare' | 'Perfumes' | 'Manicure';
  stock: number;
  rating: number;
  image: string;
  description: string;
}
