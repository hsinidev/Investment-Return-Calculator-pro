import React, { useState } from 'react';

const SeoArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Comprehensive JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "url": "https://ReturnCalculator.doodax.com/",
                "name": "Investment Return Calculator",
                "alternateName": ["Compound Interest Calculator", "Return Calculator"],
                "description": "A professional tool to calculate the future value of your investments with compound interest.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Doodax",
                    "url": "https://doodax.com",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://ReturnCalculator.doodax.com/favicon.svg"
                    }
                }
            },
            {
                "@type": "SoftwareApplication",
                "name": "Investment Return Calculator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the formula for compound interest?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The formula is A = P(1 + r/n)^(nt), where A is the future value, P is the principal, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the number of years."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How does compounding frequency affect my return?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "More frequent compounding (e.g., daily vs. annually) results in higher returns because interest is added to the principal more often, allowing that interest to earn its own interest sooner."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is this calculator free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, this Investment Return Calculator is 100% free to use for personal financial planning."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <div id="learn-more" className="max-w-5xl mx-auto mt-16 bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 shadow-2xl">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            <div className="relative">
                {/* Header always visible */}
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Mastering Wealth: The Ultimate Guide to Compound Interest</h2>
                
                <div className={`prose prose-lg prose-invert max-w-none transition-all duration-1000 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[20000px] opacity-100' : 'max-h-40 opacity-80'}`}>
                    
                    <p className="lead text-xl text-gray-300 mb-6">
                        Compound interest is often cited as the "eighth wonder of the world," a concept so powerful that it serves as the bedrock of modern wealth creation. Whether you are saving for retirement, a down payment on a home, or simply looking to grow your net worth, understanding how your money can work for you is the single most important financial lesson you can learn.
                    </p>

                    <h3 className="text-cyan-300">Table of Contents</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <li><a href="#understanding" className="no-underline hover:text-cyan-400">1. Understanding the Mechanics</a></li>
                        <li><a href="#formula" className="no-underline hover:text-cyan-400">2. The Mathematics of Growth</a></li>
                        <li><a href="#frequency" className="no-underline hover:text-cyan-400">3. The Impact of Frequency</a></li>
                        <li><a href="#strategies" className="no-underline hover:text-cyan-400">4. Investment Strategies</a></li>
                        <li><a href="#inflation" className="no-underline hover:text-cyan-400">5. The Role of Inflation</a></li>
                        <li><a href="#faq" className="no-underline hover:text-cyan-400">6. Frequently Asked Questions</a></li>
                    </ul>

                    <hr className="border-gray-700 my-8"/>

                    <h3 id="understanding" className="text-2xl font-semibold text-white mt-8 mb-4">1. Understanding the Mechanics of Compound Interest</h3>
                    <p>
                        At its core, interest is the cost of using money. When you borrow money, you pay interest. When you lend money—by depositing it in a bank or investing in bonds—you earn interest. However, not all interest is created equal.
                    </p>
                    <p>
                        <strong>Simple Interest</strong> is calculated only on the principal amount (the initial deposit). If you invest $1,000 at 5% simple interest, you earn $50 every year, regardless of how long the money sits there.
                    </p>
                    <p>
                        <strong>Compound Interest</strong> is different. It is interest on interest. In year one, you earn $50 on your $1,000. In year two, you earn 5% not just on the $1,000, but on $1,050. This means you earn $52.50. This snowball effect accelerates over time. After 30 years, that simple interest account would have earned $1,500 in interest. The compound interest account? It would have earned over $3,321 in interest—more than double the simple return, without you lifting a finger.
                    </p>

                    <h3 id="formula" className="text-2xl font-semibold text-white mt-8 mb-4">2. The Mathematics of Growth</h3>
                    <p>
                        While our calculator handles the heavy lifting instantly, understanding the formula empowers you to grasp the variables at play. The standard formula for compound interest is:
                    </p>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500 my-6">
                        <code className="text-xl font-mono text-purple-300 block text-center">FV = P × (1 + r/n)<sup>(n×t)</sup></code>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                        <li><strong>FV (Future Value):</strong> The amount your investment will be worth after the time period.</li>
                        <li><strong>P (Principal):</strong> Your starting balance.</li>
                        <li><strong>r (Rate):</strong> The annual interest rate (as a decimal).</li>
                        <li><strong>n (Number):</strong> The number of times interest compounds per year.</li>
                        <li><strong>t (Time):</strong> The number of years the money is invested.</li>
                    </ul>
                    <p>
                        The exponent <em>(n×t)</em> is the magic key. Because time is an exponent, doubling the time doesn't just double your money—it multiplies it exponentially. This is why starting early is the most effective investment strategy.
                    </p>

                    <h3 id="frequency" className="text-2xl font-semibold text-white mt-8 mb-4">3. The Impact of Compounding Frequency</h3>
                    <p>
                        You might notice options in our calculator for "Monthly," "Quarterly," or "Daily" compounding. Does it matter? Absolutely.
                    </p>
                    <p>
                        Imagine two investors, Alice and Bob, both investing $10,000 at 8% for 20 years.
                        <br/>
                        Alice chooses a bond that compounds <strong>Annually</strong>. Her final amount: <strong>$46,609</strong>.
                        <br/>
                        Bob puts his money in a high-yield account that compounds <strong>Monthly</strong>. His final amount: <strong>$49,268</strong>.
                    </p>
                    <p>
                        Just by changing the frequency, Bob earned an extra $2,600+. While the difference isn't always massive for short terms, over decades, daily or continuous compounding can add significant value to a portfolio.
                    </p>

                    <h3 id="strategies" className="text-2xl font-semibold text-white mt-8 mb-4">4. Strategic Investing for Long-Term Goals</h3>
                    <p>
                        Knowledge without action is potential, not power. Here is how to apply these concepts:
                    </p>
                    <h4 className="text-xl text-cyan-200 mt-4">The "Start Late" Penalty</h4>
                    <p>
                        Waiting to invest is expensive. To reach $1 million by age 65 (assuming 7% returns):
                        <br />- Starting at age 25 requires investing ~$380/month.
                        <br />- Starting at age 35 requires investing ~$820/month.
                        <br />- Starting at age 45 requires investing ~$1,900/month.
                    </p>
                    <h4 className="text-xl text-cyan-200 mt-4">The Rule of 72</h4>
                    <p>
                        A quick mental shortcut: Divide 72 by your interest rate to see how many years it takes to double your money. At 8% returns, 72 / 8 = 9 years. At 12%, it's just 6 years.
                    </p>

                    <h3 id="inflation" className="text-2xl font-semibold text-white mt-8 mb-4">5. The Silent Erosion: Inflation</h3>
                    <p>
                        When calculating returns, one must not forget inflation. If your investment grows by 5% but inflation is 3%, your "real" purchasing power has only grown by roughly 2%.
                    </p>
                    <p>
                        High-growth assets like stocks (equities) or real estate are typically chosen for long-term horizons because they historically outpace inflation significantly, whereas standard savings accounts often barely keep up. Use our calculator to experiment with different rates—try subtracting 2% or 3% from your expected rate to see what your "inflation-adjusted" future might look like.
                    </p>

                    <h3 id="faq" className="text-2xl font-semibold text-white mt-8 mb-4">6. Frequently Asked Questions (FAQ)</h3>
                    
                    <div className="space-y-6 mt-6">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                            <h4 className="text-lg font-bold text-cyan-400 mb-2">Q: How accurate are these calculations?</h4>
                            <p>A: The mathematics are precise based on the formula used. However, real-world investments fluctuate. The stock market does not return a flat 7% every year; it might be +20% one year and -10% the next. This calculator assumes a constant rate of growth (CAGR).</p>
                        </div>
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                            <h4 className="text-lg font-bold text-cyan-400 mb-2">Q: What is a good interest rate to use?</h4>
                            <p>A: For a conservative estimate of stock market returns (S&P 500), 7-8% is a common standard. For high-yield savings, 3-5% is typical in current economic climates. For bonds, 4-6% is reasonable.</p>
                        </div>
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                            <h4 className="text-lg font-bold text-cyan-400 mb-2">Q: Can I lose money?</h4>
                            <p>A: Yes. All investments carry risk. While the calculator shows positive growth, actual investments in stocks or crypto can go to zero. Never invest money you cannot afford to lose, and diversify your portfolio.</p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-gradient-to-r from-cyan-900 to-blue-900 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">Ready to plan your future?</h3>
                        <p className="mb-4">Scroll up and use the calculator to see your own numbers come to life.</p>
                        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-white text-blue-900 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">Go to Calculator</button>
                    </div>
                </div>

                {!isExpanded && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gray-900/90 to-gray-900 flex items-end justify-center pb-4 rounded-2xl pointer-events-none">
                        {/* Overlay to fade text */}
                    </div>
                )}
            </div>

            <div className="text-center mt-4 relative z-10">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="group flex flex-col items-center justify-center mx-auto text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none"
                >
                    <span className="text-lg font-bold uppercase tracking-widest">{isExpanded ? 'Show Less' : 'Read Full Guide'}</span>
                    <svg 
                        className={`w-6 h-6 mt-2 transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'bounce'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SeoArticle;