module.exports = {
    apps: [
      {
        name: 'app1',
        script: 'dist/index.js',
        watch: true,
        autorestart: true,
        // instances: 4,
        args: '8081 FORK',
      },
      {
        name: 'app2',
        script: 'dist/index.js',
        watch: true,
        autorestart: true,
        // instances: 4,
        args: '8082 CLUSTER',
      },
      {
        script: './service-worker/',
        watch: ['./service-worker'],
      },
    ],
  };