export interface Availability {
  date: string;
  date_format: string;
  slots: Slot[];
  weekday: string;
}

export interface Slot {
  ISO_time: string;
  available_vets: Vet[];
  time: string;
}

export interface Vet {
  times: string[];
  vet_id: number;
}

export interface AvailabilityResponse {
  items: Availability[];
}
