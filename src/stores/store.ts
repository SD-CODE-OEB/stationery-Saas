import { create } from "zustand";
import { UserSlice, initialState as userInitialState } from "./userSlice";
import { CartSlice, initialState as cartInitialState } from "./cartSlice";
import { OrderSlice, initialState as orderInitialState } from "./orderSlice";

type StoreState = UserSlice & CartSlice & OrderSlice;

const useStore = create<StoreState>((set, get) => ({
  ...userInitialState,

  // User Actions
  setUser: (user) => set(() => ({ ...user })),
  updateUser: (user) => set((state) => ({ ...state, ...user })),
  getUser: (email) => {
    const state = get();
    if (state.email === email) {
      return {
        _id: state._id,
        name: state.name,
        email: state.email,
        token: state.token,
        avatar: state.avatar,
        isAdmin: state.isAdmin,
        isLoggedIn: state.isLoggedIn,
      };
    }
    return userInitialState;
  },
  clearUser: () => set(() => ({ ...userInitialState })),

  // Cart State
  ...cartInitialState,

  // Cart Actions
  addProduct: (product) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        // Product exists in cart, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingItemIndex].subtotal =
          updatedItems[existingItemIndex].price *
          updatedItems[existingItemIndex].quantity;

        return {
          items: updatedItems,
          itemCount: state.itemCount + 1,
          total: state.total + product.price,
          loading: false,
          error: null,
        };
      } else {
        // New product to cart
        const newItem = {
          ...product,
          quantity: 1,
          subtotal: product.price,
        };

        return {
          items: [...state.items, newItem],
          itemCount: state.itemCount + 1,
          total: state.total + product.price,
          loading: false,
          error: null,
        };
      }
    }),

  removeProduct: (productId) =>
    set((state) => {
      const item = state.items.find((item) => item._id === productId);
      if (!item) return state;

      return {
        items: state.items.filter((item) => item._id !== productId),
        itemCount: state.itemCount - item.quantity,
        total: state.total - (item.subtotal || item.price * item.quantity),
        loading: false,
        error: null,
      };
    }),

  incrQuantity: (productId) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      );

      const foundItem = updatedItems.find((item) => item._id === productId);
      return {
        items: updatedItems,
        itemCount: state.itemCount + 1,
        total: state.total + (foundItem ? foundItem.price : 0),
        loading: false,
        error: null,
      };
    }),

  decrQuantity: (productId) =>
    set((state) => {
      const itemIndex = state.items.findIndex((item) => item._id === productId);
      if (itemIndex === -1) return state;

      const item = state.items[itemIndex];

      if (item.quantity === 1) {
        return {
          items: state.items.filter((item) => item._id !== productId),
          itemCount: state.itemCount - 1,
          total: state.total - item.price,
          loading: false,
          error: null,
        };
      }

      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
        subtotal: (item.quantity - 1) * item.price,
      };

      return {
        items: updatedItems,
        itemCount: state.itemCount - 1,
        total: state.total - item.price,
        loading: false,
        error: null,
      };
    }),

  getProduct: (productId) => {
    const item = get().items.find((item) => item._id === productId);
    if (!item) throw new Error("Product not found in cart");
    return item;
  },

  setCartTotal: (total) => set({ total }),

  clearCart: () => set(() => cartInitialState),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const itemIndex = state.items.findIndex((item) => item._id === productId);
      if (itemIndex === -1) return state;

      const item = state.items[itemIndex];
      const quantityDiff = quantity - item.quantity;
      const updatedItems = [...state.items];

      updatedItems[itemIndex] = {
        ...item,
        quantity,
        subtotal: quantity * item.price,
      };

      return {
        items: updatedItems,
        itemCount: state.itemCount + quantityDiff,
        total: state.total + quantityDiff * item.price,
        loading: false,
        error: null,
      };
    }),

  isInCart: (productId) => get().items.some((item) => item._id === productId),

  // Order State
  ...orderInitialState,

  // Order Actions
  createOrder: (orderData) =>
    set((state) => {
      const newOrder = {
        ...orderData,
        _id: `order_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending" as const,
      };

      return {
        orders: [...state.orders, newOrder],
        currentOrder: newOrder,
        loading: false,
        error: null,
      };
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      ),
      loading: false,
      error: null,
    })),

  getOrderById: (orderId) => {
    return get().orders.find((order) => order._id === orderId);
  },

  getUserOrders: (userId) => {
    return get().orders.filter((order) => order.userId === userId);
  },

  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === orderId
          ? { ...order, status: "cancelled" as const, updatedAt: new Date() }
          : order
      ),
      loading: false,
      error: null,
    })),

  setCurrentOrder: (order) => set({ currentOrder: order }),

  clearCurrentOrder: () => set({ currentOrder: null }),
}));

export default useStore;
