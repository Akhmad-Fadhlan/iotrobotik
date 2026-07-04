import { motion } from 'framer-motion';

interface CinematicTextRevealProps {
  text: string;
}

export default function CinematicTextReveal({ text }: CinematicTextRevealProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 90,
      }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '0.25em',
        letterSpacing: '0.02em',
      }}
    >
      {words.map((word, wordIdx) => (
        <span 
          key={wordIdx} 
          style={{ 
            display: 'inline-flex', 
            whiteSpace: 'nowrap'
          }}
        >
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
