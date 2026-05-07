import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ShieldCheck, Activity, BellRing, ArrowRight, Sun, Moon, ChevronRight, Newspaper, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { isDarkMode, toggleTheme } = useTheme();

  const newsItems = [
    { id: 1, title: "EleGuardLK Successfully Prevents Herd Intrusion in Yala Buffer Zone", date: "May 2, 2026", excerpt: "Our early warning system detected a herd of 15 elephants approaching village borders, allowing authorities to deploy non-harmful deterrents in time." },
    { id: 2, title: "New Geophone Sensors Deployed in Anuradhapura", date: "April 28, 2026", excerpt: "We have expanded our sensor network, installing 50 new high-sensitivity geophones to increase the prediction accuracy in the northern sector." },
    { id: 3, title: "AI Model Update Reduces False Alarms by 40%", date: "April 15, 2026", excerpt: "The latest machine learning patch has significantly improved the system's ability to distinguish between heavy vehicles and elephant footfalls." },
  ];

  return (
    <div className="min-h-screen bg-theme-base flex flex-col font-sans overflow-x-hidden text-[var(--color-text-primary-val)] transition-colors duration-300">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50 bg-theme-base/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <Link to="/" className="flex items-center gap-3 md:gap-4 hover:opacity-90 transition-opacity">
          {/* Logo placeholder - expects public/logo.png */}
          <div className="h-16 md:h-24 flex items-center justify-center drop-shadow-lg">
            <img src="/logo.png" alt="EleGuardLK Logo" className="h-full w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden h-12 w-12 bg-theme-primary rounded-full items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-black tracking-tighter hidden sm:block">
            EleGuard<span className="text-theme-primary">LK</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
          <Link to="/auth" className="hidden md:block px-6 py-2.5 rounded-full font-bold text-theme-secondary hover:text-theme-primary transition-colors">
            Login
          </Link>
          <Link to="/dashboard" className="px-6 py-2.5 bg-theme-primary text-white rounded-full font-bold shadow-[0_0_20px_rgba(46,125,50,0.4)] hover:shadow-[0_0_25px_rgba(46,125,50,0.6)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
            Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center min-h-screen">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-theme-primary/10 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 -right-20 w-[700px] h-[700px] bg-theme-secondary/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-surface border border-theme-primary/20 text-theme-primary font-bold text-sm mb-8 shadow-lg shadow-theme-primary/10"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-theme-primary"></span>
            </span>
            System Online & Monitoring Active
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1]"
          >
            Protecting Farms.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary via-theme-secondary to-green-400">Preserving Wildlife.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--color-text-secondary-val)] mb-10 max-w-3xl mx-auto font-medium"
          >
            The next-generation IoT & AI-driven early warning system detecting elephant movements to prevent human-elephant conflicts in Sri Lanka.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <Link to="/map" className="group relative w-full sm:w-auto px-8 py-4 bg-theme-primary text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-3">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Map className="w-6 h-6 relative z-10" /> 
              <span className="relative z-10">Live Interactive Map</span>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-theme-surface text-[var(--color-text-primary-val)] rounded-full font-bold text-lg shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center gap-2">
              System Access <ChevronRight className="w-5 h-5 text-theme-primary" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards floating up */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 z-10 w-full"
        >
          {[
            { icon: Activity, title: "Seismic Detection", desc: "Military-grade geophone networks capturing ground vibrations.", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: BellRing, title: "Automated Alerts", desc: "Sub-second latency SMS & Siren warnings to at-risk villages.", color: "text-red-500", bg: "bg-red-500/10" },
            { icon: Map, title: "AI Predictions", desc: "Machine learning models forecasting migration corridors.", color: "text-theme-primary", bg: "bg-theme-primary/10" }
          ].map((feature, idx) => (
            <div key={idx} className="group relative bg-theme-surface/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/20 dark:border-gray-700/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-3 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] pointer-events-none"></div>
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-[var(--color-text-secondary-val)] leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Latest News Section */}
      <section className="py-24 px-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-gray-800/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-theme-primary" /> Latest Updates
              </h2>
              <p className="text-theme-secondary font-medium text-lg">Recent news and system deployments.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-theme-primary font-bold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-theme-surface p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="text-sm font-bold text-theme-primary mb-4">{item.date}</div>
                <h3 className="text-xl font-bold mb-4 leading-snug">{item.title}</h3>
                <p className="text-[var(--color-text-secondary-val)] mb-6 flex-1">{item.excerpt}</p>
                <button className="text-sm font-bold text-[var(--color-text-primary-val)] flex items-center gap-2 group">
                  Read Full Story <ChevronRight className="w-4 h-4 text-theme-primary group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section at Bottom */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-theme-primary/5 dark:bg-theme-primary/10 rounded-[3rem] p-8 md:p-16 border border-theme-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/20 rounded-bl-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-1">
              <h2 className="text-4xl font-black mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-theme-primary" /> About EleGuardLK
              </h2>
              <p className="text-lg text-[var(--color-text-secondary-val)] mb-6 leading-relaxed">
                Human-elephant conflict (HEC) is a critical socio-environmental challenge. EleGuardLK was born from the need to bridge the gap between advanced technology and wildlife conservation. 
              </p>
              <p className="text-lg text-[var(--color-text-secondary-val)] mb-8 leading-relaxed">
                By deploying an intelligent mesh of seismic sensors and leveraging cloud-based AI, our mission is to detect unique vibrational patterns of elephant herds and provide life-saving early warnings—fostering coexistence between humans and the majestic wildlife of Sri Lanka.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-black text-theme-primary mb-2">24/7</div>
                  <div className="font-bold text-[var(--color-text-secondary-val)]">Continuous Monitoring</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-theme-primary mb-2">0%</div>
                  <div className="font-bold text-[var(--color-text-secondary-val)]">Harm to Wildlife</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="bg-theme-surface p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-theme-primary/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-center">Join the Initiative</h3>
                  <p className="text-center text-[var(--color-text-secondary-val)] mb-8">Partner with us to expand the sensor network and protect more vulnerable communities.</p>
                  <button className="w-full py-4 bg-[var(--color-text-primary-val)] text-theme-surface rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-theme-secondary text-sm border-t border-gray-200/50 dark:border-gray-800/50 z-10">
        <p>&copy; 2026 EleGuardLK System. All rights reserved. Designed for Wildlife Conservation.</p>
      </footer>
    </div>
  );
}
