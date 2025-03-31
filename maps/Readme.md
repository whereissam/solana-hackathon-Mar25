# Unify Giving Project - Next.js & Leaflet Starter Kit

An extensible [Next.js](https://nextjs.org/) starter kit built with [react-leaflet](https://react-leaflet.js.org/) for interactive mapping features. Designed specifically for the **Unify Giving Project**, this template creates beautiful, responsive maps enhanced with [Tailwind CSS](https://tailwindcss.com/) and [Lucide Icons](https://lucide.dev/). ✨

Setup powered by [TypeScript](https://www.typescriptlang.org/) for robust type safety and enhanced developer experience. 👐

## Features

- 🏇 Next.js 14 with React-Leaflet integration
  - 😏 TypeScript + strict lint setup
  - 🔗 Next.js App Router-ready navigation
  - 🗺️ Donation and volunteer opportunity mapping
  - 🌤 Modular components for easy customization
  - 🐛 Custom marker icons for different giving categories
  - 📄 Interactive marker popups with donation/volunteer information
  - 📚 Categorized markers for different types of giving opportunities
  - 🫧 Marker clustering by category with color-coded icons and count bubbles
  - ⚓️ Custom hooks for accessing marker data and map context
  - 🏡 Specialized UI components (locate me, center on giving opportunities)
  - 💖 Giving-focused components (donation forms, volunteer signup)

## Getting Started

### 🏎 Getting Started

#### 💣 Breaking Changes introduced > v0.1.1

In Version v0.1.2, we changed the path aliases to be more consistent with the ES standards from `@alias` to `#alias`. If pulling the template from v0.1.1 you have to change the import paths in your components and pages.

```diff
- import { SomeComponent } from '@components/useMap'
+ import { SomeComponent } from '#components/useMap'
```

#### ⛴ Clone & Deploy with Github and Vercel

Create new Github repo with Vercel and deploy it within minutes. Could not be easier as hitting some buttons. Shipping of private repos is possible.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Funify-giving%2Fnext-leaflet-giving-starter)

Later: Check out your repo locally and run ```npm install``` or ```yarn``` in root

Follow Instructions for [Starting Up](#start-up)

#### ⚙️ Manual install

```bash
git clone https://github.com/unify-giving/next-leaflet-giving-starter
# then
cd next-leaflet-giving-starter
npm install
# or
yarn
```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Build Locally

```bash
npm run start
# or
yarn start
```

## Project Structure

```
/
├── public/              # Static assets
│
├── src/
│   │
│   ├── components/      # React components
│   │   ├── map/         # Map-related components
│   │   └── ui/          # UI components
│   │   └── TopBar/
│   │   └── common/
│   │
│   ├── lib/             # Utility functions
│   │   └── helper/
│   │
│   └── pages/            # Sample pages for giving opportunities
│       └── map/
├── styles/              # Global styles
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## Map Features

### Giving Opportunity Markers

The map displays various giving opportunities with custom markers based on their category:

- 💰 Monetary Donations
- 🍲 Food Donations
- 👕 Clothing Donations
- 🏠 Shelter Support
- 🧸 Toy Donations
- 👩‍👦 Family Support
- 🧑‍🤝‍🧑 Volunteer Opportunities

### Interactive Popups

Click on any marker to display detailed information about the giving opportunity:

- Organization name
- Description
- Contact information
- Website link
- Donation/volunteer options

### Marker Clustering

Markers are automatically clustered when zoomed out to improve map readability. Clusters are color-coded based on the category of markers they contain, with a count bubble showing the number of opportunities.

### Custom UI Controls

- 📍 "Locate Me" button to center the map on the user's location
- 🔍 "View All Opportunities" button to fit all markers in the viewport
- 🔢 Category filters to show/hide specific types of giving opportunities

## Customization

### Adding New Giving Opportunities

Add new giving opportunities by modifying the data in `src/data/givingOpportunities.ts`:

```typescript
export const givingOpportunities = [
  {
    id: "1",
    name: "Local Food Bank",
    category: "food",
    position: [40.7128, -74.0060],
    description: "Accepting food donations for local families in need",
    contact: "contact@foodbank.org",
    website: "https://localfoodbank.org",
    needs: ["Canned goods", "Pasta", "Rice", "Baby food"]
  },
  // Add more opportunities here
];
```

### Customizing Marker Icons

Customize marker icons by adding new SVG files to the `public/markers/` directory and updating the `getMarkerIcon` function in `src/lib/markers.ts`.

## Coming Soon

- 📱 Mobile-optimized donation flows
- 🔄 Real-time updates for urgent needs
- 📊 Donation impact visualization
- 📝 Volunteer signup forms
- 🔗 Social sharing features
- 🧩 Integration with donation payment processors
- 🌐 Multi-language support

## Contributing

We welcome contributions to the Unify Giving Project! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Happy giving! ✌️💖
