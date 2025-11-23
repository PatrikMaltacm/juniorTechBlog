let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  }
});

export { app, analytics, db };