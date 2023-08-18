export interface NasaApiResponse {
  links: PaginationLinks;
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
}

export interface PaginationLinks {
  next: string;
  previous?: string;
  self: string;
}

export interface NearEarthObject {
  links: PaginationLinks;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}
export interface EstimatedDiameter {
  kilometers: DiameterRange;
  meters: DiameterRange;
  miles: DiameterRange;
  feet: DiameterRange;
}

export interface DiameterRange {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: RelativeVelocity;
  miss_distance: MissDistance;
  orbiting_body: string;
}

export interface RelativeVelocity {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
}

export interface MissDistance {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
}
