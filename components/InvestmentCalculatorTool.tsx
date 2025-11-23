import React, { useState } from 'react';
import { calculateCompoundInterest, CalculationResult } from '../utils/FinancialMath';

const InvestmentCalculatorTool: React.FC = () => {
    const [principal, setPrincipal] = useState<string>('10000');
    const [rate, setRate] = useState<string>('7');
    const [years, setYears] = useState<string>('15');
    const [compoundsPerYear, setCompoundsPerYear] = useState<number>(12);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [error, setError] = useState<string>('');

    const handleCalculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(years);
        
        if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || r < 0 || t <= 0) {
            setError('Please enter valid, positive numbers for all fields.');
            setResult(null);
            return;
        }
        
        setError('');
        const calculation = calculateCompoundInterest(p, r, t, compoundsPerYear);
        setResult(calculation);
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    // Calculate percentages for the chart
    const principalPercentage = result ? (result.principal / result.futureValue) * 100 : 100;
    const interestPercentage = result ? (result.totalInterest / result.futureValue) * 100 : 0;

    return (
        <div className="max-w-6xl mx-auto p-1 relative z-10">
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col md:flex-row">
                
                {/* Input Section */}
                <div className="w-full md:w-5/12 p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-700">
                    <h2 className="text-3xl font-extrabold mb-2 text-white">Investment Plan</h2>
                    <p className="text-gray-400 mb-8 text-sm">Define your strategy and see the magic happen.</p>
                    
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2" htmlFor="principal">Initial Investment ($)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">$</span>
                                <input type="number" id="principal" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none font-mono text-lg group-hover:border-gray-500" placeholder="0" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2" htmlFor="rate">Interest Rate (%)</label>
                                <div className="relative">
                                    <input type="number" id="rate" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none font-mono text-lg group-hover:border-gray-500" placeholder="7" />
                                    <span className="absolute right-4 top-3.5 text-gray-400">%</span>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2" htmlFor="years">Duration (Years)</label>
                                <input type="number" id="years" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none font-mono text-lg group-hover:border-gray-500" placeholder="10" />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2" htmlFor="compounding">Compounding Frequency</label>
                            <div className="relative">
                                <select id="compounding" value={compoundsPerYear} onChange={e => setCompoundsPerYear(Number(e.target.value))} className="w-full bg-gray-900 border border-gray-600 rounded-xl py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none text-lg cursor-pointer group-hover:border-gray-500">
                                    <option value={1}>Annually (1x/Year)</option>
                                    <option value={2}>Semi-Annually (2x/Year)</option>
                                    <option value={4}>Quarterly (4x/Year)</option>
                                    <option value={12}>Monthly (12x/Year)</option>
                                    <option value={365}>Daily (365x/Year)</option>
                                </select>
                                <div className="absolute right-4 top-4 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">{error}</div>}

                    <button onClick={handleCalculate} className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-200 active:scale-95">
                        Calculate Future Value
                    </button>
                </div>
                
                {/* Result Section */}
                <div className="w-full md:w-7/12 bg-gray-900/50 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
                     {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    {result ? (
                        <div className="relative z-10 animate-fadeIn">
                            <div className="text-center mb-10">
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-2">Total Future Value</h3>
                                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-200 drop-shadow-sm">
                                    {formatCurrency(result.futureValue)}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                                {/* Donut Chart */}
                                <div className="flex justify-center">
                                    <div className="relative w-48 h-48 rounded-full shadow-2xl shadow-black/50" 
                                         style={{ 
                                             background: `conic-gradient(#06b6d4 ${principalPercentage}%, #9333ea ${principalPercentage}% 100%)`
                                         }}>
                                        <div className="absolute inset-0 m-4 bg-gray-900 rounded-full flex flex-col items-center justify-center z-10">
                                            <span className="text-xs text-gray-400 uppercase">Growth</span>
                                            <span className="text-2xl font-bold text-white">+{interestPercentage.toFixed(0)}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-4">
                                    <div className="bg-gray-800/80 p-4 rounded-xl border-l-4 border-cyan-500 flex justify-between items-center hover:bg-gray-800 transition-colors">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">Principal</p>
                                            <p className="text-lg font-semibold text-white">Your Money</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-mono text-cyan-400">{formatCurrency(result.principal)}</p>
                                            <p className="text-xs text-gray-500">{principalPercentage.toFixed(1)}%</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/80 p-4 rounded-xl border-l-4 border-purple-600 flex justify-between items-center hover:bg-gray-800 transition-colors">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold">Interest</p>
                                            <p className="text-lg font-semibold text-white">Compound Growth</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-mono text-purple-400">{formatCurrency(result.totalInterest)}</p>
                                            <p className="text-xs text-gray-500">{interestPercentage.toFixed(1)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4 animate-pulse">
                            <div className="w-20 h-20 rounded-full border-4 border-gray-700 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            <p className="max-w-xs text-sm">Enter your investment details on the left to visualize your potential wealth.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentCalculatorTool;