interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  phone_number: string;
  status: string;
  address: Address[];
  role: Role | string;
  defaultAddress: string;
  cartId: string
}

interface Role {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  image: string;
  photoType: string;
}

interface Product {
  id: string;
  name: string;
  brand: Brand;
  productPhotos: ProductImage[];
  frontImage: string;
  price: number;
  productDetails: ProductDetail[];
  createdAt: Date;
  categories: Category[];
}

interface ProductDetail {
  id: string;
  size: number;
  stock: number;
  productId: string;
  product: Product;
}

interface Bid {
  id: string;
  start_date: Date;
  start_price: number;
  end_date: Date;
  productDetail: ProductDetail;
  productPhotos: string;
  productName: string;
  bidParticipants: BidParticipant[];
}

interface BidParticipant {
  id: string;
  amount: number;
  bid_product_id: string;
  user_id: string;
  payment_id?: string;
  updatedAt: Date;
  user: User;
}

interface Brand {
  id: string;
  name: string;
  image: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  status: string;
}

interface RefreshToken {
  access_token: string;
  refresh_token: string;
}

interface Address {
  id: string;
  userId: string;
  contact_name: string;
  contact_number: string;
  province: string;
  city: string;
  district: string;
  zipcode: number;
  address: string;
  note: string;
}
