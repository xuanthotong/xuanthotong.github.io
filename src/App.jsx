import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Code2, Database, Layout, ChevronDown, Menu, X } from 'lucide-react';

// --- Component hỗ trợ hiệu ứng xuất hiện khi cuộn (Scroll Reveal) ---
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      default: return 'translate-y-12';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getTransform()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Dữ liệu Portfolio ---
const PORTFOLIO_DATA = {
  name: "Tống Xuân Thọ",
  role: "Intern Developer",
  tagline: "Kiến tạo trải nghiệm mượt mà qua từng dòng code.",
  about: "Xin chào, tôi là một Lập trình viên đam mê công nghệ và giải quyết vấn đề. Hiện tôi đang theo học chuyên ngành Lập trình máy tính tại Hanoi Vocational College of Technology (GPA: 3.4/4.0). Định hướng của tôi là trở thành một Full-stack Developer chuyên nghiệp, luôn sẵn sàng đón nhận những thách thức công nghệ mới.",
  contact: {
    phone: "0967.715.3933",
    email: "tongthobro456@gmail.com",
    location: "Hà Nội, Việt Nam",
    github: "#"
  },
  skills: [
    { category: "Ngôn Ngữ", icon: <Code2 size={24}/>, items: ["JavaScript (ES6+)", "C#", "HTML5", "CSS3"] },
    { category: "Frameworks", icon: <Layout size={24}/>, items: ["ReactJS", "Node.js", "ExpressJS", "Tailwind CSS"] },
    { category: "Database & Tools", icon: <Database size={24}/>, items: ["MongoDB", "MySQL", "SQL Server", "RESTful API", "Postman", "Git / GitHub"] }
  ],
  experience: [
    {
      company: "Tập Đoàn Wistron",
      role: "Thực tập sinh IQC",
      period: "06/2025 - 09/2025",
      description: [
        "Phát hiện lỗi, lập báo cáo bất thường (Bug Report) trên hệ thống quản lý.",
        "Phối hợp chặt chẽ với đội ngũ sản xuất và kỹ thuật để phân tích nguyên nhân (Root Cause) và xử lý sự cố.",
        "Tuân thủ quy định an toàn, bảo mật và tiêu chuẩn vận hành (SOP)."
      ]
    }
  ],
  projects: [
    {
      title: "English AI",
      period: "12/2025 - Nay",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
      description: "Web App hỗ trợ luyện giao tiếp và sửa lỗi ngữ pháp tiên tiến bằng trí tuệ nhân tạo.",
      details: ["Xây dựng RESTful API và tích hợp OpenAI API (ChatGPT).", "Lên khung giao diện (UI) bằng ReactJS & Tailwind CSS.", "Thiết kế cơ sở dữ liệu và cấu hình Node.js."],
      tags: ["ReactJS", "Node.js", "OpenAI API", "Tailwind"]
    },
    {
      title: "Phần Mềm Bán Hàng",
      period: "01/2025 - 03/2025",
      role: "Trưởng nhóm",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "Ứng dụng desktop hỗ trợ quản lý quy trình bán hàng với C# và hệ quản trị cơ sở dữ liệu MySQL.",
      details: ["Thiết kế CSDL và cấu hình môi trường ứng dụng.", "Chẩn đoán, khắc phục lỗi kết nối Database.", "Kiểm thử hệ thống với luồng nhập/xuất liên tục."],
      tags: ["C#", "MySQL", "Desktop App"]
    },
    {
      title: "Ứng dụng Báo Cáo Lỗi",
      period: "06/2025 - 09/2025",
      role: "Tester",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
      description: "Dự án đảm bảo chất lượng phần mềm thông qua quy trình kiểm thử nghiêm ngặt.",
      details: ["Lên kịch bản kiểm thử cho các luồng CRUD.", "Kiểm thử giao diện và chức năng trên form nhập liệu.", "Sử dụng Postman cho API Testing giữa Front-end và Back-end."],
      tags: ["Testing", "Postman", "QA/QC"]
    }
  ]
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-300 font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-wider cursor-pointer" onClick={() => scrollTo('home')}>
            THO<span className="text-cyan-400">.DEV</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="hover:text-cyan-400 transition-colors capitalize tracking-wide"
              >
                {item === 'about' ? 'Giới Thiệu' : item === 'skills' ? 'Kỹ Năng' : item === 'projects' ? 'Dự Án' : 'Liên Hệ'}
              </button>
            ))}
          </div>

          <button className="md:hidden text-neutral-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64 py-4' : 'max-h-0'}`}>
          <div className="flex flex-col items-center gap-4">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="hover:text-cyan-400 transition-colors capitalize tracking-wide w-full text-center py-2"
              >
                {item === 'about' ? 'Giới Thiệu' : item === 'skills' ? 'Kỹ Năng' : item === 'projects' ? 'Dự Án' : 'Liên Hệ'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Reveal delay={100}>
              <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wider mb-6">
                Xin chào, tôi là
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 tracking-tight">
                {PORTFOLIO_DATA.name}
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
                {PORTFOLIO_DATA.role}
              </h2>
            </Reveal>
            <Reveal delay={400}>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {PORTFOLIO_DATA.tagline}
              </p>
            </Reveal>
            <Reveal delay={500}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => scrollTo('projects')} className="px-8 py-3 rounded-md bg-cyan-500 text-neutral-950 font-bold hover:bg-cyan-400 transition-all transform hover:scale-105">
                  Xem Dự Án
                </button>
                <button onClick={() => scrollTo('contact')} className="px-8 py-3 rounded-md bg-transparent border border-neutral-700 text-white font-bold hover:border-cyan-400 hover:text-cyan-400 transition-all">
                  Liên Hệ Ngay
                </button>
              </div>
            </Reveal>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollTo('about')}>
            <ChevronDown size={32} />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white"><span className="text-cyan-400">01.</span> Về Tôi</h2>
                <div className="h-px bg-neutral-800 flex-1"></div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal direction="right">
                <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                  <p>{PORTFOLIO_DATA.about}</p>
                  <p>
                    Tôi thích xây dựng những sản phẩm kết hợp giữa thiết kế tối ưu và hiệu suất vượt trội. 
                    Mỗi dòng code là một cơ hội để tôi học hỏi và hoàn thiện kỹ năng của mình.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="left" delay={200}>
                <div className="relative group mx-auto w-3/4 md:w-full max-w-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative aspect-square bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                     {/* Replace src with your real photo */}
                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 hover:bg-transparent transition-colors duration-300"></div>
                    <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600" alt="Developer setup" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 border-t border-neutral-800/50">
          <div className="container mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white"><span className="text-cyan-400">02.</span> Kỹ Năng</h2>
                <div className="h-px bg-neutral-800 flex-1"></div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {PORTFOLIO_DATA.skills.map((skillGroup, index) => (
                <Reveal key={index} delay={index * 150} direction="up">
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 hover:border-cyan-500/50 transition-colors h-full">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-neutral-950 border border-neutral-800 text-neutral-400 text-sm rounded-md hover:text-cyan-400 hover:border-cyan-900 transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-24 px-6 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white"><span className="text-cyan-400">03.</span> Kinh Nghiệm</h2>
                <div className="h-px bg-neutral-800 flex-1"></div>
              </div>
            </Reveal>

            <div className="space-y-12">
              {PORTFOLIO_DATA.experience.map((exp, index) => (
                <Reveal key={index} delay={200}>
                  <div className="relative pl-8 md:pl-0">
                    {/* Timeline line for mobile */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800"></div>
                    <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-neutral-950"></div>
                    
                    <div className="md:flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {exp.role} <span className="text-cyan-400">@ {exp.company}</span>
                      </h3>
                      <span className="text-sm font-mono text-neutral-500 block mt-1 md:mt-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-3 mt-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start text-neutral-400">
                          <span className="text-cyan-400 mr-3 mt-1 text-sm">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 border-t border-neutral-800/50">
          <div className="container mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white"><span className="text-cyan-400">04.</span> Dự Án Nổi Bật</h2>
                <div className="h-px bg-neutral-800 flex-1"></div>
              </div>
            </Reveal>

            <div className="space-y-24">
              {PORTFOLIO_DATA.projects.map((project, index) => (
                <Reveal key={index} direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 group`}>
                    
                    {/* Project Image */}
                    <div className="w-full md:w-3/5 relative rounded-xl overflow-hidden shadow-2xl z-10">
                      <div className="absolute inset-0 bg-cyan-900/40 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-[300px] md:h-[400px] object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>

                    {/* Project Content */}
                    <div className={`w-full md:w-1/2 z-20 ${index % 2 === 0 ? 'md:-ml-12 md:text-right' : 'md:-mr-12 md:text-left'}`}>
                      <p className="text-cyan-400 font-mono text-sm mb-2">{project.period} | {project.role}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 hover:text-cyan-400 transition-colors cursor-pointer">{project.title}</h3>
                      
                      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-xl mb-6 text-neutral-300">
                        <p className="mb-4">{project.description}</p>
                        <ul className="space-y-2 text-sm text-neutral-400 text-left">
                          {project.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-cyan-400 mr-2">▹</span> {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`flex flex-wrap gap-3 text-sm font-mono text-neutral-400 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {project.tags.map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="text-cyan-400 font-mono text-lg mb-4">05. Có Gì Tiếp Theo?</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Kết Nối Với Tôi</h3>
              <p className="text-neutral-400 text-lg mb-12">
                Tôi luôn cởi mở với những cơ hội hợp tác mới. Nếu bạn có một dự án thú vị, một câu hỏi, hoặc chỉ muốn gửi lời chào, hộp thư của tôi luôn mở!
              </p>
              
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-md font-bold hover:bg-cyan-500/10 transition-colors"
              >
                <Mail size={20} />
                Gửi Email Cho Tôi
              </a>

              <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6 text-neutral-400">
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone size={18} />
                <span>{PORTFOLIO_DATA.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <MapPin size={18} />
                <span>{PORTFOLIO_DATA.contact.location}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>

    {/* Footer */}
      <footer className="py-6 text-center text-neutral-500 text-sm font-mono relative z-10 border-t border-neutral-900">
        <p>Thiết kế & Lập trình bởi <span className="text-cyan-500">{PORTFOLIO_DATA.name}</span> &copy; 2026</p>
      </footer>
    </div>
  );
}