export interface Product {
  $id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
  subtotal?: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number; // Total number of items in cart
  loading: boolean; // For handling async operations
  error: string | null; // For storing error messages
}

interface CartActions {
  addProduct: (product: Product) => void;
  removeProduct: (product: Product["$id"]) => void;
  incrQuantity: (product: Product["$id"]) => void;
  decrQuantity: (product: Product["$id"]) => void;
  getProduct: (product: Product["$id"]) => CartItem;
  setCartTotal: (total: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: Product["$id"], quantity: number) => void; // Set specific quantity
  isInCart: (productId: Product["$id"]) => boolean; // Check if product exists in cart
}

export type CartSlice = CartState & CartActions;
export const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
};
