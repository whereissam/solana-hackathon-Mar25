# Refactoring Plan for Unify Giving Project

## Data Folder Consolidation

The current project structure has data folders scattered across different component directories. This refactoring plan aims to consolidate all data into a single location for better maintainability.

### Current Structure

```
components/
  About/
    data/
  Charities/
    data/
  Contact/
    data/
  Dashboard/
    data/
  Donate/
    data/
```

### New Structure

```
components/
  data/
    about/
    charities/
    contact/
    dashboard/
    donate/
```

### Implementation Steps

1. ✅ Create a new centralized `data` folder under `components`
2. ✅ Create subdirectories for each component domain
3. ✅ Move data files from component-specific folders to the new structure
4. Update imports in all components to reference the new data location
5. Remove old data folders once migration is complete

### Benefits

- Centralized data management
- Easier maintenance and updates
- Consistent data structure across components
- Simplified imports

## Map Functionality Separation

The Leaflet map functionality is no longer being used but should be preserved for reference. This plan outlines how to separate it into its own project.

### Approach

1. **Create a new project repository**
   - Create a new repository named `unify-giving-maps-legacy`
   - Initialize with the same tech stack (Next.js, React, TypeScript)

2. **Move map-specific code**
   - Copy the following directories and files:
     - `components/Map`
     - `components/Charities/MapMarker.tsx`
     - `components/Charities/MapPopUp.tsx`
     - `components/Charities/MapControls.tsx`
     - `components/Charities/MapSearch.tsx`
     - `components/Charities/MapStyles.tsx`
     - `components/common/MultiLayerMap.tsx`
     - `context/map-context.ts`
     - `lib/mapbox/*`
     - Map-related dependencies in `package.json`

3. **Update package.json**
   - Remove map-specific dependencies from the main project:
     - leaflet
     - leaflet.markercluster
     - react-leaflet
     - @react-leaflet/core
     - @types/leaflet
     - @types/leaflet.markercluster

4. **Documentation**
   - Add clear documentation about the separation
   - Include instructions for running the legacy map project

### Timeline

- Data consolidation: 1-2 days
- Map separation: 2-3 days
- Testing and verification: 1 day

## Next Steps

1. Complete the data folder consolidation
2. Update all component imports to use the new data structure
3. Create the separate map project repository
4. Test both projects to ensure functionality is preserved