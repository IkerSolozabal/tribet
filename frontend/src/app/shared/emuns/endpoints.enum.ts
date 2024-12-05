export enum Endpoints {
    BASE_URL = 'http://localhost:3000/api',
    LOGIN = `${Endpoints.BASE_URL}/auth/login`,
    REGISTER = `${Endpoints.BASE_URL}/auth/register`,
    EVENTS = `${Endpoints.BASE_URL}/events`,
    BET_PROPOSAL = `${Endpoints.BASE_URL}/betsproprosals`,
    USER_INFO = `${Endpoints.BASE_URL}/account`,
    USER_BETS = `${Endpoints.BASE_URL}/account/bets`,
    PLACE_BET = `${Endpoints.BASE_URL}/bets`
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin'
}
