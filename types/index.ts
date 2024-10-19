interface Product {
  id: number;
  name: string;
  brand: {
    name: string;
  };
  productImages: string[];
  productDetails: {
    size: number;
  }[];
}

interface RefreshToken{
  access_token: string;
  refresh_token: string;
}