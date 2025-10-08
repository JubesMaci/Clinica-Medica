const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*', // o backend continua aqui
      },
    ];
  },
  allowedDevOrigins: ['http://localhost:3000'],
};

export default nextConfig;
