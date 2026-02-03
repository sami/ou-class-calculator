# OU Class Calculator

A premium, client-side degree classification calculator for Open University students. Calculate your forecasted honours classification based on the official OU policy (September 2024).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)

## Features

- ✅ **Accurate Calculations** - Implements official OU Honours Classification policy (Sept 2024)
- ✅ **Pro-rata Support** - Handles reduced credit loads (120-240 credits) with adjusted thresholds
- ✅ **Premium Design** - Dark-themed UI with glassmorphism and smooth animations
- ✅ **Privacy First** - All calculations performed client-side, data stored locally
- ✅ **Inline Editing** - Edit modules without deleting and re-adding
- ✅ **SEO Optimized** - Comprehensive meta tags, structured data, and PWA support
- ✅ **Responsive** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Vanilla CSS with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React (MIT licensed)
- **Build Tool**: Vite
- **SEO**: react-helmet-async

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/samibashraheel/ou-class-calculator.git
cd ou-class-calculator

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## How It Works

The calculator implements the OU's official honours classification algorithm:

1. **WGPS (Weighted Grade Point Score)**: Best 120 L3 credits (double-weighted) + remaining 120 credits
2. **QA (Quality Assurance) Test**: Best 60 L3 credits must meet threshold
3. **Lower of Two Rule**: Final classification is the lower of WGPS and QA results

### Pro-rata Thresholds

Students with 120-240 credits (e.g., due to RPL or transferred credits) can use adjusted thresholds that scale proportionally.

## Project Structure

```
src/
├── components/          # React components
│   ├── ClassificationDisplay.tsx
│   ├── ModuleList.tsx
│   └── SEO.tsx
├── logic/              # Calculation logic
│   └── calculator.ts
├── utils/              # Utilities
│   └── structuredData.ts
├── App.tsx             # Main app component
├── App.css             # Styles
└── main.tsx            # Entry point
```

## Credits

- **Icon**: [Lucide Icons](https://lucide.dev/icons/graduation-cap) (ISC License)
- **Policy**: [OU Honours Classification Policy](https://help.open.ac.uk/documents/policies/working-out-your-class-of-honours) (September 2024)

## License

MIT License - see LICENSE file for details

## Disclaimer

This calculator is not affiliated with the Open University. It is provided for illustrative purposes only. Always refer to the official OU policy for definitive information.

## Author

**Sami Bashraheel**  
Currently studying towards BSc Computing & IT (Q62)

- Website: [sami.codes](https://sami.codes)
- Twitter: [@_samicodes](https://twitter.com/_samicodes)

---

Made with ❤️ for OU students
