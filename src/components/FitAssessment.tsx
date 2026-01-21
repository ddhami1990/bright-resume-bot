import { motion } from "framer-motion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, MessageSquare } from "lucide-react";
import { useFitAnalysis } from "@/hooks/use-fit-analysis";
import FitAnalysisResults from "@/components/FitAnalysisResults";
import AIModal from "@/components/AIModal";

const FitAssessment = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const { isLoading, analysis, error, analyzeFit, clearAnalysis } = useFitAnalysis();

  return (
    <>
      <AIModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
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
            onClick={() => analyzeFit(jobDescription)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Fit...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Fit
              </>
            )}
          </Button>

          {/* Ask AI Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2 border-primary/30 hover:bg-primary/10"
            onClick={() => setAiModalOpen(true)}
          >
            <MessageSquare className="w-5 h-5" />
            Ask AI About Deepak
          </Button>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground italic">
            This signals something completely different than "please consider my resume."
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3"
            >
              {error}
            </motion.div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <FitAnalysisResults
              analysis={analysis}
              onClear={clearAnalysis}
            />
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default FitAssessment;
