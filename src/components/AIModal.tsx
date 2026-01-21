import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";

interface AIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AIResponse {
  answer: string;
  confidence: number;
  sources: string[];
}

// Deepak's resume data for AI analysis
const resumeData = {
  name: "Deepak Dhami",
  title: "Lead Software Development Engineer In Test",
  experience: "13+ years",
  companies: ["Cornerstone on Demand", "Varian Medical", "JLT", "Infogain"],
  skills: {
    programming: ["Python", "JavaScript/TypeScript", "Java", "C#"],
    testing: ["Selenium", "Cypress", "Playwright", "Appium", "Postman", "RestAssured"],
    cicd: ["Jenkins", "GitHub Actions", "Azure DevOps", "TeamCity", "GitLab CI"],
    cloud: ["AWS", "GCP", "Azure"],
    security: ["OWASP ZAP", "Burp Suite"],
    performance: ["JMeter", "Gatling", "Locust"],
  },
  achievements: [
    "Pioneered AI-driven regression analysis with 95% accuracy",
    "Reduced testing cycle duration by 40%",
    "Built automation frameworks from scratch",
    "Led QA teams at multiple tech companies",
    "Mentored junior QA engineers",
    "Implemented comprehensive CI/CD pipelines",
    "Security testing identifying critical vulnerabilities",
    "98% test coverage for new releases",
  ],
  expertise: [
    "AI/ML Testing",
    "Test Automation",
    "CI/CD Integration",
    "Security Testing",
    "Performance Testing",
    "API Testing",
    "Leadership & Mentoring",
  ],
};

const sampleQuestions = [
  {
    text: "Would Deepak be good for a Series B startup with complex testing needs?",
    highlight: "Series B startup",
  },
  {
    text: "How did he achieve 95% accuracy in AI-driven testing?",
    highlight: "95% accuracy",
  },
  {
    text: "Tell me about his leadership experience.",
    highlight: "leadership",
  },
  {
    text: "What kind of automation frameworks has he built?",
    highlight: "automation frameworks",
  },
];

const analyzeQuestion = async (question: string): Promise<AIResponse> => {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const q = question.toLowerCase();
  let answer = "";
  let confidence = 0;
  let sources: string[] = [];

  // Leadership questions
  if (q.includes("leadership") || q.includes("lead") || q.includes("team") || q.includes("mentor")) {
    confidence = 94;
    sources = ["Experience at Cornerstone on Demand", "Mentorship roles", "Team management history"];
    answer = `Deepak has extensive leadership experience spanning ${resumeData.experience}. At Cornerstone on Demand, he currently leads QA initiatives as a Lead SDET. His leadership includes:

• **Team Mentorship**: Provided technical guidance to junior QA engineers, helping them grow in automation and testing methodologies
• **Process Leadership**: Established testing best practices and QA processes across teams
• **Cross-functional Collaboration**: Worked with product, engineering, and design teams to ensure quality at every stage
• **Strategic Testing**: Led QA for AI/ML products, making decisions on testing model accuracy and bias

His leadership style focuses on enabling others while maintaining technical excellence.`;
  }
  // AI/ML testing questions
  else if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("95%") || q.includes("accuracy")) {
    confidence = 97;
    sources = ["AI-driven regression analysis project", "ML platform QA experience", "Test automation innovations"];
    answer = `Deepak pioneered AI-driven regression analysis in software test automation, achieving remarkable results:

• **95% Accuracy**: His AI-powered approach pinpointed defects with 95% accuracy, significantly reducing false positives
• **40% Faster Testing**: The implementation slashed testing cycle duration by 40%
• **ML Platform Experience**: Led QA for machine learning platforms serving millions of users
• **Bias Testing**: Experience testing AI/ML models for accuracy and potential bias

The approach combined machine learning algorithms with traditional testing methodologies to predict and identify regression issues before they impacted production.`;
  }
  // Automation framework questions
  else if (q.includes("automation") || q.includes("framework") || q.includes("selenium") || q.includes("cypress")) {
    confidence = 96;
    sources = ["Technical skills inventory", "Framework development history", "Tool expertise"];
    answer = `Deepak has built multiple automation frameworks from scratch across different companies:

• **Languages**: Java, C#, Python, JavaScript/TypeScript
• **Web Testing**: Selenium, Cypress, Playwright
• **Mobile Testing**: Appium for cross-platform mobile automation
• **API Testing**: RestAssured, Postman for comprehensive API coverage

**Key Achievement**: Built an end-to-end test automation framework that reduced regression testing time by 75%. His frameworks are known for:
- Modular, maintainable architecture
- Data-driven testing capabilities
- Integration with CI/CD pipelines
- Comprehensive reporting and analytics`;
  }
  // Startup/Series B fit questions
  else if (q.includes("startup") || q.includes("series") || q.includes("fit") || q.includes("good for")) {
    confidence = 91;
    sources = ["Company history", "Adaptability evidence", "Technical breadth"];
    answer = `Deepak would be an excellent fit for a Series B startup with complex testing needs. Here's why:

• **Startup Experience**: Has worked with companies across different stages (Series A-C), understanding the unique challenges of scaling QA
• **Versatility**: Full-stack testing expertise—automation, security, performance, API, and AI/ML testing
• **Framework Builder**: Proven ability to build testing infrastructure from scratch, essential for startups
• **Leadership + IC**: Can both lead teams and contribute hands-on, valuable in smaller organizations
• **Fast Iteration**: Experience with CI/CD pipelines enables rapid deployment cycles startups need

His combination of technical depth and leadership experience makes him ideal for building and scaling QA at a growing startup.`;
  }
  // Security testing questions
  else if (q.includes("security") || q.includes("owasp") || q.includes("vulnerabilities")) {
    confidence = 93;
    sources = ["Security testing experience", "Tool expertise", "Vulnerability findings"];
    answer = `Deepak has strong security testing expertise:

• **Tools**: OWASP ZAP, Burp Suite for vulnerability scanning and penetration testing
• **Track Record**: Identified and resolved critical vulnerabilities including cross-site scripting flaws
• **Security Mindset**: Integrates security testing into the SDLC, not as an afterthought

At previous roles, he validated application security proactively, preventing security issues from reaching production.`;
  }
  // Skills questions
  else if (q.includes("skill") || q.includes("technology") || q.includes("tech stack") || q.includes("know")) {
    confidence = 98;
    sources = ["Technical skills inventory", "Project history", "Certifications"];
    answer = `Deepak's technical skill set spans the full testing spectrum:

**Programming**: ${resumeData.skills.programming.join(", ")}
**Testing Tools**: ${resumeData.skills.testing.join(", ")}
**CI/CD**: ${resumeData.skills.cicd.join(", ")}
**Cloud**: ${resumeData.skills.cloud.join(", ")}
**Security**: ${resumeData.skills.security.join(", ")}
**Performance**: ${resumeData.skills.performance.join(", ")}

His strongest areas are test automation, CI/CD integration, and AI-driven testing methodologies.`;
  }
  // Experience/history questions
  else if (q.includes("experience") || q.includes("work") || q.includes("career") || q.includes("history")) {
    confidence = 95;
    sources = ["Resume", "Career timeline", "Company history"];
    answer = `Deepak has ${resumeData.experience} of progressive experience in QA and test engineering:

**Current**: Lead SDET at Cornerstone on Demand (2021 - Present)
- Pioneered AI-driven regression analysis
- CI/CD pipeline integration with Azure DevOps and TeamCity
- Non-functional testing across performance, security, and accessibility

**Previous Roles**:
- **Varian Medical** (2017-2021): Senior Test Analyst - Built Selenium frameworks, API testing
- **JLT** (2014-2017): Automation Specialist - TFS integration, comprehensive test matrices
- **Infogain** (2011-2014): Test Engineer - Foundation in manual and automation testing

He's grown from individual contributor to leading QA initiatives at enterprise scale.`;
  }
  // Default response for other questions
  else {
    confidence = 78;
    sources = ["General resume analysis", "Skills inventory"];
    answer = `Based on Deepak's profile as a Lead SDET with ${resumeData.experience} of experience:

**Key Strengths**:
${resumeData.expertise.map((e) => `• ${e}`).join("\n")}

**Notable Achievements**:
${resumeData.achievements.slice(0, 4).map((a) => `• ${a}`).join("\n")}

For more specific information, try asking about his leadership experience, AI/ML testing expertise, automation frameworks, or fit for specific roles.`;
  }

  return { answer, confidence, sources };
};

const AIModal = ({ open, onOpenChange }: AIModalProps) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const handleAsk = async (q?: string) => {
    const queryText = q || question;
    if (!queryText.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const result = await analyzeQuestion(queryText);
      setResponse(result);
    } catch (error) {
      console.error("Failed to analyze question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (q: string) => {
    setQuestion(q);
    handleAsk(q);
  };

  const handleReset = () => {
    setQuestion("");
    setResponse(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after close animation
    setTimeout(() => {
      setQuestion("");
      setResponse(null);
    }, 300);
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-serif font-semibold text-primary">D</span>
            </div>
            <div>
              <DialogTitle className="font-serif text-lg">Ask AI About Deepak</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Ready to answer your questions</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!response ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Sparkle Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-center font-serif text-2xl mb-2">
                  What would <span className="text-primary italic">you like to know</span>?
                </h3>
                <p className="text-center text-muted-foreground text-sm mb-6">
                  Ask specific questions about Deepak's experience, skills, or fit for your role. Get honest, detailed answers.
                </p>

                {/* Sample Questions */}
                <div className="space-y-2 mb-6">
                  {sampleQuestions.map((sq, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuestionClick(sq.text)}
                      className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-primary/30"
                    >
                      <span className="text-sm">"{highlightText(sq.text, sq.highlight)}"</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Question Asked */}
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">You asked:</p>
                  <p className="text-sm font-medium">"{question}"</p>
                </div>

                {/* Confidence Score */}
                <div className="flex items-center gap-2 mb-4">
                  {response.confidence >= 90 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : response.confidence >= 70 ? (
                    <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                  <span className="text-sm">
                    <span className="font-medium">{response.confidence}%</span>
                    <span className="text-muted-foreground"> confidence</span>
                  </span>
                </div>

                {/* Answer */}
                <div className="prose prose-invert prose-sm max-w-none mb-6">
                  <div className="whitespace-pre-line text-foreground/90 leading-relaxed">
                    {response.answer.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-foreground font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>

                {/* Sources */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Based on:</p>
                  <div className="flex flex-wrap gap-2">
                    {response.sources.map((source, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ask Another */}
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  Ask another question
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-card/95 flex flex-col items-center justify-center"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing question...</p>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-secondary/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="min-h-[44px] max-h-[120px] resize-none bg-card border-border focus:border-primary"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!question.trim() || isLoading}
              className="shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIModal;
