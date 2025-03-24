"use client";
import React from "react";
import { toast } from "sonner";
import Product from "@/components/Product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { mockProducts } from "../../public/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Product as ProductType } from "@/stores/cartSlice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, ShoppingBag, ArrowDown, ArrowUp, X, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extract unique categories
const categories = ["all", ...new Set(mockProducts.map(p => p.category))];

export default function Home() {
  const [products, setProducts] = React.useState<(ProductType & {
    category: string;
    isNew: boolean;
    isOnSale: boolean;
    salePercentage: number;
    rating: number;
  })[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<typeof mockProducts>([]);
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [sortOption, setSortOption] = React.useState("featured");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 30]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [showNewOnly, setShowNewOnly] = React.useState(false);
  const [showSaleOnly, setShowSaleOnly] = React.useState(false);

  const maxPrice = Math.max(...mockProducts.map(p => p.price));

  React.useEffect(() => {
    // Notify user that we're using demo data
    setTimeout(() => {
      toast.info("Demo Mode Active", {
        description: "This shop is using mock data for demonstration",
      });
    }, 1000);
  }, []);

  // In a real app, this would be an API call
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setPriceRange([0, Math.ceil(maxPrice)]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [maxPrice]);

  // Apply filters when they change
  React.useEffect(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by new items
    if (showNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // Filter by sale items
    if (showSaleOnly) {
      result = result.filter(p => p.isOnSale);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      // For "featured", use the original order
    }

    setFilteredProducts(result);
  }, [activeCategory, products, priceRange, searchQuery, sortOption, showNewOnly, showSaleOnly]);

  // Reset filters function
  const resetFilters = () => {
    setActiveCategory("all");
    setSortOption("featured");
    setPriceRange([0, Math.ceil(maxPrice)]);
    setSearchQuery("");
    setShowNewOnly(false);
    setShowSaleOnly(false);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 mb-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quality Stationery for Every Need</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover our collection of premium stationery products for work, school, and creative projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              <ShoppingBag size={18} />
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              View Collections
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== "all").map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-32 flex flex-col items-center justify-center text-center gap-2 hover:bg-primary/10 transition-all"
                onClick={() => setActiveCategory(category)}
              >
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {category === "notebooks" && <ShoppingBag size={20} />}
                  {category === "art" && <Star size={20} />}
                  {category === "writing" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>}
                  {category === "office" && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                </div>
                <span className="capitalize font-medium">{category}</span>
                <span className="text-xs text-muted-foreground">{mockProducts.filter(p => p.category === category).length} Products</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Products Listing with Filters */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Our Products</h2>
            {filteredProducts.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6 pr-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-8 text-xs"
                    >
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="desktop-search" className="text-sm">Search</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="desktop-search"
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-8"
                        />
                        {searchQuery ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-full aspect-square absolute right-0 top-0"
                            onClick={() => setSearchQuery("")}
                          >
                            <X size={14} />
                          </Button>
                        ) : (
                          <Search className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm">Price Range</Label>
                      <div className="mt-2 px-1">
                        <Slider
                          defaultValue={[0, 30]}
                          value={priceRange}
                          max={Math.ceil(maxPrice)}
                          step={1}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Product Status</Label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="desktop-new-only"
                            checked={showNewOnly}
                            onChange={(e) => setShowNewOnly(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="desktop-new-only" className="text-sm cursor-pointer">New Arrivals</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="desktop-sale-only"
                            checked={showSaleOnly}
                            onChange={(e) => setShowSaleOnly(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="desktop-sale-only" className="text-sm cursor-pointer">On Sale</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm">Sort By</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full mt-1.5">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm">Categories</Label>
                  <div className="mt-1.5 space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "secondary" : "ghost"}
                        onClick={() => setActiveCategory(category)}
                        className="w-full justify-start text-sm px-2 h-8 font-normal capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Tabs and Mobile Filters */}
              <div className="lg:hidden mb-6">
                <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
                  <div className="flex items-center justify-between gap-4 mb-4 overflow-x-auto pb-2">
                    <TabsList className="overflow-x-auto">
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="capitalize"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </Tabs>

                {/* Mobile filter buttons */}
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex-1 gap-1 justify-center"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>

                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="flex-1">
                      <div className="flex items-center gap-1">
                        <ArrowDown className="h-3.5 w-3.5" />
                        <ArrowUp className="h-3.5 w-3.5" />
                        <span>Sort</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Filter Panel */}
              {showFilters && (
                <div className="lg:hidden border rounded-md p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                    >
                      Reset All
                    </Button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="mobile-search">Search</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="mobile-search"
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-8"
                        />
                        {searchQuery ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-full aspect-square absolute right-0 top-0"
                            onClick={() => setSearchQuery("")}
                          >
                            <X size={14} />
                          </Button>
                        ) : (
                          <Search className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Price Range</Label>
                      <div className="mt-2 px-1">
                        <Slider
                          defaultValue={[0, 30]}
                          value={priceRange}
                          max={Math.ceil(maxPrice)}
                          step={1}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Product Status</Label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="mobile-new-only"
                            checked={showNewOnly}
                            onChange={(e) => setShowNewOnly(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="mobile-new-only" className="text-sm">New Arrivals</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="mobile-sale-only"
                            checked={showSaleOnly}
                            onChange={(e) => setShowSaleOnly(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="mobile-sale-only" className="text-sm">On Sale</label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button
                        onClick={() => setShowFilters(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {(activeCategory !== "all" || showNewOnly || showSaleOnly || searchQuery || priceRange[0] > 0 || priceRange[1] < Math.ceil(maxPrice)) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm font-medium">Active Filters:</span>
                  {activeCategory !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Category: {activeCategory}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setActiveCategory("all")}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  )}
                  {showNewOnly && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      New Only
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setShowNewOnly(false)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  )}
                  {showSaleOnly && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      On Sale
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setShowSaleOnly(false)}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {searchQuery}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setSearchQuery("")}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < Math.ceil(maxPrice)) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setPriceRange([0, Math.ceil(maxPrice)])}
                      >
                        <X size={10} />
                      </Button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Product Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-md">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-x"><path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" /><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">No Products Found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Product
                      key={product.$id}
                      product={product}
                      isNew={product.isNew}
                      isOnSale={product.isOnSale}
                      salePercentage={product.salePercentage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
