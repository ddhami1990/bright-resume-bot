import { motion } from "framer-motion";
import { CheckCircle, Circle, AlertTriangle, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface FitAnalysisResultsProps {
  analysis: FitAnalysis;
  onClear: () => void;
}

const FitAnalysisResults = ({ analysis, onClear }: FitAnalysisResultsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Strong Fit":
        return "text-green-400 border-green-400/30 bg-green-400/10";
      case "Potential Fit":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "Weak Fit":
        return "text-red-400 border-red-400/30 bg-red-400/10";
      default:
        return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Strong Fit":
        return <ThumbsUp className="w-5 h-5" />;
      case "Potential Fit":
        return <Minus className="w-5 h-5" />;
      case "Weak Fit":
        return <ThumbsDown className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 mt-8"
    >
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-lg border border-[#333] bg-[#1A1A1A] p-6 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {getStatusIcon(analysis.status)}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Fit Assessment Results</h3>
              <p className="text-gray-400 text-sm">Based on your background and the job requirements</p>
            </div>
          </div>
          <div className={`px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium self-start sm:self-auto ${getStatusColor(analysis.status)}`}>
            {analysis.status}
          </div>
        </div>
      </motion.div>

      {/* Where I Match Section */}
      {analysis.matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-4"
        >
          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#4FD1C5]" />
            WHERE I MATCH
          </h4>
          <div className="space-y-3">
            {analysis.matches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#4FD1C5] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-white mb-1">{match.title}</h5>
                    <p className="text-gray-300 text-sm mb-2">{match.description}</p>
                    <div className="bg-[#4FD1C5]/10 border border-[#4FD1C5]/20 rounded-md p-3">
                      <p className="text-[#4FD1C5] text-sm italic">"{match.evidence}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gaps to Note Section */}
      {analysis.gaps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="space-y-4"
        >
          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-400" />
            GAPS TO NOTE
          </h4>
          <div className="space-y-3">
            {analysis.gaps.map((gap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-white mb-1">{gap.title}</h5>
                    <p className="text-gray-300 text-sm mb-2">{gap.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* My Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="rounded-lg border border-[#333] bg-[#1A1A1A] p-6 shadow-lg"
      >
        <h4 className="text-lg font-semibold text-white mb-3">MY RECOMMENDATION</h4>
        <p className="text-gray-300 leading-relaxed">{analysis.recommendation}</p>
      </motion.div>

      {/* Clear Results Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="flex justify-center pt-4"
      >
        <Button
          onClick={onClear}
          variant="outline"
          className="border-[#333] bg-[#1A1A1A] text-gray-300 hover:bg-[#333] hover:text-white"
        >
          Clear Results
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FitAnalysisResults;