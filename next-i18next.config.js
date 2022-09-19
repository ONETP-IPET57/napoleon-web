module.exports = {
  debug: process.env.NODE_ENV !== 'production',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  reloadOnPrerender: process.env.NODE_ENV !== 'production',
};
