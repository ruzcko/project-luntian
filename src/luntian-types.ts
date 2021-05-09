import firebase from "firebase";

export type Privilege = "USER" | "FARMER" | "ADMIN";

export type OrderStatus =
  | "NEW"
  | "IN_TRANSIT"
  | "FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  orderDate: firebase.firestore.FieldValue;
  toRate: Array<CheckoutProduct>;
  userID: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  courier: string;
  deliveryAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverPhoto: string;
}

export type PaymentMethod =
  | "GCash-e-Wallet"
  | "Credit/Debit Card"
  | "PayMaya-e-Wallet";

export interface Product {
  id?: string;
  averageRating?: number;
  description?: string;
  name?: string;
  photoURL?: string;
  price?: number;
  stock?: number;
  sold?: number;
}

export interface CartProduct extends Product {
  productID?: string;
  quantity?: number;
}

export interface CheckoutProduct extends Product {
  quantity?: number;
}

export interface User {
  barangay?: string;
  bio?: string;
  city?: string;
  email?: string;
  firstName?: string;
  houseNumber?: string;
  isAdmin?: boolean;
  lastName?: string;
  phoneNumber?: string;
  privilege?: Privilege;
  photoURL?: string;
  province?: string;
  region?: string;
  signupCompleted?: boolean;
  zipCode?: string;
}
