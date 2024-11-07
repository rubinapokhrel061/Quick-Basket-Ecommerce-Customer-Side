import { Status } from "./types";

interface User {
  id: string;
  email: string;
  username: string;
}

interface Category {
  id: string;
  categoryName: string;
}
export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  reviewContent: string;
  userId: string;
}
export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  productImageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  User: User;
  Category: Category;
  rating: number;
  numReviews: number;
  Reviews: Review[];
}

export interface ProductState {
  product: Product[];
  status: Status;
  singleProduct: Product | null;
}
