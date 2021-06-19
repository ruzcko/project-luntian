import firebase from "firebase";
declare module "*.mp4" {
  const src: string;
  export default src;
}

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

export type PaymentMethod = "COD (Cash on Delivery)" | "Online Payment";

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

interface HydroponicsData {
  unix_time: number;
  ac_relative_humidity: number;
  ac_temperature: number;
  ac_fan_status: number;
  dt_ammonia_level: number;
  dt_electric_conductivity: number;
  dt_ph_level: number;
  dt_temperature: number;
  dt_water_level: number;
  cctv_light_status: number;
  nm_ammonia_level: number;
  nm_electric_conductivity: number;
  nm_ph_level: number;
  nm_temperature: number;
  nm_water_level: number;
}

interface AquacultureData {
  unix_time: number;
  pond_ammonia_level: number;
  pond_dissolved_oxygen: number;
  pond_electric_conductivity: number;
  pond_feed_amount: number;
  pond_feed_level: number;
  pond_nitrate: number;
  pond_nitrite: number;
  pond_ph_level: number;
  pond_total_dissolved_solids: number;
  pond_turbidity_voltage: number;
  pond_water_temperature: number;
}

interface EnergyData {
  unix_time: number;
  battery_temperature: number;
  battery_charge: number;
  battery_discharge: number;
  battery_health: string;
  solar_temperature: number;
  solar_power: number;
  solar_voltage: number;
  solar_current: number;
}
