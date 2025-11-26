import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
  iconBg: string;
  delay?: number;
}

const ModuleCard = ({ title, description, icon: Icon, path, gradient, iconBg, delay = 0 }: ModuleCardProps) => {
  return (
    <Link
      to={path}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-6 h-full",
        "bg-card border border-border",
        "shadow-card hover:shadow-hover",
        "transition-all duration-500",
        "hover:scale-[1.02] hover:-translate-y-1"
      )}>
        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          gradient
        )} />
        
        {/* Content */}
        <div className="relative z-10">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
            "transition-transform duration-500 group-hover:scale-110",
            iconBg
          )}>
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Explore
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;