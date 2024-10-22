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
  price: number;
  productDetails: {
    size: number;
  }[];
  createdAt: Date
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
  productDetailId: string;
  productDetail: ProductDetail;
  productPhotos: string;
}

interface Brand {
  id: string;
  name: string;
  image: string;
}

interface RefreshToken {
  access_token: string;
  refresh_token: string;
}
