import { Product as ProductType } from "@/stores/cartSlice";

export const mockProducts: (ProductType & {
  category: string;
  isNew: boolean;
  isOnSale: boolean;
  salePercentage: number;
  rating: number;
})[] = [
  {
    $id: "1",
    name: "Premium Notebook",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByZW1pdW0lMjBub3RlYm9va3xlbnwwfHwwfHx8MA%3D%3D",
    description:
      "A high-quality notebook with smooth paper perfect for writing and sketching.",
    category: "notebooks",
    isNew: false,
    isOnSale: true,
    salePercentage: 15,
    rating: 4.5,
  },
  {
    $id: "2",
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
    $id: "3",
    name: "Mechanical Pencil",
    price: 5.49,
    image:
      "https://images.unsplash.com/photo-1606326608726-07a8ee903449?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxtZWNoYW5pY2FsJTIwcGVuY2lsfGVufDB8fDB8fHww",
    description:
      "Precision mechanical pencil with comfortable grip and replaceable lead.",
    category: "writing",
    isNew: false,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.2,
  },
  {
    $id: "4",
    name: "Fountain Pen",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1546493918-8bcb44f37c8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZvdW50YWluJTIwcGVufGVufDB8fDB8fHww",
    description:
      "Elegant fountain pen for smooth writing and professional appearance.",
    category: "writing",
    isNew: true,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.9,
  },
  {
    $id: "5",
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
    $id: "6",
    name: "Desk Organizer",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Wooden desk organizer with multiple compartments for stationery items.",
    category: "office",
    isNew: false,
    isOnSale: true,
    salePercentage: 20,
    rating: 4.7,
  },
  {
    $id: "7",
    name: "Designer Notebook",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1646617747040-b94e568e1c25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGRlc2lnbmVyJTIwbm90ZWJvb2t8ZW58MHx8MHx8fDA%3D",
    description:
      "Stylish notebook with artistic cover designs for creative inspiration.",
    category: "notebooks",
    isNew: true,
    isOnSale: false,
    salePercentage: 0,
    rating: 4.6,
  },
  {
    $id: "8",
    name: "Watercolor Set",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1509043990151-c2ea135dfd26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdhdGVyY29sb3JzJTIwc2Nob29sfGVufDB8fDB8fHww",
    description: "Professional watercolor paint set with 24 vibrant colors.",
    category: "art",
    isNew: false,
    isOnSale: true,
    salePercentage: 10,
    rating: 4.4,
  },
];
