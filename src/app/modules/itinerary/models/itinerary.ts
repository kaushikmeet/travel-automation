export interface DayPlan {
  day: number;

  title?: string;
  description?: string;

  activities: string[];

  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };

  stay?: string;
}

export interface Itinerary {
  _id?: string;
  packageId: string;
  title: string;
  description?: string;
  duration: number;
  days: DayPlan[];
  price?: number;
  isCustom?: boolean;
  createdBy?: string; 
  isActive?: boolean; 
  createdAt?: string;  
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}