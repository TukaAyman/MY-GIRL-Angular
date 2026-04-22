export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: string;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  date: string;
  items: OrderItem[];
}
