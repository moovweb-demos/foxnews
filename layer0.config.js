module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.foxnews.com',
      hostHeader: 'www.foxnews.com',
    },
    images: {
      domainOrIp: 'a57.foxnews.com',
      hostHeader: 'a57.foxnews.com',
    },
  },
}
