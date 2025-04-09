"use client";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      // Determine active section based on scroll position
      const sections = ["home", "skills", "projects", "services", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setActiveNav(sectionId);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Initialize skills chart
    const skillsChart = document.getElementById("skills-chart");
    const techChart = document.getElementById("tech-chart");
    if (skillsChart) {
      const chart = echarts.init(skillsChart);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: "AI Development", max: 100 },
            { name: "Machine Learning", max: 100 },
            { name: "Backend", max: 100 },
            { name: "Frontend", max: 100 },
            { name: "Geo Development", max: 100 },
            { name: "DevOps", max: 100 },
          ],
          shape: "circle",
          splitNumber: 4,
          axisName: {
            color: darkMode ? "#fff" : "#333",
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        series: [
          {
            name: "Skills",
            type: "radar",
            data: [
              {
                value: [95, 90, 88, 92, 85, 87],
                name: "Skill Level",
                areaStyle: {
                  color: "rgba(78, 42, 132, 0.6)",
                },
                lineStyle: {
                  color: "#6e48aa",
                },
                itemStyle: {
                  color: "#6e48aa",
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
    if (techChart) {
      const chart = echarts.init(techChart);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: "Python", max: 100 },
            { name: "TypeScript", max: 100 },
            { name: "MongoDB", max: 100 },
            { name: "SQL", max: 100 },
            { name: "GCP", max: 100 },
            { name: "Linux", max: 100 },
            { name: "GitHub", max: 100 },
          ],
          shape: "circle",
          splitNumber: 4,
          axisName: {
            color: darkMode ? "#fff" : "#333",
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        series: [
          {
            name: "Tech Skills",
            type: "radar",
            data: [
              {
                value: [92, 88, 85, 90, 82, 88, 94],
                name: "Skill Level",
                areaStyle: {
                  color: "rgba(110, 72, 170, 0.6)",
                },
                lineStyle: {
                  color: "#4e8af5",
                },
                itemStyle: {
                  color: "#4e8af5",
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
    return () => {
      if (skillsChart) {
        const chart = echarts.getInstanceByDom(skillsChart);
        if (chart) chart.dispose();
      }
      if (techChart) {
        const chart = echarts.getInstanceByDom(techChart);
        if (chart) chart.dispose();
      }
    };
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
              FC
            </div>
            <span className="font-semibold text-xl">Fabian Correa</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {["home", "skills", "projects", "services", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize cursor-pointer whitespace-nowrap ${activeNav === item ? "text-purple-600 font-medium" : ""} hover:text-purple-500 transition-colors`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer !rounded-button whitespace-nowrap"
              aria-label="Toggle dark mode"
            >
              <i
                className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-xl`}
              ></i>
            </button>
            <button className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
              Let's Connect
            </button>
            <div className="md:hidden cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen pt-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 opacity-90"></div>
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <span className="block">Hi, I'm</span>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  Fabian Correa
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
                AI | Geo | Full-Stack Developer
              </h2>
              <p className="text-gray-300 mb-8 max-w-lg">
                Transforming ideas into innovative solutions with cutting-edge
                technology. Specialized in AI development, geospatial
                applications, and full-stack solutions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
                  View Projects
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer !rounded-button whitespace-nowrap">
                  Let's Connect
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                <img
                  src="https://public.readdy.ai/ai/img_res/0376ea7f7fccb568ca7357d622f2eb45.jpg"
                  alt="Fabian Correa 3D Character"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-purple-500"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-full shadow-lg">
                  <i className="fas fa-code text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-300`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              With expertise across multiple domains, I bring a versatile skill
              set to every project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* AI Development */}
            <div
              className={`p-6 rounded-xl ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-purple-600 mb-4">
                <i className="fas fa-brain text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Development</h3>
              <p
                className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Building intelligent systems with machine learning, natural
                language processing, and computer vision.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "TensorFlow",
                  "PyTorch",
                  "NLP",
                  "Computer Vision",
                  "Deep Learning",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Geo Development */}
            <div
              className={`p-6 rounded-xl ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-blue-600 mb-4">
                <i className="fas fa-globe-americas text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Geo Development</h3>
              <p
                className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Creating location-based applications and spatial analysis
                solutions for complex geographical challenges.
              </p>
              <div className="flex flex-wrap gap-2">
                {["GIS", "Mapbox", "Leaflet", "Spatial Analysis", "QGIS"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
            {/* Full-Stack Development */}
            <div
              className={`p-6 rounded-xl ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100"} shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="text-teal-600 mb-4">
                <i className="fas fa-laptop-code text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Full-Stack Development</h3>
              <p
                className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Developing end-to-end solutions with TypeScript for frontend and
                Python for backend services.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Python",
                  "Django",
                  "Node.js",
                  "FastAPI",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Skills Charts */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Domain Expertise
              </h3>
              <div id="skills-chart" className="w-full h-80"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Technical Proficiency
              </h3>
              <div id="tech-chart" className="w-full h-80"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Explore some of my recent work across AI, geospatial, and
              full-stack development.
            </p>
          </div>
          {/* Project Filters */}
          <div className="flex justify-center mb-12">
            <div
              className={`inline-flex p-1 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
            >
              {["All", "AI", "Geo", "Full-Stack"].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-lg cursor-pointer !rounded-button whitespace-nowrap ${filter === "All" ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Image Recognition",
                category: "AI",
                image:
                  "https://public.readdy.ai/ai/img_res/b7a452a3bb59e848547c2135c82dd921.jpg",
                tech: ["TensorFlow", "Python", "React"],
                description:
                  "A computer vision system that identifies and classifies objects in real-time with high accuracy.",
              },
              {
                title: "Geo-Spatial Analytics Dashboard",
                category: "Geo",
                image:
                  "https://public.readdy.ai/ai/img_res/8f948145b9c4c9e3d7d45b2905668309.jpg",
                tech: ["Mapbox", "D3.js", "TypeScript"],
                description:
                  "Interactive mapping platform for visualizing and analyzing location-based data patterns.",
              },
              {
                title: "Smart City Platform",
                category: "Full-Stack",
                image:
                  "https://public.readdy.ai/ai/img_res/f9110fe8d64ee2bbfef8bec504e77923.jpg",
                tech: ["Python", "React", "IoT"],
                description:
                  "End-to-end solution for monitoring and managing urban infrastructure and services.",
              },
              {
                title: "Natural Language Processing API",
                category: "AI",
                image:
                  "https://public.readdy.ai/ai/img_res/9d3bb4bd6a381dd081173323e0c96dfb.jpg",
                tech: ["BERT", "FastAPI", "Docker"],
                description:
                  "Scalable API for text analysis, sentiment detection, and language understanding.",
              },
              {
                title: "Route Optimization System",
                category: "Geo",
                image:
                  "https://public.readdy.ai/ai/img_res/ad174d9678b69b82d221a44125a96b0b.jpg",
                tech: ["Python", "GraphQL", "Leaflet"],
                description:
                  "Algorithm-driven solution for optimizing delivery routes and reducing transportation costs.",
              },
              {
                title: "Cloud-Based Development Platform",
                category: "Full-Stack",
                image:
                  "https://public.readdy.ai/ai/img_res/a5f12fd0578c3c02bb9d00162ec57377.jpg",
                tech: ["TypeScript", "Node.js", "AWS"],
                description:
                  "Collaborative platform for streamlined software development and deployment.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p
                    className={`mb-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="text-purple-600 hover:text-purple-500 font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                    View Project <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
              View All Projects
            </button>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        id="services"
        className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-300`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Professional solutions tailored to meet your specific technology
              needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-robot",
                title: "AI Solutions",
                description:
                  "Custom artificial intelligence solutions to automate processes, gain insights from data, and enhance decision-making capabilities.",
                color: "from-purple-500 to-indigo-600",
                details:
                  "Our AI solutions leverage cutting-edge machine learning algorithms, neural networks, and natural language processing to create intelligent systems that solve complex business problems. We specialize in predictive analytics, computer vision, and conversational AI that integrate seamlessly with your existing infrastructure.",
              },
              {
                icon: "fas fa-map-marked-alt",
                title: "Geospatial Applications",
                description:
                  "Location-based applications and spatial analysis tools that transform geographical data into actionable business intelligence.",
                color: "from-blue-500 to-teal-500",
                details:
                  "Our geospatial applications combine advanced mapping technologies with data visualization to provide powerful insights from location data. We build custom GIS solutions, interactive maps, routing algorithms, and spatial analytics platforms that help businesses make better location-based decisions.",
              },
              {
                icon: "fas fa-code",
                title: "Full-Stack Development",
                description:
                  "End-to-end web and mobile application development with modern frameworks, ensuring scalable and maintainable solutions.",
                color: "from-teal-500 to-green-500",
                details:
                  "Our full-stack development services cover the entire application lifecycle from concept to deployment. Using modern frameworks like React, TypeScript, and Python, we build responsive, scalable, and secure applications with clean architecture and comprehensive testing to ensure long-term maintainability.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? "bg-gray-700" : "bg-white"} transition-all duration-300 transform hover:-translate-y-2 group relative`}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 cursor-pointer relative`}
                    onMouseEnter={(e) => {
                      const tooltip =
                        e.currentTarget.querySelector(".service-tooltip");
                      if (tooltip)
                        tooltip.classList.remove("opacity-0", "invisible");
                    }}
                    onMouseLeave={(e) => {
                      const tooltip =
                        e.currentTarget.querySelector(".service-tooltip");
                      if (tooltip)
                        tooltip.classList.add("opacity-0", "invisible");
                    }}
                  >
                    <i className={`${service.icon} text-2xl`}></i>
                    <div className="service-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-64 p-4 rounded-lg bg-gray-900 text-white text-sm shadow-xl z-10 opacity-0 invisible transition-opacity duration-300 pointer-events-none">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                      <p>{service.details}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p
                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {service.description}
                  </p>
                  <button className="text-purple-600 hover:text-purple-500 font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Process Steps */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">
              My Development Process
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description:
                    "Understanding your needs and project requirements",
                },
                {
                  number: "02",
                  title: "Planning",
                  description: "Creating a roadmap and technical architecture",
                },
                {
                  number: "03",
                  title: "Development",
                  description: "Building the solution with agile methodology",
                },
                {
                  number: "04",
                  title: "Testing",
                  description: "Ensuring quality and performance",
                },
                {
                  number: "05",
                  title: "Deployment",
                  description: "Launching and providing ongoing support",
                },
              ].map((step, index, array) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center mb-8 md:mb-0 w-full md:w-1/5"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold mb-4`}
                  >
                    {step.number}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {step.description}
                  </p>
                  {index < array.length - 1 && (
                    <div className="hidden md:block w-full h-0.5 bg-gray-300 dark:bg-gray-700 absolute top-6 left-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 ${darkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Connect
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your
              ideas to life.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div
                className={`p-8 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"} shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form>
                  <div className="mb-6">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Your email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="md:w-1/2">
              <div
                className={`p-8 rounded-xl h-full ${darkMode ? "bg-gray-800" : "bg-gray-50"} shadow-lg`}
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p
                        className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        fabian.correa@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p
                        className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        San Francisco, California
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Working Hours</h4>
                      <p
                        className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        Monday - Friday: 9AM - 6PM PST
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h4 className="font-medium mb-4">Connect on Social Media</h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: "fab fa-github",
                        color: "bg-gray-800 hover:bg-gray-900",
                      },
                      {
                        icon: "fab fa-linkedin",
                        color: "bg-blue-600 hover:bg-blue-700",
                      },
                      {
                        icon: "fab fa-twitter",
                        color: "bg-blue-400 hover:bg-blue-500",
                      },
                      {
                        icon: "fab fa-instagram",
                        color: "bg-pink-600 hover:bg-pink-700",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`w-10 h-10 rounded-full ${social.color} text-white flex items-center justify-center transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-10 p-6 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-500/20 border border-purple-500/30">
                  <h4 className="font-medium mb-2">Available for Freelance</h4>
                  <p className="text-sm mb-4">
                    Currently accepting new projects and consulting
                    opportunities.
                  </p>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  FC
                </div>
                <span className="font-semibold text-xl">Fabian Correa</span>
              </div>
              <p className="text-sm text-gray-400 max-w-md">
                Transforming ideas into innovative solutions with cutting-edge
                technology.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4">Navigation</h4>
                <ul className="space-y-2">
                  {["Home", "Skills", "Projects", "Services", "Contact"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                        >
                          {item}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  {[
                    "AI Development",
                    "Geo Applications",
                    "Full-Stack",
                    "Consulting",
                    "Training",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold mb-4">Newsletter</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Subscribe for updates on latest projects and tech insights.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-l-lg border-none bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Fabian Correa. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[
                "fab fa-github",
                "fab fa-linkedin",
                "fab fa-twitter",
                "fab fa-instagram",
              ].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      {/* Custom Styles */}
      <style jsx>{`
@keyframes float {
0%, 100% {
transform: translateY(0);
}
50% {
transform: translateY(-20px);
}
}
`}</style>
    </div>
  );
}
