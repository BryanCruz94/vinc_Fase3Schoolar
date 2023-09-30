/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-leaflet"]); // Reemplaza 'react-leaflet' con el nombre de las bibliotecas que necesitas transpilar

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // basePath: "/seguridadVinculaciontwo",
};

module.exports = withTM(nextConfig);
