import React, { useState, useEffect, useRef } from 'react';

// Modal Component defined within ThemeLayout to keep it self-contained
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-gray-700 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wide">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-all text-2xl">&times;</button>
        </div>
        <div className="p-6 prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-cyan-400 prose-li:text-gray-300">
            {children}
        </div>
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-900 sticky bottom-0 text-right">
             <button onClick={onClose} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};


const ThemeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let rotation = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars: { x: number; y: number; z: number; size: number }[] = [];
    const numStars = 1000;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            size: Math.random() * 2
        });
    }

    const draw = () => {
        // Deep space background
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#0f172a'); // Slate 900
        bgGradient.addColorStop(1, '#020617'); // Slate 950
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Nebula effect - subtle and slow
        rotation += 0.0002;
        ctx.rotate(rotation);
        
        // Primary nebula layer
        const grad1 = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.8);
        grad1.addColorStop(0, 'rgba(56, 189, 248, 0.03)'); // Sky blue
        grad1.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)'); // Violet
        grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

        ctx.restore();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Starfield
        stars.forEach(star => {
            star.z -= 0.5; // Slower speed
            if (star.z <= 0) {
                star.x = (Math.random() - 0.5) * canvas.width * 2;
                star.y = (Math.random() - 0.5) * canvas.height * 2;
                star.z = canvas.width;
            }

            const k = 128 / star.z;
            const px = star.x * k;
            const py = star.y * k;
            
            // Fade in/out based on depth
            const opacity = (1 - star.z / canvas.width);
            
            if (px > -canvas.width/2 && px < canvas.width/2 && py > -canvas.height/2 && py < canvas.height/2) {
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(px, py, star.size * (1 - star.z/canvas.width) * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        ctx.restore();
        animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };
}, []);

  const modalContent: { [key: string]: { title: string, content: React.ReactNode } } = {
    about: { 
      title: 'About Investment Return Calculator', 
      content: (
        <>
          <p>Welcome to <strong>Investment Return Calculator</strong>, a premier financial utility designed and maintained by <strong>Doodax.com</strong>. Our mission is to democratize financial literacy by providing accurate, accessible, and user-friendly tools that empower individuals to make informed decisions about their wealth.</p>
          <p>In an era where financial planning is crucial for long-term stability, understanding the mechanics of compound interest is the first step towards financial freedom. We built this calculator to bridge the gap between complex financial formulas and everyday decision-making.</p>
          <h3>Our Commitment</h3>
          <p>We are dedicated to accuracy, privacy, and user experience. Unlike many other tools that clutter the screen with ads or require registration, our tool is free, instant, and respects your data.</p>
          <h3>Contact Information</h3>
          <p>This project is proudly managed by <strong>HSINI MOHAMED</strong>.</p>
          <ul>
              <li><strong>Website:</strong> <a href="https://doodax.com" target="_blank" rel="noopener noreferrer">doodax.com</a></li>
              <li><strong>Email:</strong> <a href="mailto:hsini.web@gmail.com">hsini.web@gmail.com</a></li>
          </ul>
        </>
      ) 
    },
    contact: { 
      title: 'Contact Us', 
      content: (
        <>
          <p>We value your feedback and are here to assist with any questions regarding the Investment Return Calculator. Whether you have suggestions for improvement, have spotted a bug, or just want to say hello, we want to hear from you.</p>
          <h3>Direct Contact</h3>
          <p>You can reach our administrative team directly via email:</p>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-cyan-400 my-4">
            <p className="font-bold text-lg">Email: <a href="mailto:hsini.web@gmail.com" className="text-cyan-400 hover:underline">hsini.web@gmail.com</a></p>
          </div>
          <h3>Visit Our Main Site</h3>
          <p>For more tools and web services, please visit our parent website at <a href="https://doodax.com" target="_blank" rel="noopener noreferrer">Doodax.com</a>.</p>
          <p><em>Please allow up to 48 hours for a response to general inquiries.</em></p>
        </>
      ) 
    },
    guide: { 
      title: 'User Guide', 
      content: (
        <>
          <p>Getting the most out of the Investment Return Calculator is simple. Follow these steps to generate your financial projection:</p>
          <ol>
            <li><strong>Initial Investment:</strong> Enter the starting amount of money you have available to invest today (the Principal).</li>
            <li><strong>Annual Interest Rate:</strong> Input the expected annual rate of return (in percentage). For example, the historical average of the stock market is often cited around 7-10% (not adjusted for inflation).</li>
            <li><strong>Investment Term:</strong> Specify how many years you plan to let the money grow. The longer the term, the more powerful the effect of compound interest.</li>
            <li><strong>Compounding Frequency:</strong> Select how often the interest is calculated and added back to your principal. 'Monthly' is a common setting for many savings accounts and funds.</li>
            <li><strong>Calculate:</strong> Click the "Calculate Future Value" button. The results will instantly appear, showing you the total future value, total interest earned, and a visual breakdown.</li>
          </ol>
          <p><strong>Tip:</strong> Try changing the "Compounding Frequency" to see how daily compounding compares to annual compounding!</p>
        </>
      ) 
    },
    privacy: { 
      title: 'Privacy Policy', 
      content: (
        <>
          <p className="text-sm text-gray-400">Last Updated: October 2023</p>
          <p>At <strong>Investment Return Calculator</strong> (accessible from ReturnCalculator.doodax.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>
          
          <h3>Data Collection and Usage</h3>
          <p>We believe in data minimization. This calculator runs primarily <strong>client-side</strong> within your web browser. When you enter financial data (like investment amounts or interest rates), this data is processed locally on your device to generate the results. We do not store, transmit, or save your specific financial inputs to our servers.</p>
          
          <h3>Log Files</h3>
          <p>Like many other Web sites, we make use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user’s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.</p>
          
          <h3>Cookies and Web Beacons</h3>
          <p>We may use cookies to store information about visitors preferences, to record user-specific information on which pages the site visitor accesses or visits, and to customize our web page content based on visitors browser type or other information that the visitor sends via their browser.</p>
          
          <h3>DoubleClick DART Cookie</h3>
          <p>Google, as a third party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</p>
          
          <h3>Consent</h3>
          <p>By using our website, you hereby consent to our privacy policy and agree to its terms.</p>
          
          <p>For any privacy-related inquiries, please contact: <a href="mailto:hsini.web@gmail.com">hsini.web@gmail.com</a>.</p>
        </>
      ) 
    },
    terms: { 
      title: 'Terms of Service', 
      content: (
        <>
          <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          
          <h3>1. Disclaimer</h3>
          <p>The materials on the Investment Return Calculator website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p><strong>Not Financial Advice:</strong> This tool is for informational and educational purposes only. The results provided by this calculator are estimates based on the information you provide and should not be considered as financial advice. We are not liable for any financial decisions, losses, or damages resulting from the use of this tool. Always consult with a qualified financial advisor before making investment decisions.</p>
          
          <h3>2. Limitations</h3>
          <p>In no event shall Doodax.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on this Internet site.</p>
          
          <h3>3. Site Terms of Use Modifications</h3>
          <p>We may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>
          
          <h3>4. Governing Law</h3>
          <p>Any claim relating to this website shall be governed by the laws of the site owner's jurisdiction without regard to its conflict of law provisions.</p>
        </>
      ) 
    },
    dmca: { 
      title: 'DMCA Notice', 
      content: (
        <>
          <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights ("Infringement") of any person or entity.</p>
          <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <a href="mailto:hsini.web@gmail.com">hsini.web@gmail.com</a>, with the subject line: "Copyright Infringement" and include in your claim a detailed description of the alleged Infringement.</p>
          <p>You may be held accountable for damages (including costs and attorneys' fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through the Service on your copyright.</p>
          <h3>Contact for Claims</h3>
          <p><strong>Email:</strong> hsini.web@gmail.com</p>
          <p><strong>Website Owner:</strong> Doodax.com</p>
        </>
      ) 
    },
  };

  const navLinks = [
    { name: 'About', key: 'about' },
    { name: 'Contact', key: 'contact' },
    { name: 'Guide', key: 'guide' },
    { name: 'Privacy Policy', key: 'privacy' },
    { name: 'Terms of Service', key: 'terms' },
    { name: 'DMCA', key: 'dmca' },
  ];

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></canvas>
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-40 backdrop-blur-md sticky top-0 border-b border-gray-800 z-40 transition-all duration-300">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="font-bold text-white text-lg">$</span>
               </div>
               <h1 className="text-xl md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all cursor-default">
                ReturnCalculator
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navLinks.map(link => (
                 <button key={link.key} onClick={() => openModal(link.key)} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                 </button>
              ))}
            </nav>
            <div className="md:hidden">
              <select onChange={(e) => e.target.value !== 'Menu' && openModal(e.target.value)} className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Menu</option>
                 {navLinks.map(link => (
                    <option key={link.key} value={link.key}>{link.name}</option>
                 ))}
              </select>
            </div>
          </div>
        </header>

        <div className="flex-grow flex flex-col">
          {children}
        </div>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-60 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center md:text-left">
                    <h4 className="text-lg font-bold text-white mb-4">Investment Return Calculator</h4>
                    <p className="text-gray-400 text-sm">Empowering your financial future with precise, easy-to-use calculation tools. Visualize your growth today.</p>
                </div>
                <div className="text-center">
                    <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        {navLinks.slice(0, 3).map(link => (
                            <button key={link.key} onClick={() => openModal(link.key)} className="text-gray-400 hover:text-cyan-400 transition-colors">{link.name}</button>
                        ))}
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                        {navLinks.slice(3).map(link => (
                            <button key={link.key} onClick={() => openModal(link.key)} className="text-gray-400 hover:text-cyan-400 transition-colors">{link.name}</button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col items-center justify-center text-gray-500 text-sm">
                <p className="mb-2">
                  Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-bold tracking-wide transition-colors duration-300">HSINI MOHAMED</a>
                </p>
                <p>
                  &copy; {new Date().getFullYear()} <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Doodax.com</a>. All rights reserved.
                </p>
            </div>
          </div>
        </footer>

        {activeModal && (
          <Modal isOpen={!!activeModal} onClose={closeModal} title={modalContent[activeModal].title}>
            {modalContent[activeModal].content}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ThemeLayout;