export enum Endpoints {
    BASE_URL = 'http://localhost:3000/api',
    LOGIN = `${Endpoints.BASE_URL}/auth/login`,
    REGISTER = `${Endpoints.BASE_URL}/auth/register`,
    EVENTS = `${Endpoints.BASE_URL}/events`,
    USERS = `${Endpoints.BASE_URL}/users`,
    BET_PROPOSAL = `${Endpoints.BASE_URL}/betsproprosals`,
    USER_INFO = `${Endpoints.BASE_URL}/account`,
    USER_BETS = `${Endpoints.BASE_URL}/account/bets`,
    PLACE_BET = `${Endpoints.BASE_URL}/bets`
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin'
}

export enum EventLocations {
  MADRID = 'Madrid',        // Nueva ubicación
  VALENCIA = 'Valencia',    // Nueva ubicación
  TENERIFE = 'Tenerife',    // Nueva ubicación
  RIVAS = 'Rivas',          // Nueva ubicación
  PARQUE_WARNER = 'Parque Warner'
}

export const EventStatusEnum = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished'
};


