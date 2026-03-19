export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'fas fa-chart-line',
    route: '/dashboard',
    roles: ['admin', 'agent', 'user'],
  },
  {
    label: 'Users',
    icon: 'fas fa-users',
    route: '/users',
    roles: ['admin'],
  },
  {
    label: 'Packages',
    icon: 'fas fa-suitcase-rolling',
    route: '/packages/package-list',
    roles: ['admin', 'agent'],
  },
  {
    label: 'Destinations',
    icon: 'fas fa-map-marker-alt',
    route: '/destinations/destination-list',
    roles: ['admin'],
  },
  {
    label: 'Itinerary',
    icon: 'fas fa-route',
    route: '/itinerary/itinenary-page',
    roles: ['admin', 'user'],
  },
  {
    label: 'Bookings',
    icon: 'fas fa-book-open',
    route: '/bookings',
    roles: ['admin', 'agent', 'user'],
  },
  {
    label: 'Reviews',
    icon: 'fas fa-star',
    route: '/reviews',
    roles: ['admin', 'user'],
  },
  {
    label: 'Payments',
    icon: 'fas fa-credit-card',
    route: '/payments',
    roles: ['admin'],
  }
];