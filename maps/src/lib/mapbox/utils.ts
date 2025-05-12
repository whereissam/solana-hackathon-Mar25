import {
  Coffee,
  Utensils,
  ShoppingBag,
  Hotel,
  Dumbbell,
  Landmark,
  Store,
  Banknote,
  GraduationCap,
  Shirt,
  Stethoscope,
  Home,
} from "lucide-react";

// Import iconMap from the new file
import { iconMap } from "./iconMap";

// Re-export iconMap so existing imports still work
export { iconMap };

export type LocationSuggestion = {
  mapbox_id: string;
  name: string;
  place_formatted: string;
  maki?: string;
};

export interface LocationFeature {
  id?: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name?: string;
    name_preferred?: string;
    mapbox_id?: string;
    feature_type?: string;
    full_address?: string;
    address?: string;
    place_formatted?: string;
    context?: {
      country?: {
        name: string;
        country_code: string;
        country_code_alpha_3: string;
      };
      region?: {
        name: string;
        region_code: string;
        region_code_full: string;
      };
      postcode?: { name: string };
      district?: { name: string };
      place?: { name: string };
      locality?: { name: string };
      neighborhood?: { name: string };
      address?: {
        name: string;
        address_number?: string;
        street_name?: string;
      };
      street?: { name: string };
    };
    coordinates?: {
      latitude: number;
      longitude: number;
      accuracy?: string;
      routable_points?: {
        name: string;
        latitude: number;
        longitude: number;
        note?: string;
      }[];
    };
    language?: string;
    maki?: string;
    poi_category?: string[];
    poi_category_ids?: string[];
    brand?: string[];
    brand_id?: string[];
    external_ids?: {
      website?: string;
      [key: string]: any;
    };
    metadata?: Record<string, unknown>;
    bbox?: [number, number, number, number];
    operational_status?: string;
    [key: string]: any;
  };
}
