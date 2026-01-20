import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 px-6 border-t border-border"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-xl font-semibold">DD</span>
        <p className="text-sm text-muted-foreground">
          12+ years of quality engineering. Ask me anything.
        </p>
        <div className="flex items-center gap-6">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:ddhami1990@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
