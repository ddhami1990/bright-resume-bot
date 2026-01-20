import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const FitAssessment = () => {
  const [jobDescription, setJobDescription] = useState(
    `Senior Platform Engineer — Series B Fintech

We're looking for someone with deep API design experience, comfort with ambiguity, and the ability to lead cross-functional initiatives. You'll own our integration platform serving hundreds of partners...`
  );
  
  const [activeExample, setActiveExample] = useState<"strong" | "weak">("strong");

  const strongFitExample = `Senior Platform Engineer — Series B Fintech

We're looking for someone with deep API design experience, comfort with ambiguity, and the ability to lead cross-functional initiatives. You'll own our integration platform serving hundreds of partners...`;

  const weakFitExample = `Head of Consumer Mobile — Series A Consumer App

We're building a social app for Gen Z. Looking for someone with deep mobile development experience (iOS/Android), growth experimentation background, and consumer product intuition...`;

  const handleExampleClick = (type: "strong" | "weak") => {
    setActiveExample(type);
    setJobDescription(type === "strong" ? strongFitExample : weakFitExample);
  };

  return (
    <section id="fit-check" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">
            Honest Fit Assessment
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Paste a job description. Get an honest assessment of whether I'm the right person—including when I'm not.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Example Toggles */}
          <div className="flex gap-3 justify-center">
            <Button
              variant={activeExample === "strong" ? "default" : "outline"}
              size="sm"
              onClick={() => handleExampleClick("strong")}
              className={activeExample === "strong" ? "bg-primary text-primary-foreground" : ""}
            >
              Strong Fit Example
            </Button>
            <Button
              variant={activeExample === "weak" ? "default" : "outline"}
              size="sm"
              onClick={() => handleExampleClick("weak")}
              className={activeExample === "weak" ? "bg-primary text-primary-foreground" : ""}
            >
              Weak Fit Example
            </Button>
          </div>

          {/* Text Area */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Job description to analyze
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[160px] bg-card border-border focus:border-primary resize-none"
              placeholder="Paste a job description here..."
            />
          </div>

          {/* Analyze Button */}
          <Button 
            id="ask-ai"
            size="lg" 
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Sparkles className="w-5 h-5" />
            Analyze Fit
          </Button>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground italic">
            This signals something completely different than "please consider my resume."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FitAssessment;
