import { useState, useMemo, useEffect } from 'react'
import { Module, calculateClassification } from './logic/calculator'
import ModuleList from './components/ModuleList'
import ClassificationDisplay from './components/ClassificationDisplay'
import SEO from './components/SEO'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
    const [modules, setModules] = useState<Module[]>(() => {
        const saved = localStorage.getItem('ou-modules');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('ou-modules', JSON.stringify(modules));
    }, [modules]);

    const addModule = (m: Omit<Module, 'id'>) => {
        const newModule: Module = {
            ...m,
            id: crypto.randomUUID(),
        };
        setModules([...modules, newModule]);
    };

    const removeModule = (id: string) => {
        setModules(modules.filter(m => m.id !== id));
    };

    const updateModule = (id: string, updatedModule: Omit<Module, 'id'>) => {
        setModules(modules.map(m => m.id === id ? { ...updatedModule, id } : m));
    };

    const creditsByLevel = useMemo(() => {
        const l2 = modules.filter(m => m.level === 2).reduce((sum, m) => sum + m.credits, 0);
        const l3 = modules.filter(m => m.level === 3).reduce((sum, m) => sum + m.credits, 0);
        return { level2: l2, level3: l3, total: l2 + l3 };
    }, [modules]);

    const result = useMemo(() => {
        // Only calculate if we have:
        // 1. Total credits between 120-240
        // 2. At least some Level 2 credits
        // 3. At least some Level 3 credits
        if (creditsByLevel.total < 120 || creditsByLevel.total > 240) return null;
        if (creditsByLevel.level2 === 0 || creditsByLevel.level3 === 0) return null;
        return calculateClassification(modules);
    }, [modules, creditsByLevel]);

    return (
        <>
            <SEO />
            <div className="app">
                <header>
                    <motion.div
                        className="header-logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="/favicon.svg" alt="OU Calculator Logo" className="logo-icon" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        OU Class Calculator
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Forecast your Honours Classification
                    </motion.p>
                </header>

                <main>
                    <div className="calculator-layout">
                        <div className="calculator-card main-card">
                            <ModuleList
                                modules={modules}
                                onAddModule={addModule}
                                onRemoveModule={removeModule}
                                onUpdateModule={updateModule}
                            />
                        </div>

                        <div className="results-sidebar">
                            <ClassificationDisplay result={result} creditsByLevel={creditsByLevel} />

                            <div className="info-card">
                                <h3>About this Calculator</h3>
                                <p>
                                    Calculations are based on the official <strong>Working out your class of honours</strong> policy (Sept 2024).
                                </p>
                                <ul>
                                    <li>Level 1 credits are excluded.</li>
                                    <li>L3 modules are double-weighted (best 120).</li>
                                    <li>Pro-rata thresholds applied for reduced credits.</li>
                                </ul>
                                <div className="policy-note">
                                    <p>
                                        <strong>Credit Requirements:</strong> Standard degrees require 240 credits.
                                        Students with 120-240 credits (e.g., due to RPL or transferred credits) can use pro-rata thresholds.
                                    </p>
                                    <a
                                        href="https://help.open.ac.uk/documents/policies/working-out-your-class-of-honours"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="policy-link"
                                    >
                                        View Official OU Policy →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <div className="footer-content">
                        <p>Created by <strong>Sami Bashraheel</strong></p>
                        <p>Currently studying towards BSc Computing & IT (Q62)</p>
                        <div className="footer-links">
                            <a href="https://sami.codes" target="_blank" rel="noopener noreferrer" className="link-with-icon">
                                <Globe size={18} />
                                sami.codes
                            </a>
                            <span className="separator">•</span>
                            <a href="https://twitter.com/_samicodes" target="_blank" rel="noopener noreferrer" className="link-with-icon">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
                                </svg>
                                @_samicodes
                            </a>
                        </div>
                        <p className="not-affiliated">Not affiliated with the <a href="https://www.open.ac.uk" target="_blank" rel="noopener noreferrer" className="ou-link">Open University</a>.</p>
                        <p className="footer-small">© {new Date().getFullYear()} Sami Bashraheel. For illustrative purposes only.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default App
