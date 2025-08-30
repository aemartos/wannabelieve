module.exports = {
  apps: [
    {
      name: 'wannabelieve',
      script: 'npm',
      args: 'run dev',
      instances: 1, // Start with 1 instance for simplicity
      exec_mode: 'fork', // Use fork mode for easier debugging
      // Environment variables
      env_file: '.env',
      // PM2 specific options
      watch: false, // Disable file watching in production
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true, // Add timestamps to logs
      // Restart options
      min_uptime: '10s', // Minimum uptime before considering app stable
      max_restarts: 10, // Maximum restart attempts
      restart_delay: 4000, // Delay between restarts
      // Health check
      health_check_grace_period: 3000 // Grace period for health checks
    }
  ]
};
