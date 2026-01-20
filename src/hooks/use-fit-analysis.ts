import { useState } from "react";

interface FitAnalysis {
  status: "Strong Fit" | "Potential Fit" | "Weak Fit";
  matches: Array<{
    title: string;
    description: string;
    evidence: string;
  }>;
  gaps: Array<{
    title: string;
    description: string;
  }>;
  recommendation: string;
}

const mockBackgroundData = `
EXPERIENCE:
- 12+ years in SDET/QA Engineering leadership roles
- Led QA teams at multiple tech companies (Series A-C stage)
- Built automated testing frameworks from scratch using Selenium, Cypress, Playwright
- Implemented CI/CD pipelines with comprehensive test automation
-Security (OWASP ZAP, Burp Suite, etc.), API testing (RestAssured), Performance testing (JMeter, Gatling), Accessibility testing (Axe, Wave), Load testing (Locust, JMeter)
- Mentored junior QA engineers and established testing best practices
- Led QA for AI/ML products, including testing model accuracy and bias
- Cross-functional collaboration with product, engineering, and design teams
- Experience with API testing, performance testing, and security testing


TECHNICAL SKILLS:
- Programming: Python, JavaScript/TypeScript, Java,C#
- Testing Tools: Selenium, Cypress, Playwright, Appium, Postman
- CI/CD: Jenkins, GitHub Actions, CircleCI, GitLab CI
- Cloud Platforms: AWS, GCP, Azure
- Databases: PostgreSQL, MongoDB, Redis
- Monitoring: DataDog, New Relic, Grafana
- Leadership: Team management, process optimization, stakeholder communication

PROJECTS:
- Built end-to-end test automation framework that reduced regression testing time by 75%
- Led QA for machine learning platform serving 10M+ users
- Implemented AI-powered test case generation reducing manual test creation by 60%
- Established QA processes that improved product quality metrics by 40%
`;

const analyzeJobFit = async (jobDescription: string): Promise<FitAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock analysis logic based on job description content
  const jd = jobDescription.toLowerCase();

  // Check for SDET/Lead QA keywords
  const isSDET = jd.includes('sdet') || jd.includes('lead') || jd.includes('qa') || jd.includes('quality');
  const hasAutomation = jd.includes('automation') || jd.includes('selenium') || jd.includes('cypress');
  const hasAI = jd.includes('ai') || jd.includes('ml') || jd.includes('machine learning');
  const hasLeadership = jd.includes('lead') || jd.includes('mentor') || jd.includes('team');
  const hasFintech = jd.includes('fintech') || jd.includes('financial') || jd.includes('series b');

  // Check for mobile-specific requirements
  const isMobileFocused = jd.includes('mobile') || jd.includes('ios') || jd.includes('android') || jd.includes('native');
  const hasPerformanceScale = jd.includes('performance') || jd.includes('scale') || jd.includes('million');

  // Analyze specific skill gaps from JD
  const identifyGaps = (jobDesc: string): FitAnalysis["gaps"] => {
    const gaps: FitAnalysis["gaps"] = [];

    // React/JavaScript framework experience
    if (jobDesc.includes('react') || jobDesc.includes('vue') || jobDesc.includes('angular')) {
      gaps.push({
        title: "Frontend Framework Experience",
        description: "Limited experience with modern frontend frameworks like React, Vue, or Angular"
      });
    }

    // DevOps/CI-CD specific tools
    if (jobDesc.includes('docker') || jobDesc.includes('kubernetes') || jobDesc.includes('terraform')) {
      gaps.push({
        title: "DevOps/Infrastructure Tools",
        description: "Limited hands-on experience with Docker, Kubernetes, or infrastructure automation"
      });
    }

    // Database-specific technologies
    if (jobDesc.includes('oracle') || jobDesc.includes('sql server') || jobDesc.includes('mysql')) {
      gaps.push({
        title: "Traditional RDBMS Experience",
        description: "More experience with modern databases (PostgreSQL, MongoDB) than traditional RDBMS"
      });
    }

    // Specific programming languages not in background
    if (jobDesc.includes('php') || jobDesc.includes('ruby') || jobDesc.includes('go') || jobDesc.includes('rust')) {
      gaps.push({
        title: "Additional Programming Languages",
        description: "Primary experience in Python, JavaScript/TypeScript, Java, C#"
      });
    }

    // Mobile development
    if (isMobileFocused) {
      gaps.push({
        title: "Native Mobile Development",
        description: "Limited experience with native iOS/Android development"
      });
    }

    // Game development/testing
    if (jobDesc.includes('game') || jobDesc.includes('gaming') || jobDesc.includes('unity') || jobDesc.includes('unreal')) {
      gaps.push({
        title: "Game Development/Testing",
        description: "No experience with game development or gaming industry testing"
      });
    }

    // Blockchain/Web3
    if (jobDesc.includes('blockchain') || jobDesc.includes('web3') || jobDesc.includes('crypto') || jobDesc.includes('ethereum')) {
      gaps.push({
        title: "Blockchain/Web3 Experience",
        description: "No experience with blockchain, cryptocurrency, or Web3 technologies"
      });
    }

    // Embedded systems/IoT
    if (jobDesc.includes('embedded') || jobDesc.includes('iot') || jobDesc.includes('firmware')) {
      gaps.push({
        title: "Embedded Systems/IoT",
        description: "Limited experience with embedded systems or IoT device testing"
      });
    }

    // Data Science/ML Engineering (beyond testing)
    if (jobDesc.includes('data science') || jobDesc.includes('ml engineer') || jobDesc.includes('data engineer')) {
      gaps.push({
        title: "Data Science/ML Engineering",
        description: "Experience is focused on testing AI/ML systems rather than building them"
      });
    }

    // System administration/DevOps
    if (jobDesc.includes('system admin') || jobDesc.includes('sysadmin') || jobDesc.includes('linux') || jobDesc.includes('bash')) {
      gaps.push({
        title: "System Administration",
        description: "Limited experience with Linux system administration and bash scripting"
      });
    }

    // UI/UX testing
    if (jobDesc.includes('ui') || jobDesc.includes('ux') || jobDesc.includes('design') || jobDesc.includes('user experience')) {
      gaps.push({
        title: "UI/UX Testing Focus",
        description: "More focused on backend/API testing than UI/UX and user experience testing"
      });
    }

    // Compliance/Security certifications
    if (jobDesc.includes('cissp') || jobDesc.includes('ceh') || jobDesc.includes('security+') || jobDesc.includes('compliance')) {
      gaps.push({
        title: "Security Certifications",
        description: "No formal security certifications, though practical security testing experience exists"
      });
    }

    // Project management
    if (jobDesc.includes('scrum master') || jobDesc.includes('project manager') || jobDesc.includes('agile coach')) {
      gaps.push({
        title: "Project Management",
        description: "Leadership experience is in QA teams rather than full project management roles"
      });
    }

    return gaps.slice(0, 3); // Limit to max 3 gaps
  };

  let status: FitAnalysis["status"];
  let matches: FitAnalysis["matches"] = [];
  let gaps: FitAnalysis["gaps"] = [];
  let recommendation: string;

  if ((isSDET || hasLeadership) && (hasAutomation || hasAI)) {
    // Strong fit for SDET Lead in Fintech
    status = "Strong Fit";
    matches = [
      {
        title: "Test Automation Leadership",
        description: "Deep expertise in building automated testing frameworks",
        evidence: "Built end-to-end test automation framework that reduced regression testing time by 75%"
      },
      {
        title: "AI/ML Testing Experience",
        description: "Proven track record testing AI/ML products at scale",
        evidence: "Led QA for machine learning platform serving 10M+ users, including testing model accuracy and bias"
      },
      {
        title: "Team Leadership & Mentoring",
        description: "Experience leading QA teams and mentoring junior engineers",
        evidence: "Led QA teams at multiple tech companies (Series A-C stage) and mentored junior QA engineers"
      },
      {
        title: "Security Testing Expertise",
        description: "Comprehensive security testing knowledge and tools",
        evidence: "Security testing experience with OWASP ZAP, Burp Suite, and other security testing tools"
      },
      {
        title: "API & Performance Testing",
        description: "Extensive experience with API and performance testing",
        evidence: "API testing (RestAssured), Performance testing (JMeter, Gatling), Load testing (Locust, JMeter)"
      },
      {
        title: "CI/CD Pipeline Integration",
        description: "Expertise in implementing comprehensive CI/CD testing pipelines",
        evidence: "Implemented CI/CD pipelines with comprehensive test automation using Jenkins, GitHub Actions, CircleCI, GitLab CI"
      },
      {
        title: "Cloud Platform Experience",
        description: "Multi-cloud testing and deployment experience",
        evidence: "Experience with AWS, GCP, Azure cloud platforms for testing and deployment"
      }
    ];
    gaps = identifyGaps(jd);
    recommendation = `This is an excellent match for your background. Your 12+ years of experience leading QA teams in similar-stage companies, combined with your comprehensive testing expertise across automation, AI/ML, security, and performance testing, makes you a strong candidate for this role.${gaps.length > 0 ? ' Consider addressing any identified gaps through targeted learning or highlighting transferable skills.' : ''}`;
  } else if (isMobileFocused && hasPerformanceScale) {
    // Weak fit for mobile consumer app
    status = "Weak Fit";
    matches = [
      {
        title: "QA Process & Best Practices",
        description: "Established QA processes and improved product quality",
        evidence: "Established QA processes that improved product quality metrics by 40%"
      }
    ];
    gaps = identifyGaps(jd);
    // Ensure mobile-specific gaps are included
    if (!gaps.some(gap => gap.title.includes('Mobile'))) {
      gaps.unshift({
        title: "Native Mobile Development",
        description: "Limited experience with native iOS/Android development and testing"
      });
    }
    gaps = gaps.slice(0, 3); // Limit to 3 gaps
    recommendation = "This role requires deep mobile testing expertise that doesn't align well with your current background. Consider roles that leverage your web automation and leadership experience instead.";
  } else {
    // Potential fit for general QA roles
    status = "Potential Fit";
    matches = [
      {
        title: "Test Automation Frameworks",
        description: "Strong experience building automated testing solutions",
        evidence: "Built automated testing frameworks using Selenium, Cypress, Playwright"
      },
      {
        title: "CI/CD Pipeline Integration",
        description: "Experience implementing comprehensive CI/CD testing",
        evidence: "Implemented CI/CD pipelines with comprehensive test automation using Jenkins, GitHub Actions"
      }
    ];
    gaps = identifyGaps(jd);
    // Add some general gaps if none found
    if (gaps.length === 0) {
      gaps = [{
        title: "Industry-Specific Experience",
        description: "May lack deep experience in this specific industry or domain"
      }];
    }
    gaps = gaps.slice(0, 2); // Limit to 2 gaps for potential fit
    recommendation = "There's potential here based on your technical skills, but you may need to highlight transferable experience. Consider reaching out to discuss how your QA leadership experience could apply to this role.";
  }

  return {
    status,
    matches,
    gaps,
    recommendation
  };
};

export const useFitAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FitAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeFit = async (jobDescription: string) => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeJobFit(jobDescription);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze job fit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    isLoading,
    analysis,
    error,
    analyzeFit,
    clearAnalysis
  };
};