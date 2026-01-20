import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-xl font-semibold tracking-tight">DD</span>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#experience" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>
          <a 
            href="#fit-check" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Fit Check
          </a>
          <Button 
            size="sm" 
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => document.getElementById('ask-ai')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageSquare className="w-4 h-4" />
            Ask AI
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
