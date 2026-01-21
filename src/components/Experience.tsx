import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description?: string;
  bullets: string[];
  achievements?: string[];
  aiContext: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Cornerstone on Demand",
    role: "Lead SDET",
    period: "03/2021 – Present",
    description: "Cloud-based educational and productivity solutions",
    bullets: [
      "Pioneered AI-driven regression analysis within software test automation, pinpointing defects with 95% accuracy and slashing testing cycle duration by 40%",
      "Created and maintained detailed documentation for AI testing procedures, ensuring repeatable and effective test strategies",
      "Proficient in debugging and fixing script failures for API and Selenium testing in JAVA and C#",
      "Provided mentorship and technical guidance to junior QA engineers",
      "Integrated automated tests into CI/CD pipelines using Azure DevOps and TeamCity",
      "Non-functional testing (Performance, Security, Accessibility)",
    ],
    achievements: [
      "Increased test efficiency by 30% through automation framework",
      "Mentored 10 junior QA engineers, leading to 25% team productivity boost",
      "Launched automated testing frameworks leading to 60% improvement in test coverage and 35% reduction in post-release defects",
    ],
    aiContext: "At Cornerstone, I've been driving the adoption of AI in our testing strategy. The 95% defect detection accuracy comes from implementing machine learning models that analyze historical test data to predict high-risk areas. The 40% reduction in testing cycles was achieved by prioritizing test cases based on code change impact analysis.",
  },
  {
    company: "Varian Medical Systems",
    role: "Senior Test Analyst",
    period: "12/2017 – 03/2021",
    bullets: [
      "Built and maintained Selenium-based automation frameworks in JAVA and C#",
      "Implemented JUnit and TestNG for structured test execution",
      "Performed API testing using Postman and RESTAssured, ensuring system integrity",
      "Validated application security by leveraging OWASP ZAP, identifying and resolving five critical vulnerabilities including cross-site scripting flaws",
    ],
    aiContext: "Working in medical devices was a turning point for understanding the importance of thorough testing. The security work with OWASP ZAP was critical—we identified vulnerabilities that could have exposed patient data. This experience shaped my approach to treating security as a first-class testing concern.",
  },
  {
    company: "Jardine Lloyd Thompson",
    role: "Senior Test Analyst",
    period: "12/2014 – 12/2017",
    bullets: [
      "Effectively communicated test status to clients, project teams, sponsors, and steering committees",
      "Developed a Selenium framework using C# as the programming language",
      "Created comprehensive Test Case Matrices for all test cases being executed",
      "Implemented Automation Testing in a Continuous Integration environment using Build Definitions in TFS",
      "Achieved 98% test coverage for new release features",
    ],
    aiContext: "JLT is where I developed my communication skills alongside technical ones. Insurance software requires explaining complex testing scenarios to non-technical stakeholders. The 98% test coverage wasn't just a metric—it was about building confidence with clients that their critical financial systems were thoroughly validated.",
  },
  {
    company: "Infogain India",
    role: "Software Engineer",
    period: "07/2012 – 12/2014",
    bullets: [
      "Created Coded UI Test scripts, including UI validations, XML manipulations, and database validations",
      "Prepared Automation Test Scripts for available Test cases using Coded UI",
      "Conducted white box testing by writing Unit Test cases to increase code coverage",
      "Executed and wrote manual test cases using Quality Center and Microsoft Test Manager",
    ],
    aiContext: "This was my foundation in test automation. Starting with Coded UI and Microsoft tools gave me a solid understanding of enterprise testing practices. The exposure to both white-box and black-box testing here shaped my holistic approach to quality engineering.",
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
          {experience.description && (
            <p className="text-sm text-muted-foreground mt-1">{experience.description}</p>
          )}
        </div>
        <span className="text-muted-foreground text-sm whitespace-nowrap">{experience.period}</span>
      </div>
      
      <ul className="space-y-3 mb-4">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <span className="text-muted-foreground">{bullet}</span>
          </li>
        ))}
      </ul>

      {experience.achievements && (
        <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="text-sm font-medium text-primary mb-2">Key Achievements</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary">★</span>
                <span className="text-foreground">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
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
            13+ years of quality engineering excellence. Each role includes AI context—the real story behind the metrics.
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
