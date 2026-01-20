import { motion } from "framer-motion";
import { Check, Circle, X } from "lucide-react";

interface SkillCategory {
  title: string;
  type: "strong" | "moderate" | "gaps";
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Strong",
    type: "strong",
    skills: [
      "AI-Driven Test Automation",
      "Selenium & JAVA Frameworks",
      "API Testing (Postman, RESTAssured)",
      "CI/CD Integration (Azure DevOps, TeamCity)",
      "Test Strategy & Documentation",
      "Team Mentorship & Leadership",
    ],
  },
  {
    title: "Moderate",
    type: "moderate",
    skills: [
      "Security Testing (OWASP ZAP)",
      "Performance Testing",
      "Accessibility Testing",
    ],
  },
  {
    title: "Gaps (I'll tell you)",
    type: "gaps",
    skills: [
      "Mobile App Testing",
      "Load Testing at Scale",
      "Cloud Infrastructure Testing",
    ],
  },
];

const getIcon = (type: SkillCategory["type"]) => {
  switch (type) {
    case "strong":
      return <Check className="w-4 h-4 text-primary" />;
    case "moderate":
      return <Circle className="w-4 h-4 text-muted-foreground" />;
    case "gaps":
      return <X className="w-4 h-4 text-destructive/70" />;
  }
};

const Skills = () => {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Skills Matrix</h2>
          <p className="text-muted-foreground">
            An honest assessment of my technical capabilities
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-serif text-lg font-medium mb-4 text-muted-foreground">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    {getIcon(category.type)}
                    <span className={category.type === "gaps" ? "text-muted-foreground" : "text-foreground"}>
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border"
        >
          <h3 className="font-serif text-2xl font-medium mb-4">Education</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="text-foreground font-medium">Bachelor of Technology</span>
            <span className="hidden md:block text-muted-foreground">•</span>
            <span className="text-muted-foreground">Graphic Era University</span>
            <span className="hidden md:block text-muted-foreground">•</span>
            <span className="text-muted-foreground">2008 – 2012</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
