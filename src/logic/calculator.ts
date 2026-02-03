export type Grade = 1 | 2 | 3 | 4;

export interface Module {
    id: string;
    name: string;
    level: 2 | 3;
    credits: number;
    grade: Grade;
}

export type Classification = '1st' | '2:1' | '2:2' | '3rd' | 'Fail';

export interface CalculationResult {
    weightedScore: number;
    qaScore: number;
    classification: Classification;
    wgpsClass: Classification;
    qaClass: Classification;
}

/**
 * OU Degree Classification thresholds (for standard 240 credits)
 * Thresholds scale pro-rata for reduced credits.
 */
const THRESHOLDS_TABLE_3 = [
    { credits: 240, '1st': 630, '2:1': 900, '2:2': 1170, '3rd': 1440 },
    { credits: 210, '1st': 577.5, '2:1': 825, '2:2': 1072.5, '3rd': 1320 },
    { credits: 180, '1st': 525, '2:1': 750, '2:2': 975, '3rd': 1200 },
    { credits: 150, '1st': 472.5, '2:1': 675, '2:2': 877.5, '3rd': 1080 },
    { credits: 120, '1st': 420, '2:1': 600, '2:2': 780, '3rd': 960 },
];

const THRESHOLDS_TABLE_4 = [
    { credits: 240, qa: 60 },
    { credits: 210, qa: 60 },
    { credits: 180, qa: 60 },
    { credits: 150, qa: 60 },
    { credits: 120, qa: 30 },
];

function getThresholdsForCredits(totalCredits: number) {
    // Find the closest match or interpolate
    const t3 = THRESHOLDS_TABLE_3.find(t => t.credits === totalCredits) ||
        THRESHOLDS_TABLE_3[0]; // Default to 240 if not found for now

    const t4 = THRESHOLDS_TABLE_4.find(t => t.credits === totalCredits) ||
        THRESHOLDS_TABLE_4[0];

    return { t3, t4 };
}

export function calculateClassification(modules: Module[]): CalculationResult {
    const l2Modules = modules.filter(m => m.level === 2);
    const l3Modules = modules.filter(m => m.level === 3);

    const totalCredits = modules.reduce((sum, m) => sum + m.credits, 0);
    const { t3, t4 } = getThresholdsForCredits(totalCredits);

    // 1. Determine "Best 120 L3 credits" (or all L3 if less) for double weighting
    // Sort L3 modules by grade (lower is better: Distinction = 1)
    const sortedL3 = [...l3Modules].sort((a, b) => a.grade - b.grade);

    let doubleWeightedCredits = 0;
    const doubleWeighted: { credits: number, grade: number }[] = [];
    const singleWeighted: { credits: number, grade: number }[] = [];

    for (const m of sortedL3) {
        if (doubleWeightedCredits < 120) {
            const remainingForDouble = 120 - doubleWeightedCredits;
            const amountToDouble = Math.min(m.credits, remainingForDouble);
            const amountToSingle = m.credits - amountToDouble;

            doubleWeighted.push({ credits: amountToDouble, grade: m.grade });
            if (amountToSingle > 0) {
                singleWeighted.push({ credits: amountToSingle, grade: m.grade });
            }
            doubleWeightedCredits += amountToDouble;
        } else {
            singleWeighted.push({ credits: m.credits, grade: m.grade });
        }
    }

    // Add all L2 modules to single weighted
    for (const m of l2Modules) {
        singleWeighted.push({ credits: m.credits, grade: m.grade });
    }

    // 2. Calculate Weighted Grade Point Score (WGPS)
    // WGPS = (Credits * Grade * Weight)
    const wgScore = doubleWeighted.reduce((sum, m) => sum + (m.credits * m.grade * 2), 0) +
        singleWeighted.reduce((sum, m) => sum + (m.credits * m.grade * 1), 0);

    // 3. Calculate Quality Assurance (QA) score
    // QA = best X L3 credits (where X is from Table 4)
    let qaCreditsTarget = t4.qa;
    let qaCredits = 0;
    let qaScore = 0;
    for (const m of sortedL3) {
        const amountForQA = Math.min(m.credits, qaCreditsTarget - qaCredits);
        if (amountForQA > 0) {
            qaScore += amountForQA * m.grade;
            qaCredits += amountForQA;
        }
    }

    // 4. Determine Classification
    const getWGPSClass = (score: number): Classification => {
        if (score <= t3['1st']) return '1st';
        if (score <= t3['2:1']) return '2:1';
        if (score <= t3['2:2']) return '2:2';
        if (score <= t3['3rd']) return '3rd';
        return 'Fail';
    };

    const getQAClass = (score: number): Classification => {
        // QA threshold is based on credits at required grade or better
        // For QA score (credits * grade), the threshold is (qaCreditsTarget * grade)
        if (score <= qaCreditsTarget * 1) return '1st';
        if (score <= qaCreditsTarget * 2) return '2:1';
        if (score <= qaCreditsTarget * 3) return '2:2';
        // No QA test for 3rd class
        return '3rd';
    };

    const wgpsClass = getWGPSClass(wgScore);
    const qaClass = getQAClass(qaScore);

    // Lower of two rule
    const classes: Classification[] = ['1st', '2:1', '2:2', '3rd', 'Fail'];
    const finalClass = classes[Math.max(classes.indexOf(wgpsClass), classes.indexOf(qaClass))];

    return {
        weightedScore: wgScore,
        qaScore,
        classification: finalClass,
        wgpsClass,
        qaClass
    };
}
