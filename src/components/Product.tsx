import React from 'react';
import Link from 'next/link';
import { toast } from "sonner";
import Image from 'next/image';
import useStore from '@/stores/store';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product as ProductType } from '@/stores/cartSlice';
import { ShoppingCart, Check, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductProps {
  product: ProductType;
  isNew?: boolean;
  isOnSale?: boolean;
  salePercentage?: number;
}

const Product = ({ product, isNew = false, isOnSale = false, salePercentage = 0 }: ProductProps) => {
  const { addProduct, isInCart } = useStore((state) => state);
  const router = useRouter();

  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addProduct(product);

    toast("Added to cart", {
      description: `${product.name} has been added to your cart`,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const productInCart = isInCart(product.$id);

  const originalPrice = isOnSale ? product.price / (1 - salePercentage / 100) : product.price;

  return (
    <Card
      className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md group border-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Action buttons that appear on hover */}
        <div className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(() => !isLiked);
              toast("Added to wishlist", {
                description: `${product.name} has been added to your wishlist`,
              });
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-pink-600 text-pink-600' : ""}`} />
          </Button>

          {/* Quick view button */}
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full shadow-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/product/${product.$id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {/* <Dialog>
            <DialogTrigger>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl relative z-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <div className="relative h-80 bg-muted rounded-md">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <div className="flex items-center mb-4">
                    {isOnSale ? (
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-xl">${product.price.toFixed(2)}</p>
                        <p className="text-muted-foreground line-through text-sm">${originalPrice.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="font-semibold text-xl">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                  <p className="mb-6">{product.description}</p>
                  <Button
                    className="w-full hover:bg-amber-200"
                    onClick={handleAddToCart}
                    disabled={productInCart}
                    variant={productInCart ? "outline" : "ghost"}
                  >
                    {productInCart ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <div className="mt-4 flex justify-center">
                    <Link href={`/product/${product.$id}`} className="text-primary hover:underline text-sm">
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog> */}
        </div>

        {/* Badges for sale or new items */}
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {isOnSale && (
            <Badge variant="destructive" className="px-2 py-1">
              {salePercentage}% OFF
            </Badge>
          )}
          {isNew && (
            <Badge variant="default" className="px-2 py-1 bg-green-600 hover:bg-green-700">
              NEW
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="py-4">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.$id}`}>
            <h3 className="font-semibold text-lg hover:underline group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          {isOnSale ? (
            <div className="flex flex-col items-end">
              <p className="font-semibold text-destructive">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground line-through text-xs">${originalPrice.toFixed(2)}</p>
            </div>
          ) : (
            <p className="font-semibold">${product.price.toFixed(2)}</p>
          )}
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{product.description}</p>
      </CardContent>

      <CardFooter className="mt-auto pt-0">
        <Button
          className="w-full group-hover:bg-primary"
          onClick={handleAddToCart}
          disabled={productInCart}
          variant={productInCart ? "secondary" : "default"}
        >
          {productInCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;