export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allUsers: '/user',
      oneUser: '/user/:id',
      allRides: "/drive",
      oneRide: "/drive/:id"
    }
  }
};
