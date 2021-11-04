export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
}

export interface ProductsData {
  amount: number;
  data: Product[];
}
