import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { User, Mail, Camera, Crown, LogOut, Edit2, Heart, ShoppingBag, BookOpen, Calendar, TrendingUp, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah@example.com");

  // Mock user data
  const user = {
    name,
    email,
    role: "Member",
    membershipStatus: "Free",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    joinedDate: "November 2024",
    healthLogs: 45,
    productsListed: 3,
    productsBought: 12,
    coursesCompleted: 8,
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Profile updated successfully!" });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to Premium",
      description: "You'll be redirected to the payment page.",
    });
  };

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
  };

  const stats = [
    { icon: Calendar, label: "Health Logs", value: user.healthLogs, color: "text-health" },
    { icon: ShoppingBag, label: "Products Bought", value: user.productsBought, color: "text-finance" },
    { icon: TrendingUp, label: "Products Listed", value: user.productsListed, color: "text-finance" },
    { icon: BookOpen, label: "Courses Done", value: user.coursesCompleted, color: "text-connect" },
  ];

  const recentActivity = [
    { type: "health", text: "Logged period start date", time: "2 hours ago", icon: Heart },
    { type: "finance", text: "Purchased Handmade Pickle", time: "Yesterday", icon: ShoppingBag },
    { type: "connect", text: "Completed 'Marketing 101' course", time: "3 days ago", icon: BookOpen },
    { type: "health", text: "Updated mood tracker", time: "4 days ago", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-card animate-fade-in">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover ring-4 ring-secondary"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-card hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-center"
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-center"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={handleSave}>Save</Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                    <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Badge variant="secondary">{user.role}</Badge>
                      <Badge 
                        className={user.membershipStatus === "Premium" 
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" 
                          : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {user.membershipStatus === "Premium" && <Crown className="w-3 h-3 mr-1" />}
                        {user.membershipStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Member since {user.joinedDate}</p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {!isEditing && (
                  <Button variant="outline" className="w-full gap-2" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
                
                {user.membershipStatus !== "Premium" && (
                  <Button variant="hero" className="w-full gap-2" onClick={handleUpgrade}>
                    <Crown className="w-4 h-4" />
                    Upgrade to Premium
                  </Button>
                )}
                
                <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </div>
            </Card>

            {/* Settings Card */}
            <Card className="p-6 shadow-card mt-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Settings
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Email Notifications", enabled: true },
                  { label: "Period Reminders", enabled: true },
                  { label: "Marketing Emails", enabled: false },
                ].map(setting => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{setting.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors ${
                        setting.enabled ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          setting.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <Card 
                  key={stat.label} 
                  className="p-4 shadow-card text-center animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === "health" ? "bg-health/20 text-health" :
                      activity.type === "finance" ? "bg-finance/20 text-finance" :
                      "bg-connect/20 text-connect"
                    }`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Premium Features */}
            {user.membershipStatus !== "Premium" && (
              <Card className="p-6 shadow-card bg-gradient-to-br from-primary/10 via-accent/20 to-secondary animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Go Premium Today!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Unlock PCOS detection, AI diet plans, premium courses, and mentor access.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["PCOS Detector", "AI Diet Plans", "50+ Courses", "Mentor Access", "Priority Support"].map(feature => (
                        <Badge key={feature} variant="secondary" className="bg-card">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="hero" onClick={handleUpgrade}>
                      Upgrade Now - ₹299/month
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Your Products (if seller) */}
            <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Your Listed Products</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Homemade Pickle", price: 299, sales: 12 },
                  { name: "Organic Honey", price: 450, sales: 8 },
                  { name: "Hand Embroidered Bag", price: 899, sales: 5 },
                ].map((product, i) => (
                  <div key={product.name} className="p-4 bg-secondary/50 rounded-xl">
                    <div className="w-full h-24 bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">{product.name}</h4>
                    <p className="text-primary font-semibold">₹{product.price}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;