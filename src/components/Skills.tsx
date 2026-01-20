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
      "Platform/Infrastructure Architecture",
      "API Design & Versioning",
      "Technical Strategy",
      "Cross-functional Leadership",
      "Technical Debt Cleanup",
      "Developer Experience",
    ],
  },
  {
    title: "Moderate",
    type: "moderate",
    skills: [
      "Data Engineering",
      "Security & Compliance",
      "Team Building",
    ],
  },
  {
    title: "Gaps (I'll tell you)",
    type: "gaps",
    skills: [
      "Consumer Product",
      "Mobile Development",
      "Growth/Experimentation",
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
      </div>
    </section>
  );
};

export default Skills;
