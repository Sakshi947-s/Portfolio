import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on Sakshi Sinha's engineering portfolio
const projectsData = [
  {
    title: "NetWatch AI",
    category: "Intelligent Network Platform",
    description: "Network monitoring platform for real-time device, latency, packet loss, TCP, DNS & SNMP monitoring with AI anomaly detection.",
    longDescription: "Intelligent enterprise-grade network telemetry and monitoring platform engineered for real-time visibility across network infrastructure, packet reliability, and proactive anomaly prevention.",
    highlights: [
      "Built real-time telemetry monitoring for connected devices, latency, packet loss, TCP, DNS, and SNMP metrics.",
      "Integrated AI-driven anomaly detection models for root-cause analysis and predictive network troubleshooting.",
      "Engineered low-latency metric ingestion with high-speed FastAPI and Python asynchronous workers."
    ],
    tags: ["Python", "FastAPI", "AI Anomaly", "SNMP"],
    match: "99%",
    episode: "S01 E01"
  },
  {
    title: "COVID-19 Lung Segmentation",
    category: "Medical AI & Deep Learning",
    description: "Trained Attention ResUNet to segment infected lung regions from chest X-rays; evaluated with Dice coefficient, IoU, and F1-score.",
    longDescription: "Clinical-grade medical computer vision system that trains an Attention ResUNet deep learning architecture to automatically segment infected lung regions from chest radiograph X-rays.",
    highlights: [
      "Trained Attention ResUNet neural architecture to segment infected regions from chest X-ray scans.",
      "Evaluated model rigorously using Dice coefficient, Intersection over Union (IoU), and F1-score for high diagnostic accuracy.",
      "Implemented robust preprocessing, data augmentation, and artifact filtering pipelines in TensorFlow."
    ],
    tags: ["Attention ResUNet", "TensorFlow", "Computer Vision", "Python"],
    match: "99%",
    episode: "S01 E02"
  },
  {
    title: "MINE-SIGMA: Mining Detection",
    category: "Satellite Vision & Geospatial",
    description: "Detected illegal mining via satellite imagery using change detection pipelines with real-time land disturbance alerts.",
    longDescription: "Geospatial computer vision platform designed to detect unauthorized and illegal surface mining operations using satellite imagery change detection.",
    highlights: [
      "Detected illegal surface mining activities from high-resolution satellite imagery using multi-temporal change detection.",
      "Engineered scalable processing workflows to monitor land disturbance and environmental degradation.",
      "Constructed real-time alerting system for immediate notification of geographical boundary violations."
    ],
    tags: ["Computer Vision", "Geospatial", "Deep Learning", "Alerts"],
    match: "98%",
    episode: "S01 E03"
  },
  {
    title: "Setu-Drishti (Healthcare AI)",
    category: "Clinical Intelligence Platform",
    description: "AI clinical intelligence platform for early prediction of sepsis and patient deterioration, analyzing vitals and clinical patterns.",
    longDescription: "Advanced AI-powered clinical intelligence platform designed for critical healthcare environments to predict early sepsis onset and acute patient deterioration.",
    highlights: [
      "Engineered early prediction models for sepsis detection to reduce ICU response times.",
      "Developed continuous patient monitoring system analyzing live vital signs, clinical patterns, and laboratory reports.",
      "Integrated Deep Learning, Computer Vision, and Generative AI workflows to deliver actionable risk alerts for doctors."
    ],
    tags: ["Generative AI", "Deep Learning", "Computer Vision", "NLP"],
    match: "99%",
    episode: "S01 E04"
  },
  {
    title: "MERN Full-Stack Platform",
    category: "Web Architecture",
    description: "End-to-end web applications with React frontend, Node.js & Express APIs, MongoDB storage, and secure authentication flows.",
    longDescription: "Production-ready full-stack software application leveraging the MERN stack with modern responsive user experiences and scalable backends.",
    highlights: [
      "Engineered high-performance React frontend with modern component structure and Tailwind CSS styling.",
      "Architected secure Node.js and Express REST APIs with JWT authentication and middleware validation.",
      "Modeled complex document database schemas in MongoDB with indexing and query optimizations."
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    match: "97%",
    episode: "S01 E05"
  },
  {
    title: "EduCade EdTech Platform",
    category: "Venture & Product",
    description: "Co-founded student-centric startup platform creating community workflows, interactive study modules, and peer engagement.",
    longDescription: "Co-founded educational technology startup platform created to bridge academic collaboration and interactive student learning workflows.",
    highlights: [
      "Co-founded and spearheaded platform architecture for student interactive learning modules.",
      "Created peer-to-peer discussion workflows and real-time collaboration tools for university students.",
      "Developed end-to-end responsive UI with streamlined community dashboards and progress tracking."
    ],
    tags: ["React", "Full-Stack", "EdTech", "Community"],
    match: "96%",
    episode: "S01 E06"
  },
  {
    title: "Cloud & REST API Services",
    category: "API & Cloud Engineering",
    description: "High-throughput REST APIs and microservice endpoints engineered with FastAPI, PostgreSQL, and AWS deployment.",
    longDescription: "Enterprise-grade cloud microservices and RESTful API infrastructure optimized for high concurrency, security, and low latency.",
    highlights: [
      "Developed asynchronous REST APIs using FastAPI with automated OpenAPI interactive documentation.",
      "Designed relational databases and schema migrations in PostgreSQL with relational integrity.",
      "Deployed and configured services on AWS cloud with automated Git version control."
    ],
    tags: ["FastAPI", "PostgreSQL", "AWS", "REST APIs"],
    match: "98%",
    episode: "S01 E07"
  },
  {
    title: "Algorithmic Problem Solving",
    category: "Competitive Engineering",
    description: "Optimized algorithmic solutions and data structure architectures solved across C++, Java, and Python.",
    longDescription: "Rigorous algorithmic problem solving, computational complexity minimization, and mathematical modeling.",
    highlights: [
      "Optimized algorithms for advanced data structures including Trees, Graphs, Heaps, and Dynamic Programming.",
      "Demonstrated multi-language fluency across C++, Java, and Python.",
      "Trained on competitive programming problem sets with clinical focus on optimal time & space efficiency."
    ],
    tags: ["C++", "Java", "Python", "Data Structures"],
    match: "99%",
    episode: "S01 E08"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        let row, col;
        if (index < 3) { row = 0; col = index; }
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            onClick={() => setSelectedProject(projectsData[0])}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center cursor-pointer"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div 
                onClick={() => setSelectedProject(project)}
                className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between"
              >
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-red-500/80 group-hover:text-red-400 transition-colors">
                      TAP FOR DETAILS ↗
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Red Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div 
              onClick={() => setSelectedProject(project)}
              className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </span>
                  <span className="text-[9px] font-mono text-red-500">
                    TAP DETAILS ↗
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Netflix Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto cursor-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#141414] border border-red-600/50 rounded-3xl p-6 md:p-8 shadow-[0_35px_100px_rgba(229,9,20,0.45)] text-white overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Red Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer z-20 group"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Netflix Header Badges */}
            <div className="flex items-center gap-2.5 mb-3 flex-wrap pr-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/30">
                {selectedProject.episode}
              </span>
              <span className="text-xs font-mono text-red-400 font-bold">
                {selectedProject.match} Match
              </span>
              <span className="text-[10px] font-mono border border-white/20 px-2 py-0.5 rounded text-white/60">
                NETFLIX ARCHIVE
              </span>
              <span className="text-xs font-mono text-white/40 tracking-wider">
                {selectedProject.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
              {selectedProject.title}
            </h3>

            {/* Full Project Description */}
            <p className="text-sm md:text-base text-white/85 font-light leading-relaxed mb-5">
              {selectedProject.longDescription || selectedProject.description}
            </p>

            {/* Engineering Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-black/60 border border-white/10 space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                  Technical Architecture & Highlights
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-white/80 font-light">
                  {selectedProject.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold shrink-0">&#8250;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags & Close Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:scale-105 active:scale-95 whitespace-nowrap self-end sm:self-auto"
              >
                Close Slot
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;