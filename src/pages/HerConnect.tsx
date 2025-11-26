import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Users, Play, Lock, Mail, ExternalLink, Clock, BookOpen, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  isPremium: boolean;
  category: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "How to Start Your Small Business from Home",
    channel: "Women Entrepreneurs India",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    duration: "15:32",
    isPremium: false,
    category: "Business Basics",
  },
  {
    id: "2",
    title: "Digital Marketing 101 for Small Businesses",
    channel: "Marketing Queens",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    duration: "22:18",
    isPremium: false,
    category: "Marketing",
  },
  {
    id: "3",
    title: "Financial Planning for Women Entrepreneurs",
    channel: "Money Matters",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    duration: "18:45",
    isPremium: false,
    category: "Finance",
  },
  {
    id: "4",
    title: "Building Your Personal Brand on Social Media",
    channel: "Brand Builders",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    duration: "12:30",
    isPremium: false,
    category: "Marketing",
  },
  {
    id: "5",
    title: "Advanced Leadership Strategies for Women",
    channel: "Leadership Academy",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400",
    duration: "35:20",
    isPremium: true,
    category: "Leadership",
  },
  {
    id: "6",
    title: "E-commerce Setup Masterclass",
    channel: "Tech for Women",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    duration: "45:00",
    isPremium: true,
    category: "Business Basics",
  },
  {
    id: "7",
    title: "Negotiation Skills for Business Women",
    channel: "Success Stories",
    thumbnail: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400",
    duration: "28:15",
    isPremium: true,
    category: "Leadership",
  },
  {
    id: "8",
    title: "Tax Planning & GST for Small Businesses",
    channel: "Money Matters",
    thumbnail: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400",
    duration: "32:40",
    isPremium: true,
    category: "Finance",
  },
];

const mentors = [
  {
    name: "Priya Sharma",
    title: "Serial Entrepreneur",
    expertise: "E-commerce & Retail",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
  },
  {
    name: "Anjali Mehta",
    title: "Marketing Expert",
    expertise: "Digital Marketing & Branding",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
  },
  {
    name: "Kavita Reddy",
    title: "Financial Advisor",
    expertise: "Business Finance & Investment",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200",
  },
];

const categories = ["All", "Business Basics", "Marketing", "Finance", "Leadership"];

const HerConnect = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const { toast } = useToast();

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    const matchesPremium = !showPremiumOnly || video.isPremium;
    return matchesCategory && matchesPremium;
  });

  const freeVideos = filteredVideos.filter(v => !v.isPremium);
  const premiumVideos = filteredVideos.filter(v => v.isPremium);

  const handleContactSubmit = () => {
    if (!contactName || !contactEmail || !contactMessage) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Message Sent!",
      description: "A mentor will get back to you within 24-48 hours.",
    });
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const handleWatchVideo = (video: Video) => {
    if (video.isPremium) {
      toast({
        title: "Premium Content",
        description: "Upgrade to Premium to access this content.",
      });
    } else {
      toast({
        title: "Opening Video",
        description: `Now playing: ${video.title}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-connect flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">HerConnect</h1>
            <p className="text-muted-foreground">Learn, grow, and connect with mentors</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
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

        {/* Free Videos Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-connect" />
            <h2 className="text-xl font-semibold text-foreground">Free Learning Resources</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeVideos.map((video, i) => (
              <Card 
                key={video.id} 
                className="overflow-hidden shadow-card hover:shadow-hover transition-all group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => handleWatchVideo(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">{video.category}</Badge>
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.channel}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Premium Videos Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Premium Courses</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Premium</Badge>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumVideos.map((video, i) => (
              <Card 
                key={video.id} 
                className="overflow-hidden shadow-card hover:shadow-hover transition-all group cursor-pointer animate-fade-in relative"
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => handleWatchVideo(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-card/90 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                    Premium
                  </Badge>
                </div>
                
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">{video.category}</Badge>
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{video.channel}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-6 shadow-card bg-gradient-to-r from-primary/10 to-accent/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Unlock All Premium Content</h3>
                <p className="text-sm text-muted-foreground">Get access to 50+ courses, live sessions, and exclusive mentor support.</p>
              </div>
              <Button variant="hero" size="lg">
                Upgrade to Premium
              </Button>
            </div>
          </Card>
        </section>

        {/* Mentors Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-connect" />
            Meet Our Mentors
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <Card key={mentor.name} className="p-6 shadow-card hover:shadow-hover transition-all text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary"
                />
                <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                <p className="text-sm text-primary font-medium">{mentor.title}</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{mentor.expertise}</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <Card className="p-6 md:p-8 shadow-card max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-2 text-center">Contact a Mentor</h2>
            <p className="text-muted-foreground text-center mb-6">Have questions? Reach out to our mentors for guidance.</p>
            
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Your Message</label>
                <Textarea
                  placeholder="How can we help you?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button className="w-full" onClick={handleContactSubmit}>
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default HerConnect;