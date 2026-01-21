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
import { Sparkles, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AIResponse {
  answer: string;
  confidence: number;
}

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

const AIModal = ({ open, onOpenChange }: AIModalProps) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (q?: string) => {
    const queryText = q || question;
    if (!queryText.trim()) return;

    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask-about-deepak", {
        body: { question: queryText },
      });

      if (fnError) {
        console.error("Function error:", fnError);
        throw new Error(fnError.message || "Failed to get response");
      }

      if (data?.error) {
        // Handle specific error cases
        if (data.error.includes("Rate limit")) {
          toast({
            title: "Please wait",
            description: "Too many requests. Please try again in a moment.",
            variant: "destructive",
          });
        } else if (data.error.includes("credits")) {
          toast({
            title: "Service unavailable",
            description: "AI service temporarily unavailable. Please try again later.",
            variant: "destructive",
          });
        }
        throw new Error(data.error);
      }

      setResponse({
        answer: data.answer,
        confidence: data.confidence || 95,
      });
    } catch (err) {
      console.error("Failed to get AI response:", err);
      setError(err instanceof Error ? err.message : "Failed to get response");
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
    setError(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setQuestion("");
      setResponse(null);
      setError(null);
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

  const formatAnswer = (text: string) => {
    // Handle markdown-style bold
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
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
                <span className="text-xs text-muted-foreground">Powered by AI • Ready to answer</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 relative">
          <AnimatePresence mode="wait">
            {!response && !error ? (
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
                      disabled={isLoading}
                      className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-primary/30 disabled:opacity-50"
                    >
                      <span className="text-sm">"{highlightText(sq.text, sq.highlight)}"</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-center py-8"
              >
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400 mb-4">{error}</p>
                <Button onClick={handleReset} variant="outline">
                  Try again
                </Button>
              </motion.div>
            ) : response ? (
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
                    {formatAnswer(response.answer)}
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
            ) : null}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-card/95 flex flex-col items-center justify-center rounded-lg"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Thinking...</p>
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
              disabled={isLoading}
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
