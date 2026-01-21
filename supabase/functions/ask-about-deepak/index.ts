import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Deepak's comprehensive resume data for AI context
const resumeContext = `
You are an AI assistant for Deepak Dhami's professional resume website. You answer questions about Deepak's experience, skills, and fit for roles.

PROFILE:
- Name: Deepak Dhami
- Title: Lead Software Development Engineer In Test (Lead SDET)
- Experience: 13+ years in QA/SDET roles
- Location: India
- Currently: Open to Lead SDET & QA Architect roles

CURRENT ROLE - Cornerstone on Demand (03/2021 – Present):
- Lead Software Development Engineer In Test
- Pioneered AI-driven regression analysis with 95% accuracy, reducing testing cycle by 40%
- Created and maintained documentation for AI testing procedures
- Proficient in debugging script failures for API and Selenium testing in Java and C#
- Mentored junior QA engineers
- Integrated automated tests into CI/CD pipelines using Azure DevOps and TeamCity
- Non-functional testing (Performance, Security, Accessibility)

PREVIOUS EXPERIENCE:

Varian Medical (12/2017 – 03/2021) - Senior Test Analyst:
- Built Selenium-based automation frameworks in Java and C#
- Implemented JUnit and TestNG for structured test execution
- API testing using Postman and RestAssured
- Security testing with OWASP ZAP, identified 5 critical vulnerabilities including XSS
- Maintained 98% test coverage

JLT (12/2014 – 12/2017) - Automation Specialist:
- Developed Selenium framework using C#
- Achieved 98% test coverage for new releases
- Implemented automation in CI with TFS Build Definitions

Infogain (06/2011 – 12/2014) - Test Engineer:
- Manual and automated testing
- API testing and validation
- Built testing foundation

TECHNICAL SKILLS:
Programming: Python, JavaScript/TypeScript, Java, C#
Testing Tools: Selenium, Cypress, Playwright, Appium, Postman, RestAssured
CI/CD: Jenkins, GitHub Actions, Azure DevOps, TeamCity, GitLab CI
Cloud: AWS, GCP, Azure
Security: OWASP ZAP, Burp Suite
Performance: JMeter, Gatling, Locust
Accessibility: Axe, Wave

KEY ACHIEVEMENTS:
- 95% accuracy in AI-driven defect detection
- 40% reduction in testing cycle time
- Built end-to-end automation frameworks from scratch
- Led QA for ML platforms serving millions
- Identified critical security vulnerabilities
- 98% test coverage achievement
- Mentored multiple junior engineers

EXPERTISE AREAS:
- AI/ML Testing & Validation
- Test Automation Architecture
- CI/CD Integration
- Security Testing (OWASP)
- Performance Testing
- API Testing
- Leadership & Mentoring
- Cross-functional Collaboration

RESPONSE GUIDELINES:
1. Always highlight Deepak's strengths and how they match the question
2. Be enthusiastic but honest about his capabilities
3. Use specific achievements and metrics when relevant
4. For fit questions, explain WHY he's a great match
5. For technical questions, showcase his breadth of expertise
6. Keep responses concise but informative (2-4 paragraphs max)
7. Always end with a positive note about his value proposition
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    
    if (!question || typeof question !== "string") {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing question:", question);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("AI service not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: resumeContext },
          { role: "user", content: question },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";

    console.log("Generated response successfully");

    return new Response(
      JSON.stringify({ 
        answer,
        confidence: 95, // High confidence since we have full context
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ask-about-deepak function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to process question" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
