import React from 'react';
import { CalculationResult } from '../logic/calculator';
import { Award, Target, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClassificationDisplayProps {
    result: CalculationResult | null;
    creditsByLevel: {
        level2: number;
        level3: number;
        total: number;
    };
}

const ClassificationDisplay: React.FC<ClassificationDisplayProps> = ({ result, creditsByLevel }) => {
    // Show placeholder when credits aren't met
    if (!result) {
        const { level2, level3, total } = creditsByLevel;

        let message = "";
        if (total === 0) {
            message = "Start by adding your Level 2 and Level 3 modules to see your forecasted classification.";
        } else if (level2 === 0 && level3 === 0) {
            message = "Add both Level 2 and Level 3 modules to calculate your classification.";
        } else if (level2 === 0) {
            message = `You have ${level3} Level 3 credits. Add Level 2 modules to see your forecast.`;
        } else if (level3 === 0) {
            message = `You have ${level2} Level 2 credits. Add Level 3 modules to see your forecast.`;
        } else if (total < 120) {
            message = `You have ${total} credits (L2: ${level2}, L3: ${level3}). Add at least ${120 - total} more credits to see your forecast.`;
        } else if (total > 240) {
            message = `You have ${total} credits, which exceeds the maximum of 240. Please review your modules.`;
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="result-display"
            >
                <div className="classification-card placeholder-card">
                    <div className="placeholder-content">
                        <AlertCircle size={48} color="rgba(255, 255, 255, 0.3)" />
                        <h3>Add Your Modules</h3>
                        <p>{message}</p>
                        <div className="credit-breakdown">
                            <div className="credit-item">
                                <span className="credit-label">Level 2:</span>
                                <span className="credit-value">{level2} credits</span>
                            </div>
                            <div className="credit-item">
                                <span className="credit-label">Level 3:</span>
                                <span className="credit-value">{level3} credits</span>
                            </div>
                            <div className="credit-item total">
                                <span className="credit-label">Total:</span>
                                <span className="credit-value">{total} credits</span>
                            </div>
                        </div>
                        <div className="credit-requirement">
                            <strong>Required:</strong> 120-240 credits total (both L2 and L3)
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    const getClassColor = (cls: string) => {
        switch (cls) {
            case '1st': return '#8b5cf6';
            case '2:1': return '#ec4899';
            case '2:2': return '#06b6d4';
            case '3rd': return '#f59e0b';
            default: return '#ef4444';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-display"
        >
            <div className="classification-card">
                <div className="classification-header">
                    <Award size={48} color={getClassColor(result.classification)} />
                    <div>
                        <h3>Forecasted Honours Class</h3>
                        <h2 style={{ color: getClassColor(result.classification) }}>
                            {result.classification}
                        </h2>
                    </div>
                </div>

                <div className="tests-status">
                    <div className="test-item">
                        <div className="test-header">
                            <Target size={18} />
                            <span>Weighted Grade Point Score (WGPS)</span>
                            <span className="test-badge" style={{ backgroundColor: getClassColor(result.wgpsClass) }}>
                                {result.wgpsClass}
                            </span>
                        </div>
                        <div className="score-val">{result.weightedScore}</div>
                        <p className="score-desc">Based on best 120 L3 credits (double-weighted) and remaining 120 credits.</p>
                    </div>

                    <div className="test-item">
                        <div className="test-header">
                            <Target size={18} />
                            <span>Quality Assurance (QA) Test</span>
                            <span className="test-badge" style={{ backgroundColor: getClassColor(result.qaClass) }}>
                                {result.qaClass}
                            </span>
                        </div>
                        <div className="score-val">{result.qaScore}</div>
                        <p className="score-desc">Based on best 60 L3 credits. Must meet the required threshold for your class.</p>
                    </div>
                </div>

                <div className="rule-note">
                    <Info size={16} />
                    <p>
                        <strong>Lower of Two Rule:</strong> Your final classification is determined by the lower
                        of your WGPS and QA results.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ClassificationDisplay;
