

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  phone_number: string;
  status: string;
}

interface Role {
  id: string;
  name: string;
}

interface ProductImage {
  id: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  brand: {
    name: string;
  };
  productPhotos: string[];
  frontImage: string;
  price: number;
  productDetails: ProductDetail[];
  createdAt: Date;
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
}

interface Brand {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

interface RefreshToken {
  access_token: string;
  refresh_token: string;
}
