# Common Data Folder

This folder contains all data files consolidated from various component-specific data folders. The structure is organized by component domain to maintain clear separation of concerns while providing a centralized location for all data.

## Structure

- `/about` - Data related to About pages
- `/charities` - Data related to Charities functionality
- `/contact` - Data related to Contact pages
- `/dashboard` - Data related to Dashboard functionality
- `/donate` - Data related to Donation functionality

## Benefits

- Centralized data management
- Easier maintenance and updates
- Consistent data structure across components
- Simplified imports

## Usage

Import data from this centralized location instead of component-specific data folders:

```typescript
// Old way
import { teamData } from '../components/About/data/data';

// New way
import { teamData } from '../components/data/about/data';
```

## Map Functionality Note

The map functionality using Leaflet has been preserved but separated from the main application structure. It is maintained for reference but is no longer actively used in the application.