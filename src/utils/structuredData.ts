export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "OU Class Calculator",
            "url": "https://ou-calculator.sami.codes",
            "description": "Calculate your forecasted Open University honours degree classification based on official OU policy. Supports pro-rata thresholds for reduced credits (120-240).",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP"
            },
            "creator": {
                "@type": "Person",
                "name": "Sami Bashraheel",
                "url": "https://sami.codes",
                "sameAs": [
                    "https://twitter.com/_samicodes"
                ]
            },
            "datePublished": "2026-02-03",
            "inLanguage": "en-GB",
            "isAccessibleForFree": true,
            "keywords": "OU, Open University, degree calculator, honours classification, education, UK university"
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://ou-calculator.sami.codes"
                }
            ]
        },
        {
            "@type": "Organization",
            "name": "Sami Bashraheel",
            "url": "https://sami.codes",
            "logo": "https://ou-calculator.sami.codes/icon-512.png",
            "sameAs": [
                "https://twitter.com/_samicodes"
            ]
        }
    ]
};
