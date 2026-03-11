
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowID } from '../types';
import { PROJECTS, CERTIFICATES } from '../constants';
import { 
  ExternalLink, 
  BookOpen, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ZoomIn, 
  Github, 
  Linkedin,
  Monitor, 
  Cpu, 
  Code2, 
  BarChart3,
  Mail,
  Smartphone,
  Calendar,
  MapPin
} from 'lucide-react';

interface WindowContentProps {
  id: WindowID;
}

const WindowContent: React.FC<WindowContentProps> = ({ id }) => {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const nextCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((selectedCertIndex + 1) % CERTIFICATES.length);
  };

  const prevCert = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((selectedCertIndex - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  };

  switch (id) {
    case 'aboutMe':
      return (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start max-w-6xl mx-auto pb-10">
          {/* LEFT SIDEBAR: PROFILE CARD */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="relative rounded-[32px] border border-accent/20 dark:border-accent/30 bg-white/60 dark:bg-black/40 backdrop-blur-3xl p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl opacity-40" />
                <img 
                  src="https://picsum.photos/seed/madhan/300/300" 
                  alt="Madhan G" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/20 dark:border-white/5 relative z-10 shadow-lg"
                />
              </div>

              {/* Identity Section */}
              <h3 className="text-xl font-bold text-main tracking-tight mb-4">Madhan G</h3>
              
              <div className="w-full space-y-2 mb-6">
                <div className="py-1.5 px-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-bold text-secondary">
                  MSc-Decision and Computing Science
                </div>
                <div className="inline-block py-1 px-4 rounded-lg bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-widest">
                  Student
                </div>
              </div>

              <div className="w-full h-[1px] bg-main/5 mb-6" />

              {/* Contact Information */}
              <div className="w-full space-y-5 text-left">
                {[
                  { icon: Mail, label: "EMAIL", value: "Madhangopi305@gmail.com" },
                  { icon: Smartphone, label: "PHONE", value: "+91 9301223175" },
                  { icon: Calendar, label: "DOB", value: "Nov 23, 2005" },
                  { icon: MapPin, label: "LOCATION", value: "Namakkal, Tamilnadu" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-center group">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-black text-secondary/60 dark:text-white/30 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-[12px] font-bold text-main/90 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex gap-5 mt-8 opacity-40 hover:opacity-100 transition-opacity">
                <a href="#" className="text-main hover:text-accent transition-colors"><Github size={18} /></a>
                <a href="#" className="text-main hover:text-accent transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <main className="flex-1 space-y-12">
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-main tracking-tight">About Me</h2>
                <div className="w-10 h-1.5 bg-accent rounded-full" />
              </div>
              
              <p className="text-[17px] text-secondary dark:text-slate-400 leading-relaxed font-medium">
                I am a dedicated Master's student in Decision and Computing Sciences with a strong passion for full-stack 
                development and machine learning. My expertise spans data analytics, predictive modeling, and modern web 
                application development, with proficiency in Python, SQL, and widely used front-end and back-end frameworks. I 
                am eager to apply my knowledge and gain practical experience by securing an internship opportunity where I 
                can contribute to innovative, data-driven projects while learning from experienced professionals.
              </p>
            </section>

            <section className="space-y-8">
              <h3 className="text-2xl font-black text-main tracking-tight">What I'm Doing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    icon: "https://api.dicebear.com/7.x/shapes/svg?seed=web&backgroundColor=0284c7&shape1Color=0ea5e9",
                    title: "Web Development",
                    desc: "Crafting efficient and elegant code solutions to build scalable, user-friendly, and visually appealing web applications."
                  },
                  {
                    icon: "https://api.dicebear.com/7.x/shapes/svg?seed=ml&backgroundColor=8b5cf6&shape1Color=a78bfa",
                    title: "Machine Learning",
                    desc: "Building robust and efficient artificial intelligence models using neural networks to solve complex problems and make accurate predictions."
                  },
                  {
                    icon: "https://api.dicebear.com/7.x/shapes/svg?seed=prog&backgroundColor=10b981&shape1Color=34d399",
                    title: "Programming",
                    desc: "Crafting efficient and elegant code solutions across various programming languages and platforms."
                  },
                  {
                    icon: "https://api.dicebear.com/7.x/shapes/svg?seed=data&backgroundColor=f59e0b&shape1Color=fbbf24",
                    title: "Data Analysis",
                    desc: "Data Science / Analysis involves extracting insights and knowledge from data to inform business decisions."
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 flex gap-5 items-start hover:bg-black/[0.06] dark:hover:bg-white/10 hover:border-accent/30 transition-all shadow-sm hover:shadow-xl"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shadow-inner">
                      <img src={item.icon} alt={item.title} className="w-8 h-8 opacity-90" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-black text-main">{item.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      );

    case 'resume':
      return (
        <div className="max-w-3xl mx-auto space-y-12 pb-20">
          <section>
            <h2 className="text-4xl font-black text-main mb-3">Resume</h2>
            <div className="w-14 h-1.5 bg-accent rounded-full mb-12" />
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl shadow-lg">
                <BookOpen className="text-accent" size={24} />
              </div>
              <h3 className="text-2xl font-black text-main">Education</h3>
            </div>

            <div className="relative ml-4 space-y-12">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-main/10" />

              {[
                {
                  school: "Sri Vidya Mandir Matric Hr Sec School Namakkal",
                  period: "2020 — 2021",
                  standard: "10th Standard"
                },
                {
                  school: "Sri Vidya Mandir Matric Hr Sec School Namakkal",
                  period: "2022 — 2023",
                  standard: "12th Standard"
                },
                {
                  school: "Coimbatore Institute Of Technology",
                  period: "2023 — 2028",
                  standard: "MSc-Decision and computing science"
                }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white dark:border-[#020617] z-10 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-main leading-snug">{item.school}</h4>
                    <p className="text-sm font-black text-accent">{item.period}</p>
                    <p className="text-[15px] text-secondary font-bold">{item.standard}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-4">
            <h3 className="text-2xl font-black text-main mb-8">My Skills</h3>
            <div className="bg-black/[0.03] dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 gap-y-6">
                {[
                  { label: "Programming Languages:", value: "C, Python, Java, SQL, JavaScript, HTML" },
                  { label: "Core:", value: "Data Structures and Algorithms, OOP, DBMS" },
                  { label: "Front-End Tools:", value: "HTML5, CSS, JavaScript, React, Angular" },
                  { label: "Databases:", value: "MySQL, Oracle DB" },
                  { label: "System Skills:", value: "Linux (Debian)" },
                  { label: "Developer Tools:", value: "GitHub" },
                  { label: "Technologies:", value: "Web Development, Machine Learning" }
                ].map((skill, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
                    <span className="text-[15px] font-black text-main opacity-90">{skill.label}</span>
                    <span className="text-[15px] text-secondary font-medium leading-relaxed">{skill.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <button className="px-10 py-4 bg-accent hover:opacity-90 text-white dark:text-black font-black rounded-xl shadow-[0_10px_30px_rgba(14,165,233,0.3)] transition-all hover:scale-105 active:scale-95">
              Download Full CV
            </button>
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <div key={i} className="group overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/5 hover:border-accent/30 transition-all duration-500 shadow-xl">
              <div className="aspect-[16/10] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-6">
                   <div className="flex gap-2">
                     {project.tags.map((tag, idx) => (
                       <span key={idx} className="text-[9px] font-black px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-white">{tag}</span>
                     ))}
                   </div>
                </div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-7 space-y-4">
                <h4 className="text-2xl font-black text-main">{project.title}</h4>
                <p className="text-secondary text-sm leading-relaxed font-medium">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-secondary border border-black/5 dark:border-white/5">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <a href={project.link || "#"} className="flex-1 py-3 text-sm font-black text-accent bg-accent/10 hover:bg-accent hover:text-white dark:hover:text-black rounded-xl flex items-center justify-center gap-2 transition-all">
                    View Case Study <ExternalLink size={14} />
                  </a>
                  <a href={project.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl text-main transition-all">
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'certificates':
      return (
        <div className="space-y-4">
          {CERTIFICATES.map((cert, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedCertIndex(i)}
              className="flex items-center justify-between p-5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-accent/40 transition-all group w-full text-left"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 shadow-lg">
                  <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-main text-lg">{cert.name}</h4>
                  <p className="text-[10px] font-black text-secondary/60 dark:text-slate-500 uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
              <ZoomIn size={18} className="text-secondary opacity-50 group-hover:text-accent group-hover:opacity-100 transition-all" />
            </button>
          ))}

          {/* Modal Overlay for Certificate Preview */}
          <AnimatePresence>
            {selectedCertIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                onClick={() => setSelectedCertIndex(null)}
              >
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[2001]">
                   <div className="text-white/80">
                      <h4 className="text-xl font-black">{CERTIFICATES[selectedCertIndex].name}</h4>
                      <p className="text-sm opacity-60 font-bold">{CERTIFICATES[selectedCertIndex].issuer} • {CERTIFICATES[selectedCertIndex].date}</p>
                   </div>
                   <button 
                    onClick={() => setSelectedCertIndex(null)}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-90"
                   >
                     <X size={24} strokeWidth={2.5} />
                   </button>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative max-w-5xl w-full flex items-center justify-center pointer-events-none"
                  onClick={e => e.stopPropagation()}
                >
                  <img 
                    src={CERTIFICATES[selectedCertIndex].image} 
                    alt={CERTIFICATES[selectedCertIndex].name}
                    className="max-h-[80vh] w-auto shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-lg pointer-events-auto"
                  />
                  
                  {/* Quick Navigation Controls */}
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:flex pointer-events-auto">
                    <button 
                      onClick={prevCert}
                      className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-75"
                    >
                      <ChevronLeft size={32} />
                    </button>
                  </div>
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:flex pointer-events-auto">
                    <button 
                      onClick={nextCert}
                      className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all active:scale-75"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );

    case 'contact':
      return (
        <div className="max-w-md mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black text-main tracking-tight">Let's talk.</h3>
            <p className="text-secondary font-medium">I'm currently accepting new projects and collaborations.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-secondary uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" className="w-full bg-black/5 dark:bg-white/5 px-6 py-4 rounded-xl border border-black/10 dark:border-white/10 text-main focus:outline-none focus:border-accent/50 transition-all placeholder:opacity-20" placeholder="Type your name..." />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-secondary uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" className="w-full bg-black/5 dark:bg-white/5 px-6 py-4 rounded-xl border border-black/10 dark:border-white/10 text-main focus:outline-none focus:border-accent/50 transition-all placeholder:opacity-20" placeholder="hello@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-secondary uppercase tracking-widest ml-1">Project Details</label>
              <textarea rows={4} className="w-full bg-black/5 dark:bg-white/5 px-6 py-4 rounded-xl border border-black/10 dark:border-white/10 text-main focus:outline-none focus:border-accent/50 resize-none transition-all placeholder:opacity-20" placeholder="Describe what you're building..." />
            </div>
            <button className="w-full bg-accent hover:opacity-90 text-white dark:text-black font-black py-4 rounded-xl transition-all shadow-xl shadow-accent/20 active:scale-95">SEND MESSAGE</button>
          </form>
        </div>
      );
    default: return null;
  }
};

export default WindowContent;
