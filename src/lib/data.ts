// Temporary in-memory store (replace with Prisma when DATABASE_URL is set)

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAt?: number
  images: string[]
  category: string
  stock: number
  sku: string
  isActive: boolean
}

export type Order = {
  id: string
  orderNumber: string
  email: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
  total: number
  subtotal: number
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  items: { productId: string; name: string; quantity: number; price: number }[]
  createdAt: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Drop Tee - Black',
    slug: 'classic-drop-tee-black',
    description: '220+ GSM heavyweight cotton. Oversized drop-shoulder fit. Clean minimal design.',
    price: 4500,
    compareAt: 5500,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
    category: 'Tees',
    stock: 48,
    sku: 'MF-TEE-BLK-01',
    isActive: true,
  },
  {
    id: '2',
    name: 'Classic Drop Tee - White',
    slug: 'classic-drop-tee-white',
    description: '220+ GSM heavyweight cotton. Oversized drop-shoulder fit. Clean minimal design.',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600'],
    category: 'Tees',
    stock: 62,
    sku: 'MF-TEE-WHT-01',
    isActive: true,
  },
  {
    id: '3',
    name: 'Heavyweight Hoodie - Charcoal',
    slug: 'heavyweight-hoodie-charcoal',
    description: 'Premium heavyweight fleece. Signature fit. Built for everyday performance.',
    price: 8900,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600'],
    category: 'Hoodies',
    stock: 31,
    sku: 'MF-HOD-CHR-01',
    isActive: true,
  },
  {
    id: '4',
    name: 'Heavyweight Hoodie - Black',
    slug: 'heavyweight-hoodie-black',
    description: 'Premium heavyweight fleece. Signature fit. Built for everyday performance.',
    price: 8900,
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'],
    category: 'Hoodies',
    stock: 27,
    sku: 'MF-HOD-BLK-01',
    isActive: true,
  },
  {
    id: '5',
    name: 'Limited Graphic Tee - Wave',
    slug: 'limited-graphic-tee-wave',
    description: 'Exclusive limited drop. Once gone, gone forever. 220 GSM with premium print.',
    price: 5900,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600'],
    category: 'Limited',
    stock: 12,
    sku: 'MF-LTD-WAV-01',
    isActive: true,
  },
  {
    id: '6',
    name: 'Limited Graphic Tee - Signal',
    slug: 'limited-graphic-tee-signal',
    description: 'Exclusive limited drop. Once gone, gone forever. 220 GSM with premium print.',
    price: 5900,
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600'],
    category: 'Limited',
    stock: 8,
    sku: 'MF-LTD-SIG-01',
    isActive: true,
  },
]

export let orders: Order[] = [
  {
    id: 'ord1',
    orderNumber: 'MF-260802-4821',
    email: 'sarah@example.com',
    status: 'DELIVERED',
    total: 12900,
    subtotal: 12900,
    paymentStatus: 'PAID',
    items: [{ productId: '1', name: 'Classic Drop Tee - Black', quantity: 1, price: 4500 }, { productId: '3', name: 'Heavyweight Hoodie - Charcoal', quantity: 1, price: 8900 }],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'ord2',
    orderNumber: 'MF-260801-3912',
    email: 'james@example.com',
    status: 'PROCESSING',
    total: 8900,
    subtotal: 8900,
    paymentStatus: 'PAID',
    items: [{ productId: '4', name: 'Heavyweight Hoodie - Black', quantity: 1, price: 8900 }],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'ord3',
    orderNumber: 'MF-260802-7741',
    email: 'emma@example.com',
    status: 'PENDING',
    total: 4500,
    subtotal: 4500,
    paymentStatus: 'PENDING',
    items: [{ productId: '2', name: 'Classic Drop Tee - White', quantity: 1, price: 4500 }],
    createdAt: new Date().toISOString(),
  },
]

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}
