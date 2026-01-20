import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  aiContext: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Datadog",
    role: "Staff Engineer, Platform Infrastructure",
    period: "2021–Present",
    bullets: [
      "Designed observability platform serving 15K+ customers, handling 10TB/day",
      "Led 12-person team through SOC2 compliance certification",
      "Reduced infrastructure costs by $1.2M/year through optimization",
    ],
    aiContext: "At Datadog, I led the platform infrastructure team responsible for our core observability pipeline. The 10TB/day metric represents our peak ingestion rate during customer incidents. The SOC2 certification was a 6-month project that required coordinating across 4 teams and redesigning our audit logging system.",
  },
  {
    company: "Stripe",
    role: "Senior Engineer → Staff Engineer",
    period: "2018–2021",
    bullets: [
      "Built integration ecosystem serving 500+ partners, 2M+ API calls/day",
      "Designed versioning strategy maintaining backward compatibility across 3 major releases",
      "Hired and mentored 6 engineers on the platform team",
    ],
    aiContext: "My promotion to Staff came after leading the API versioning initiative. This was a critical project because Stripe's commitment to API stability is core to our developer trust. I designed a system that allowed us to evolve the API while maintaining full backward compatibility for 3+ years of versions.",
  },
  {
    company: "Series B Startup (acquired)",
    role: "Founding Engineer",
    period: "2016–2018",
    bullets: [
      "First engineering hire; built v1 of the product in 4 months",
      "Navigated two pivots during that period",
      "Defined technical strategy and hired first 6 engineers",
    ],
    aiContext: "This was a fintech startup in the B2B payments space. We were acquired by a larger payments company. The two pivots taught me a lot about balancing technical debt with speed-to-market. I learned when to build for scale vs. when to build for learning.",
  },
];

const ExperienceCard = ({ experience, index }: { experience: ExperienceItem; index: number }) => {
  const [showContext, setShowContext] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-lg p-6 md:p-8 bg-card card-hover"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
        <div>
          <h3 className="font-serif text-2xl font-medium">{experience.company}</h3>
          <p className="text-primary">{experience.role}</p>
        </div>
        <span className="text-muted-foreground text-sm">{experience.period}</span>
      </div>
      
      <ul className="space-y-3 mb-6">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <span className="text-muted-foreground">{bullet}</span>
          </li>
        ))}
      </ul>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowContext(!showContext)}
        className="text-primary hover:text-primary hover:bg-primary/10 gap-2"
      >
        <Sparkles className="w-4 h-4" />
        {showContext ? "Hide AI Context" : "View AI Context"}
      </Button>
      
      {showContext && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-secondary/50 rounded-lg border border-primary/20"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {experience.aiContext}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-xl">
            Each role includes queryable AI context—the real story behind the bullet points.
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
