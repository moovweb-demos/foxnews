module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.foxnews.com',
      hostHeader: 'www.foxnews.com',
    },
  },
}
