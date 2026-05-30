import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, ChevronDown, Download, Mail, Sparkles,
  Brain, Cpu, Bot, User, Code2, Rocket, Target,
  Palette, Server, Database, Wrench, ExternalLink, Github,
  Folder, CheckCircle2, Award, Trophy, GraduationCap, Calendar,
  Phone, Linkedin, Globe, Send, CheckCircle, ArrowUp, Heart, Menu, X
} from 'lucide-react';

// ==================== HOOKS ====================

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress((scrollPosition / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

const useTypingEffect = (texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
};

const useCountUp = (end: number, start = 0, duration = 2000, shouldStart = true) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, start, duration, shouldStart]);

  return count;
};

// ==================== UI COMPONENTS ====================

const ScrollProgress = () => {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-dark-800/50">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:border-primary-500/50 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? <Moon className="w-5 h-5 text-primary-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
    </motion.button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a href="#" className="text-2xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
            SK
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <DarkModeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-primary-400 py-2"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-950"
  >
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-2xl font-bold gradient-text">SK</span>
      </motion.div>
    </div>
  </motion.div>
);

const Section = ({ children, id, className = '' }: { children: React.ReactNode; id: string; className?: string }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12 md:mb-16"
  >
    <h2 className="section-title gradient-text">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </motion.div>
);

// ==================== SECTIONS ====================

const HeroSection = () => {
  const displayText = useTypingEffect([
    'Generative AI Developer',
    'AI/ML Engineer — LangChain & RAG',
    'RAG Pipeline Architect',
    'LLM Application Developer',
  ]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Floating Elements */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-[10%] text-primary-500/30">
        <Brain className="w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-[15%] text-accent-500/30">
        <Cpu className="w-10 h-10 md:w-14 md:h-14" />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-40 left-[20%] text-primary-500/30">
        <Bot className="w-8 h-8 md:w-12 md:h-12" />
      </motion.div>
      <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute top-1/3 right-[8%] text-accent-500/30">
        <Sparkles className="w-10 h-10 md:w-14 md:h-14" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white">
          Sonu Kumar
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-3xl font-semibold mb-6 h-12">
          <span className="gradient-text">{displayText}</span>
          <span className="animate-pulse text-primary-400">|</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Building Intelligent AI Systems with LLMs, RAG Pipelines, and Multi-Agent Architectures.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a href="#projects" className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View Projects
          </motion.a>
          <motion.a href="https://drive.google.com/file/d/12iGRWgnhpIDVQGOAGGhnv8E_OVYJ4dKy/view?usp=sharing" download className="btn-secondary flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </motion.a>
          <motion.a href="#contact" className="btn-secondary flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center text-gray-500">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const highlights = [
                      { icon: Code2, title: '3 Live AI Systems', description: 'Built & deployed a 5-agent LLM pipeline, RAG chatbot with sub-300ms retrieval, and an XGBoost churn predictor — all live in production' },
                      { icon: Rocket, title: '200+ DSA Problems', description: 'Solved 200+ LeetCode problems & ranked Top 3 academically — strong foundations behind every AI system I build' },
                      { icon: Target, title: 'MLOps-Ready', description: 'End-to-end ML pipelines with MLflow experiment tracking, Docker containerisation, CI/CD, and Render deployment' },
                      ];
  return (
    <Section id="about">
      <SectionHeader title="About Me" subtitle="Passionate AI Engineer building the future of intelligent systems" />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Who I Am</h3>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            I'm a final-year CS student who has{' '}
            <span className="text-primary-400 font-medium">designed, built, and shipped 3 production-grade AI systems</span>{' '}
            — a multi-agent research pipeline, a RAG chatbot, and an ML churn predictor — all{' '}
            <span className="text-accent-400 font-medium">live and deployed on Render using Docker</span>.
            I specialize in turning GenAI ideas into working products.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            My stack centers on{' '}
            <span className="text-white font-medium">Python, LangChain, FastAPI, and Docker</span>{' '}
            for backend AI systems,{' '}
            <span className="text-white font-medium">Pinecone & FAISS</span> for vector search, and{' '}
            <span className="text-white font-medium">React.js</span> for interfaces. I track experiments with{' '}
            <span className="text-primary-400 font-medium">MLflow</span> and have solved{' '}
            <span className="text-accent-400 font-medium">200+ DSA problems</span> on LeetCode.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            I'm drawn to problems where AI has immediate business impact. Graduating{' '}
            <span className="text-accent-400 font-medium">July 2026</span> — available immediately for{' '}
            <span className="text-primary-400 font-medium">full-time or remote AI/ML roles</span>.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid gap-6">
          {highlights.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card group">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mr-4">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

const SkillsSection = () => {
  const skillCategories = [
  { 
    category: 'Programming', 
    skills: ['Python', 'SQL', 'C++'], 
    icon: Code2 
  },
  { 
    category: 'AI & GenAI', 
    skills: ['LLMs', 'RAG', 'LangChain','LangGraph', 'Prompt Engineering', 'NLP', 'OpenAI API', 'Mistral AI', 'Multi-Agent Systems', 'Semantic Search', 'Vector Embeddings'], 
    icon: Brain 
  },
  { 
    category: 'Deep Learning', 
    skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost', 'ANN / CNN', 'RNN / LSTM', 'Transformers', 'Hugging Face'], 
    icon: Cpu   // or Zap — import whichever fits
  },
  { 
    category: 'Backend', 
    skills: ['FastAPI', 'REST APIs', 'Uvicorn'], 
    icon: Server 
  },
  { 
    category: 'Frontend', 
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Streamlit'], 
    icon: Palette 
  },
  { 
    category: 'Databases', 
    skills: ['MongoDB', 'PostgreSQL', 'Pinecone', 'FAISS'], 
    icon: Database 
  },
  { 
    category: 'MLOps & Tools', 
    skills: ['Docker', 'MLflow', 'Git', 'GitHub', 'CI/CD', 'Render', 'Vercel'], 
    icon: Wrench 
  },
];

  return (
    <Section id="skills" className="bg-dark-900/30">
      <SectionHeader title="Skills" subtitle="Technologies and tools I work with to build innovative AI solutions" />

      <div className="space-y-12">
        {skillCategories.map((category, catIndex) => (
          <motion.div key={category.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.1 }}>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-3">
                <category.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              <div className="flex-1 ml-4 h-px bg-gradient-to-r from-dark-700 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.03 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl px-4 py-3 hover:border-primary-500/50 transition-all text-center cursor-default"
                >
                  <span className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const ProjectsSection = () => {
  const projects = [
  {
    id: 1,
    title: 'ResearchMind: Multi-Agent AI Research System',
    description: 'Architected a 5-agent LLM pipeline (Search, Extractor, Reader, Writer, Critic) using LangChain & Mistral AI — autonomously researches 10+ live web sources per query and generates structured reports. Deployed on Render via Docker.',
    features: [
      '5-agent pipeline with defined roles',
      'LLM-as-a-judge scoring 1–10 on coherence',
      'Scrapes 10+ live sources per query',
      'Iterative refinement reduces hallucination risk',
    ],
    technologies: ['Python', 'LangChain', 'Mistral AI', 'Tavily API', 'Streamlit', 'Docker'],
    github: 'https://github.com/Sonu0701/multi-agent-ai-research-system',
    demo: 'https://multi-agent-ai-research-system-zr25.onrender.com',
  },
  {
    id: 2,
    title: 'Dynamic RAG Chatbot',
    description: 'Production-grade RAG system for PDF querying with sub-300ms semantic retrieval and multi-turn chat memory. Dynamic Pinecone indexing with auto stale-embedding removal ensures 100% index freshness on every upload.',
    features: [
      'Sub-300ms semantic retrieval latency',
      'Auto stale-embedding removal on upload',
      'Real-time source citation tracking',
      'React.js frontend with dark mode UI',
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Mistral AI', 'React', 'Docker'],
    github: 'https://github.com/Sonu0701/dynamic-rag-chatbot',
    demo: 'https://dynamic-rag-chatbot.vercel.app/',
  },
  {
    id: 3,
    title: 'Telco Customer Churn Prediction',
    description: 'End-to-end ML pipeline — preprocessing, feature engineering, training, and API serving — with MLflow tracking across 10+ experiment runs. XGBoost classifier achieving ROC-AUC 0.83 & Recall 0.83. Deployed via Docker on Render.',
    features: [
      'XGBoost — ROC-AUC 0.83, Recall 0.83',
      'MLflow tracking across 10+ experiment runs',
      'Modular data → feature → model → serving layers',
      'Real-time scoring via Streamlit dashboard',
    ],
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'MLflow', 'FastAPI', 'Streamlit', 'Docker'],
    github: 'https://github.com/Sonu0701/Telco-Customer-Churn-Prediction-System',
    demo: 'https://telco-customer-churn-prediction-system.onrender.com',
  },
 ];

  return (
    <Section id="projects">
      <SectionHeader title="Featured Projects" subtitle="Production-grade AI applications I've designed and developed" />

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="card group flex flex-col h-full"
          >
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <Folder className="w-16 h-16 text-gray-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
              </div>
            </div>

            <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium bg-dark-800 text-primary-400 rounded-full border border-dark-600">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* FIXED SECTION BELOW */}
            <div className="flex gap-3 mt-auto">
              <motion.a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 btn-secondary text-sm py-2.5 flex items-center justify-center" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </motion.a>
              
              <motion.a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 btn-primary text-sm py-2.5 flex items-center justify-center" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </motion.a>
            </div>
            {/* FIXED SECTION ABOVE */}

          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const AchievementsSection = () => {
  const achievements = [
    { title: 'Top 3 Academic Rank',    value: 3,   suffix: 'rd', icon: Trophy },
    { title: 'DSA Problems Solved',    value: 200, suffix: '+',  icon: Code2  },
    { title: 'Production AI Projects', value: 3,   suffix: '+',  icon: Rocket },
    { title: 'LeetCode Streak (Days)', value: 365, suffix: '+',  icon: Award  },
  ];

  return (
    <Section id="achievements" className="bg-dark-900/30">
      <SectionHeader title="Achievements" subtitle="Milestones and accomplishments in my journey" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => {
          const [isVisible, setIsVisible] = useState(false);
          const count = useCountUp(achievement.value, 0, 2000, isVisible);
          const Icon = achievement.icon; // ✅ cleaner

          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onViewportEnter={() => setIsVisible(true)}
              className="card text-center group hover:border-primary-500/50"
            >
              <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary-400" />
              </motion.div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {count}{achievement.suffix}
              </div>
              <h3 className="text-gray-300 font-medium">{achievement.title}</h3>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

const EducationSection = () => {
  return (
    <Section id="education">
      <SectionHeader title="Education" subtitle="My academic background and qualifications" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
        <div className="card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

          <div className="flex items-start gap-4">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </motion.div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Bachelor of Technology in Computer Science
              </h3>
              <p className="text-primary-400 font-medium mb-2">
                Shivalik College of Engineering, Dehradun
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-accent-500" />
                  CGPA: 7.6 / 10.0
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5 text-accent-500" />
                  2022 – July 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('https://formspree.io/f/xqejjrok', // ← paste ID here
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    setIsSubmitting(false);
    alert('Failed to send. Please email me directly at sonuk15102002@gmail.com');
  }
};

  const contactInfo = [
    { icon: Mail,     label: 'Email',    value: 'sonuk15102002@gmail.com',      href: 'mailto:sonuk15102002@gmail.com' },
    { icon: Phone,    label: 'Phone',    value: '+91-9155149634',               href: 'tel:+91-9155149634' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/sonu-kumar-ai', href: 'https://linkedin.com/in/sonu-kumar-ai' },
    { icon: Github,   label: 'GitHub',   value: 'github.com/Sonu0701',          href: 'https://github.com/Sonu0701' },
    { icon: Code2,    label: 'LeetCode', value: 'leetcode.com/u/sonu\_kumar\_123',  href: 'https://leetcode.com/u/sonu_kumar_123/' },
  ];

  return (
    <Section id="contact" className="bg-dark-900/30">
      <SectionHeader title="Get In Touch" subtitle="Have a project in mind? Let's discuss how we can work together" />

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
          <p className="text-gray-400 mb-8">
            I'm actively looking for full-time or remote AI/ML roles and open to freelance AI projects. Graduating July 2026 — available immediately.
          </p>

          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 rounded-xl glass hover:border-primary-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mr-4">
                  <item.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

            {isSubmitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-16 h-16 text-accent-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400 text-center">Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark-900/50 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <motion.a href="#" className="text-2xl font-bold gradient-text inline-block mb-2" whileHover={{ scale: 1.05 }}>
              Sonu Kumar
            </motion.a>
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
              Designed and Developed with{' '}
              <Heart className="w-4 h-4 mx-1 text-accent-500 fill-accent-500" /> using React & Tailwind
            </p>
          </div>

          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sonu Kumar. All rights reserved.
          </div>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:border-primary-500/50 transition-all group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm text-gray-300 group-hover:text-primary-400 transition-colors">Back to Top</span>
            <ArrowUp className="w-4 h-4 text-primary-400" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN APP ====================

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <AchievementsSection />
            <EducationSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
