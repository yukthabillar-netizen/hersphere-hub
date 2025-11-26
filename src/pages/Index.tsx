import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModuleCard from "@/components/ModuleCard";
import { Heart, TrendingUp, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  const modules = [
    {
      title: "HerHealth+",
      description: "Track your cycle, mood, and wellness journey with AI-powered insights and personalized care tips.",
      icon: Heart,
      path: "/health",
      gradient: "bg-gradient-to-br from-rose-500 to-pink-500",
      iconBg: "bg-health",
    },
    {
      title: "HerFinance",
      description: "Buy and sell handmade products in our women-only marketplace. Support fellow entrepreneurs.",
      icon: TrendingUp,
      path: "/finance",
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      iconBg: "bg-finance",
    },
    {
      title: "HerConnect",
      description: "Learn from mentors, access business courses, and connect with inspiring women leaders.",
      icon: Users,
      path: "/connect",
      gradient: "bg-gradient-to-br from-sky-500 to-blue-500",
      iconBg: "bg-connect",
    },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">Empowering Women Everywhere</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Your Space for{" "}
                <span className="text-primary">Health</span>,{" "}
                <span className="text-finance">Finance</span> &{" "}
                <span className="text-connect">Growth</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                HerSphere is your all-in-one platform for wellness tracking, financial independence, and mentorship. Built by women, for women.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/health">Get Started Free</Link>
                </Button>
                <Button variant="google" size="xl" className="gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-3xl blur-2xl opacity-20 animate-pulse-soft" />
                <img
                  src={heroImage}
                  alt="Women wellness and empowerment"
                  className="relative rounded-3xl shadow-card w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Your Sphere
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three powerful modules designed to support every aspect of your journey as a woman.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((module, index) => (
            <ModuleCard key={module.path} {...module} delay={index * 100} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-card rounded-3xl border border-border shadow-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Cycles Tracked" },
              { number: "10K+", label: "Products Sold" },
              { number: "500+", label: "Mentors" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-16 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary-foreground rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Join HerSphere?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start your journey today and become part of a thriving community of empowered women.
            </p>
            <Button variant="google" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Sign Up for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-lg text-foreground">HerSphere</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HerSphere. Empowering women through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;