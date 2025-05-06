# Map Functionality Separation Guide

## Overview

This document provides detailed instructions for separating the Leaflet map functionality into a standalone project. Since the map functionality is no longer being used in the main application but should be preserved for reference, this guide outlines the steps to create a separate project that maintains all map-related code.

## Prerequisites

- Git installed on your system
- Node.js and npm installed
- Basic knowledge of Next.js and React

## Step 1: Create a New Repository

1. Create a new repository on GitHub or your preferred Git hosting service named `unify-giving-maps-legacy`
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/unify-giving-maps-legacy.git
   cd unify-giving-maps-legacy
   ```

## Step 2: Initialize the Project

1. Initialize a new Next.js project:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint
   ```

2. Install map-specific dependencies:
   ```bash
   npm install leaflet@1.9.4 leaflet.markercluster@1.5.3 react-leaflet@4.2.1 @react-leaflet/core@2.1.0
   npm install --save-dev @types/leaflet@1.9.8 @types/leaflet.markercluster@1.5.4
   ```

## Step 3: Copy Map-Related Files

Copy the following files and directories from the original project to the new repository:

### Components

- `src/components/Map/` (entire directory)
- `src/components/Charities/MapMarker.tsx`
- `src/components/Charities/MapPopUp.tsx`
- `src/components/Charities/MapControls.tsx`
- `src/components/Charities/MapSearch.tsx`
- `src/components/Charities/MapStyles.tsx`
- `src/components/common/MultiLayerMap.tsx`
- `src/components/location-marker.tsx`
- `src/components/location-popup.tsx`

### Context and Hooks

- `src/context/map-context.ts`
- `src/hooks/useDebounce.ts` (if used by map components)

### Library Files

- `src/lib/mapbox/` (entire directory)
- `src/lib/MarkerCategories.ts`
- `src/lib/Places.ts`
- Any other map-related utility files

### Data

- `src/components/data/charities/data.ts` (for map markers)

### Pages

- `src/pages/map/index.tsx`
- `src/pages/charities/index.tsx` (if it contains map functionality)

## Step 4: Update Configuration Files

1. Update `next.config.js` to include any necessary configurations for the map functionality
2. Update `tailwind.config.js` to include any map-specific styles
3. Update `package.json` with appropriate project name and description

## Step 5: Create a README

Create a comprehensive README.md file that explains:

- The purpose of this repository (legacy map functionality)
- How to set up and run the project
- The relationship to the main Unify Giving project
- That this is for reference purposes only

## Step 6: Testing

1. Run the project locally to ensure all map functionality works:
   ```bash
   npm run dev
   ```

2. Test all map features:
   - Map rendering
   - Markers and popups
   - Search and filtering
   - Layer controls

## Step 7: Deployment (Optional)

If you want to deploy the map project for reference:

1. Deploy to Vercel or another hosting service
2. Document the deployment URL in the main project's documentation

## Removing Map Dependencies from Main Project

After successfully creating the separate map project, you can remove these dependencies from the main project:

```bash
npm uninstall leaflet leaflet.markercluster react-leaflet @react-leaflet/core
npm uninstall --save-dev @types/leaflet @types/leaflet.markercluster
```

Update the `package.json` file to remove these dependencies.

## Conclusion

By following this guide, you'll have successfully separated the Leaflet map functionality into its own project, preserving it for reference while allowing the main project to move forward without these dependencies.

The data consolidation that has already been completed will make it easier to maintain both projects, as the data structure is now more organized and centralized.