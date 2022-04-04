module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'rails server -e production',
      numberOfRuns: 1,
    },
    upload: {
      startServerCommand: 'yarn start',
      target: 'temporary-public-storage',
    },
  },
}
