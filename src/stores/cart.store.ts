import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  cartCount: number;
  currency: 'INR' | 'USDT';
  setCurrency: (currency: 'INR' | 'USDT') => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  lastAddedTitle: string | null;
  clearNotification: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [
    {
      id: 'deal-month-1',
      title: 'Classic Trench & Outerwear',
      brand: 'Aura Studio',
      price: 899,
      originalPrice: 2999,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDfAjn1pqNhyu6o0ODhdHAEvwGh_fhQUXGIWeDltdALENOlPxkgPhXUIJlZMCHREbSDq_kGcxVp1QnB4LnQZGaVQLcfbkGEPxRtCN4vc0MhL7fWFyvtBh2fqPomXW9ujKDWPFDROMOEw76eZnfxZJnrsT313-MGz9SgYxTpVHTzlK5GlseHV31jwxZseNN3zBQROVMo9trp08cn1kCL0hcxYg2fixoKFlADbMiHiQ',
      quantity: 1,
    },
    {
      id: 'arr-1',
      title: 'Slim Fit Raw Denim',
      brand: 'Peter England',
      price: 899,
      originalPrice: 2799,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
      quantity: 1,
    },
  ],
  cartCount: 2,
  currency: 'INR',
  lastAddedTitle: null,
  setCurrency: (currency) => set({ currency }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [...state.items, { ...item, quantity: 1 }];
      }
      return {
        items: updated,
        cartCount: updated.reduce((acc, curr) => acc + curr.quantity, 0),
        lastAddedTitle: item.title,
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((i) => i.id !== id);
      return {
        items: updated,
        cartCount: updated.reduce((acc, curr) => acc + curr.quantity, 0),
      };
    }),
  clearNotification: () => set({ lastAddedTitle: null }),
}));
