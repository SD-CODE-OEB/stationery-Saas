"use client";

import React from "react";
import Image from "next/image";
import useStore from "@/stores/store";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mockProducts } from "../../../../../public/data";
import { Product as ProductType } from "@/stores/cartSlice";
import { ShoppingCart, MinusCircle, PlusCircle, Check } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = React.useState<ProductType | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  const { addProduct, isInCart, updateQuantity, getProduct } = useStore();

  React.useEffect(() => {
    // In a real app, fetch from API
    const foundProduct = mockProducts.find(p => p.$id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      if (isInCart(productId)) {
        try {
          const cartItem = getProduct(productId);
          setQuantity(cartItem.quantity);
        } catch {
          setQuantity(1);
        }
      }
    }
  }, [productId, isInCart, getProduct]);

  const handleAddToCart = () => {
    if (product) {
      if (isInCart(product.$id)) {
        updateQuantity(product.$id, quantity);
      } else {
        addProduct({ ...product });
        if (quantity > 1) {
          updateQuantity(product.$id, quantity);
        }
      }
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!product) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-[70vh]">
          <p>Product not found</p>
        </div>
      </>
    );
  }

  const productInCart = isInCart(product.$id);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="relative min-h-[400px] bg-muted rounded-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full md:w-auto"
                size="lg"
                onClick={handleAddToCart}
                variant={productInCart ? "secondary" : "default"}
              >
                {productInCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Update Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
