import { Product } from "./productTypes";
import { Status } from "./types";

export enum PaymentMethod {
  COD = "cod",
  Khalti = "khalti",
}

export enum OrderStatus {
  Pending = "pending",
  Delivered = "delivered",
  Ontheway = "ontheway",
  Cancel = "cancelled",
  Preparation = "preparation",
  All = "all",
}

export interface ItemDetails {
  productId: string;
  quantity: number;
}

export interface OrderResponseItem extends ItemDetails {
  orderId: string;
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

interface Payment {
  paymentMethod: PaymentMethod;
}

interface OrderPaymentData extends Payment {
  paymentStatus: PaymentStatus;
  paymentId: string;
}

export interface OrderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: Payment;
  Payment?: {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
  };
  items: ItemDetails[];
}

export interface OrderResponseData {
  items: OrderResponseItem[];
  status: Status;
  khaltiUrl: string | null;
  myOrders: MyOrdersData[];
  orderDetails: OrderDetails[];
}

interface UserData {
  username: string;
  email: string;
}

export interface MyOrdersData {
  id: string;
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: string;
  paymentId: string;
  userId: UserData;
  Payment: OrderPaymentData;
}

export interface OrderDetails {
  id: string;
  quantity: number;
  orderId: string;
  Product: Product;
  Order: MyOrdersData;
}
