import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { TrendingUp, ShoppingBag, Store, Search, Plus, Heart, Star, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  category: string;
  description: string;
  rating: number;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Handmade Mango Pickle",
    price: 299,
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400",
    seller: "Lakshmi's Kitchen",
    category: "Food",
    description: "Traditional homemade mango pickle with secret family recipe",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Terracotta Plant Pots (Set of 3)",
    price: 599,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    seller: "Green Hands Pottery",
    category: "Home",
    description: "Beautiful handcrafted terracotta pots for your indoor plants",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Organic Turmeric Powder",
    price: 199,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    seller: "Spice Queens",
    category: "Food",
    description: "Pure organic turmeric from our family farm",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Hand-woven Cotton Tote Bag",
    price: 450,
    image: "https://images.unsplash.com/photo-1597633125097-5a9ae3a8a713?w=400",
    seller: "Weave Dreams",
    category: "Fashion",
    description: "Eco-friendly handwoven cotton bag in beautiful colors",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Homemade Coconut Oil",
    price: 350,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
    seller: "Nature's Touch",
    category: "Beauty",
    description: "Cold-pressed virgin coconut oil for hair and skin",
    rating: 4.9,
  },
  {
    id: "6",
    title: "Bamboo Craft Basket",
    price: 799,
    image: "https://images.unsplash.com/photo-1595872018818-97555653a011?w=400",
    seller: "Craft Village",
    category: "Home",
    description: "Intricately designed bamboo storage basket",
    rating: 4.8,
  },
];

const categories = ["All", "Food", "Home", "Fashion", "Beauty"];

const HerFinance = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  // Seller form state
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({ title: "Removed from wishlist" });
    } else {
      setWishlist([...wishlist, productId]);
      toast({ title: "Added to wishlist", description: "You can view your wishlist in your profile" });
    }
  };

  const handleBuyNow = (product: Product) => {
    toast({
      title: "Order Placed!",
      description: `Your order for ${product.title} has been placed successfully.`,
    });
  };

  const handleListProduct = () => {
    if (!productTitle || !productPrice || !productCategory) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Product Listed!",
      description: `${productTitle} is now live in the marketplace.`,
    });
    setProductTitle("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-finance flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">HerFinance</h1>
            <p className="text-muted-foreground">Women's marketplace for handmade goods</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="buy" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Buy Products
            </TabsTrigger>
            <TabsTrigger value="sell" className="gap-2">
              <Store className="w-4 h-4" />
              Sell Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products or sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden shadow-card hover:shadow-hover transition-all group animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`
                        absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center
                        transition-all ${wishlist.includes(product.id) ? "bg-primary text-primary-foreground" : "bg-card/80 backdrop-blur text-foreground hover:bg-card"}
                      `}
                    >
                      <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                    </button>
                    <Badge className="absolute bottom-3 left-3 bg-card/80 backdrop-blur text-foreground">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">{product.title}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{product.seller}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
                      <Button size="sm" onClick={() => handleBuyNow(product)}>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No products found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Product Form */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  List a New Product
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Product Title *</label>
                    <Input
                      placeholder="e.g., Handmade Mango Pickle"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Price (₹) *</label>
                      <Input
                        type="number"
                        placeholder="299"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category *</label>
                      <select
                        className="w-full h-11 px-3 rounded-xl border border-input bg-background text-foreground"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                      >
                        <option value="">Select...</option>
                        {categories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe your product..."
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Product Image</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleListProduct}>
                    <Store className="w-4 h-4 mr-2" />
                    List Product
                  </Button>
                </div>
              </Card>

              {/* Seller Stats */}
              <div className="space-y-6">
                <Card className="p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Your Seller Dashboard</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Total Products", value: "12" },
                      { label: "Total Sales", value: "₹24,580" },
                      { label: "Orders This Month", value: "34" },
                      { label: "Avg Rating", value: "4.8 ⭐" },
                    ].map(stat => (
                      <div key={stat.label} className="bg-secondary rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">Commission: 10-15%</span> on every sale goes towards platform maintenance and women's empowerment programs.
                  </p>
                </Card>

                <Card className="p-6 shadow-card bg-gradient-to-br from-finance/10 to-amber-100/50">
                  <h3 className="font-semibold text-foreground mb-2">💡 Seller Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Use clear, well-lit photos of your products</li>
                    <li>• Write detailed descriptions with ingredients/materials</li>
                    <li>• Respond quickly to buyer inquiries</li>
                    <li>• Offer bundle discounts to increase sales</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HerFinance;