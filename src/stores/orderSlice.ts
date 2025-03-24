import { CartState } from "./cartSlice";

// Address information for shipping
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Payment information
export interface Payment {
  method: string; // e.g., "credit_card", "paypal"
  transactionId?: string;
  status: "pending" | "completed" | "failed";
}

// Order status types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Single order structure
export interface Order {
  $id: string;
  userId: string;
  items: CartState["items"];
  total: number;
  status: OrderStatus;
  createdAt: Date | "N/A";
  updatedAt: Date;
  shippingAddress: Address;
  paymentInfo: Payment;
  trackingNumber?: string;
}

// State to manage orders
export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

// Actions to manipulate orders
interface OrderActions {
  createOrder: (
    order: Omit<Order, "$id" | "createdAt" | "updatedAt" | "status">
  ) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  cancelOrder: (orderId: string) => void;
  setCurrentOrder: (order: Order) => void;
  clearCurrentOrder: () => void;
}

// Combined slice type for Zustand
export type OrderSlice = OrderState & OrderActions;

// Initial state
export const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};
