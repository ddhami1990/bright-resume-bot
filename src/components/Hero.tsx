import { motion } from "framer-motion";
import { MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const companies = ["Stripe", "Datadog", "Series B → IPO"];
  
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">
              Open to Staff+ roles at Series B-D companies
            </span>
          </div>

          {/* Name */}
          <h1 className="font-serif text-6xl md:text-8xl font-medium tracking-tight mb-4">
            Marcus Chen
          </h1>

          {/* Title */}
          <h2 className="font-serif text-2xl md:text-4xl text-primary italic mb-4">
            Staff Engineer
          </h2>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Platform infrastructure, developer tools, and technical strategy
          </p>

          {/* Company Tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            {companies.map((company) => (
              <Badge 
                key={company} 
                variant="outline" 
                className="px-4 py-2 text-sm border-border hover:border-primary/50 transition-colors cursor-default"
              >
                {company}
              </Badge>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative inline-block">
            <Button 
              size="lg" 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
              onClick={() => document.getElementById('ask-ai')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageSquare className="w-5 h-5" />
              Ask AI About Me
            </Button>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              New
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll to explore
          </span>
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-scroll-hint" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
