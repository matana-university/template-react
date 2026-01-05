module.exports = {
  apps: [
    {
      name: "react-app",
      script: "node_modules/.bin/serve",
      args: "dist -s -l 3000",
      cwd: "/www/wwwroot/s2-mm",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
