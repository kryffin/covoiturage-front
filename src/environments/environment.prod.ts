export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allUsers: '/user',
      oneUser: '/user/:id',
      allRides: '/drive',
      oneRide: '/drive/:id',
      locateride: '/fulldrive/:begin/:end'
    }
  }
};
