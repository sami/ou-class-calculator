import React from 'react';
import { Helmet } from 'react-helmet-async';
import { structuredData } from '../utils/structuredData';

interface SEOProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'OU Class Calculator | Forecast Your Honours Classification',
    description = 'Calculate your forecasted Open University honours degree classification. Based on official OU policy with support for pro-rata thresholds. Created by Sami Bashraheel.',
    canonicalUrl = 'https://ou-calculator.sami.codes',
    ogImage = 'https://ou-calculator.sami.codes/og-image.png'
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="OU Class Calculator" />
            <meta property="og:locale" content="en_GB" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />
            <meta property="twitter:creator" content="@_samicodes" />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
