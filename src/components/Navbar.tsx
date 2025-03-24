"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  Moon,
  Sun,
  LogOut,
  Home,
  Package,
  ShoppingBag,
  Settings,
  Heart,
  Search,
  Menu,
} from "lucide-react";
import useStore from "@/stores/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { name, itemCount } = useStore();
  const firstName = name ? name.split(' ')[0] : '';
  const [mounted, setMounted] = React.useState(false);

  // Set mounted to true after component mounts (client-side only)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Stationery Shop</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link href="/">
                    <Button variant="ghost" className="justify-start w-full">
                      <Home className="mr-2 h-4 w-4" /> Home
                    </Button>
                  </Link>
                </SheetClose>
                {mounted && isAuthenticated && (
                  <>
                    <SheetClose asChild>
                      <Link href="/orders">
                        <Button variant="ghost" className="justify-start w-full">
                          <Package className="mr-2 h-4 w-4" /> Orders
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/profile">
                        <Button variant="ghost" className="justify-start w-full">
                          <User className="mr-2 h-4 w-4" /> Profile
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
                <SheetClose asChild>
                  <Link href="/cart">
                    <Button variant="ghost" className="justify-start w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Cart {mounted && itemCount > 0 && `(${itemCount})`}
                    </Button>
                  </Link>
                </SheetClose>
                {mounted && !isAuthenticated && (
                  <SheetClose asChild>
                    <Link href="/auth/signin">
                      <Button variant="default" className="mt-2 w-full">Sign In</Button>
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-semibold text-lg hidden sm:inline">Stationery Shop</span>
          </Link>
        </div>

        {/* Search bar - desktop */}
        <div className="hidden md:flex max-w-md w-full mx-4 relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" className="hover:scale-125 active:scale-95 cursor-pointer" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {mounted ? (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : (
              <div className="w-5 h-5 bg-muted-foreground rounded-full animate-pulse" />
            )}
          </Button>
          {/* Wishlist - mobile only */}

          {/* Wishlist - desktop only */}
          <Link href="/wishlist" className="hidden sm:flex">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User menu */}
          {
            isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                    <Avatar className="h-6 w-6">
                      {/* <AvatarImage src={avatar} alt={name} /> */}
                      <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    router.push('/auth/signout');
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/signin">
                <Button variant="default" size="sm" className="hidden md:flex">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )
          }
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden container mx-auto px-4 mt-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="pr-10"
            id="search"
            autoComplete="on"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
