"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Terminal, Github, Mail, Cpu, Database, Brain, Server, Activity, Linkedin, Twitter, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalText, setTerminalText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const terminalCommands = [
    "whoami",
    "Roman Afonin",
    "cat /skills/ml-engineering",
    "TensorFlow | PyTorch | MLOps | Kubernetes",
    "cat /skills/ai-engineering", 
    "LLMs | Computer Vision | NLP | AutoML",
    "cat /skills/data-engineering",
    "Apache Spark | Airflow | Snowflake | dbt",
    "cat /skills/devops",
    "Docker | Terraform | AWS | CI/CD",
    "ls -la /projects/",
    "Loading projects..."
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth typewriter terminal animation
  useEffect(() => {
    if (lineIndex >= terminalCommands.length) return;
    const current = terminalCommands[lineIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setTerminalText((prev) => prev + current[charIndex]);
        setCharIndex((c) => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTerminalText((prev) => prev + "\n");
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, terminalCommands]);

  const skills = [
    {
      name: "ML Engineering",
      icon: Brain,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      items: [
        "Model training (PyTorch, TensorFlow)",
        "Experiment tracking (WandB)",
        "Feature engineering",
        "Model validation and monitoring",
      ],
    },
    {
      name: "AI Engineering",
      icon: Cpu,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      items: [
        "LLM apps (RAG, adapters)",
        "NLP and embeddings",
        "Computer vision",
        "API integration and evals",
      ],
    },
    {
      name: "Data Engineering",
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      items: [
        "ETL/ELT (Spark, dbt)",
        "Workflow orchestration (Airflow)",
        "Data lakes and warehouses",
        "Streaming (Kafka)",
      ],
    },
    {
      name: "DevOps",
      icon: Server,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      items: [
        "Containers (Docker)",
        "IaC (Terraform)",
        "Kubernetes and autoscaling",
        "CI/CD (GitHub Actions)",
      ],
    },
  ];

  const projects = [
    {
      title: "MLOps Pipeline",
      description: "End-to-end ML pipeline with Kubeflow, monitoring, and auto-scaling",
      tech: ["Kubernetes", "Kubeflow", "Prometheus", "Grafana"],
      color: "border-purple-500/50"
    },
    {
      title: "AI Model Serving",
      description: "Real-time inference engine with load balancing and A/B testing",
      tech: ["TensorRT", "FastAPI", "Redis", "Docker"],
      color: "border-cyan-500/50"
    },
    {
      title: "Data Lake Architecture",
      description: "Multi-zone data lake with streaming and batch processing",
      tech: ["Apache Spark", "Kafka", "Delta Lake", "Airflow"],
      color: "border-emerald-500/50"
    },
    {
      title: "Infrastructure as Code",
      description: "Multi-cloud deployment with Terraform and GitOps",
      tech: ["Terraform", "AWS", "GitHub Actions", "ArgoCD"],
      color: "border-orange-500/50"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5" />
      
      <header className="relative z-10 p-4 border-b border-green-500/30">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-400"
          >
            <Terminal className="h-6 w-6 animate-pulse" />
            <span className="font-mono text-sm">root@cyberpunk:~#</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm text-cyan-400"
          >
            <span suppressHydrationWarning>
              {isMounted ? currentTime.toLocaleTimeString() : ""}
            </span>
          </motion.div>
        </div>
      </header>

      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center transform-gpu"
        >
          {/* Profile photo */}
          <div className="mx-auto mb-6 h-40 w-40 rounded-full border border-green-500/60 p-1 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-black/50">
              {imageError ? (
                <div className="flex h-full w-full items-center justify-center text-green-400">
                  <User className="h-16 w-16" />
                </div>
              ) : (
                <Image
                  src="/profile.jpg"
                  alt="Roman Afonin"
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
            animate={{ 
              textShadow: [
                "0 0 10px #00ff00",
                "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                "0 0 10px #00ff00"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-green-400">ROMAN</span>
            <span className="text-cyan-400">-</span>
            <span className="text-purple-400">AFONIN</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            <span className="text-green-400">ML Engineer</span>
            <span className="text-gray-400"> / </span>
            <span className="text-cyan-400">AI Engineer</span>
            <span className="text-gray-400"> / </span>
            <span className="text-purple-400">Data Engineer</span>
            <span className="text-gray-400"> / </span>
            <span className="text-orange-400">DevOps Engineer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto"
          >
            Building intelligent systems that scale. Specializing in MLOps, AI infrastructure, 
            data pipelines, and cloud-native architectures. Let's hack the future together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="bg-black border border-green-500/50 rounded-lg p-6 mb-10 text-left max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-green-400 font-mono text-sm">terminal</span>
            </div>
            <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
              {terminalText}
              <span className="animate-pulse">?</span>
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
              <a href="/blog">Blog</a>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 border-green-500">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20">
              <a href="mailto:roman@example.com"><Mail className="mr-2 h-4 w-4" />Contact</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-purple-400 hover:bg-purple-400/20">
              <a href="https://github.com/AfoD3V" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-sky-400 hover:bg-sky-500/20">
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-cyan-400 hover:bg-cyan-500/20">
              <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
            <span className="text-cyan-400">$</span> skills
          </h2>
          <p className="text-gray-400 text-lg">Core competencies in modern tech stack</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-black/50 border border-green-500/30 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setOpenSkill(openSkill === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${skill.bg} flex items-center justify-center`}>
                          <skill.icon className={`h-6 w-6 ${skill.color}`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${skill.color}`}>{skill.name}</h3>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${openSkill === index ? "rotate-180" : "rotate-0"}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openSkill === index && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 space-y-2 overflow-hidden"
                      >
                        {skill.items.map((item) => (
                          <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
            <span className="text-cyan-400">$</span> ls -la /projects/
          </h2>
          <p className="text-gray-400 text-lg">Latest cyberpunk projects and experiments</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className={`bg-black/50 border ${project.color} hover:border-green-500/60 transition-all duration-300 backdrop-blur-sm`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="text-2xl font-bold text-green-400">{project.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-3 py-1 text-xs font-mono bg-green-500/20 text-green-300 border border-green-500/30 rounded"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-green-500/30 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-mono">System Status: ONLINE</span>
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
          </motion.div>
          <p className="text-gray-400 text-sm">
            (c) 2024 Roman Afonin. Built with Next.js, TypeScript, and cyberpunk vibes.
          </p>
        </div>
      </footer>
    </main>
  );
}
