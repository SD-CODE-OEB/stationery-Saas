import { Product as ProductType } from "@/stores/cartSlice";

export const mockProducts: (ProductType & {
  category: string;
  isNew: boolean;
  isOnSale: boolean;
  salePercentage: number;
  rating: number;
})[] = [
  {
    _id: "1",
    name: "Premium Notebook",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1572191267783-5618f992aff5?q=80&w=500",
    description:
      "A high-quality notebook with smooth paper perfect for writing and sketching.",
    category: "notebooks",
    isNew: false,
    isOnSale: true,
    salePercentage: 15,
    rating: 4.5,
  },
  {
    _id: "2",
    name: "Colored Pencil Set",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=500",
    description:
      "Set of 24 vibrant colored pencils ideal for artists and illustrators.",
    category: "art",
    isNew: true,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.8,
  },
  {
    _id: "3",
    name: "Mechanical Pencil",
    price: 5.49,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc1b711?q=80&w=500",
    description:
      "Precision mechanical pencil with comfortable grip and replaceable lead.",
    category: "writing",
    isNew: false,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.2,
  },
  {
    _id: "4",
    name: "Fountain Pen",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc1b711?q=80&w=500",
    description:
      "Elegant fountain pen for smooth writing and professional appearance.",
    category: "writing",
    isNew: true,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.9,
  },
  {
    _id: "5",
    name: "Sticky Notes",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=500",
    description:
      "Pack of colorful sticky notes for reminders and organization.",
    category: "office",
    isNew: false,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.0,
  },
  {
    _id: "6",
    name: "Desk Organizer",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1544084944-15c3659571d0?q=80&w=500",
    description:
      "Wooden desk organizer with multiple compartments for stationery items.",
    category: "office",
    isNew: false,
    isOnSale: true,
    salePercentage: 20,
    rating: 4.7,
  },
  {
    _id: "7",
    name: "Designer Notebook",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1544084944-15c3659571d0?q=80&w=500",
    description:
      "Stylish notebook with artistic cover designs for creative inspiration.",
    category: "notebooks",
    isNew: true,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.6,
  },
  {
    _id: "8",
    name: "Watercolor Set",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=500",
    description: "Professional watercolor paint set with 24 vibrant colors.",
    category: "art",
    isNew: false,
    isOnSale: true,
    salePercentage: 10,
    rating: 4.4,
  },
];
