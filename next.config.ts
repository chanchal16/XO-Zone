import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.multiavatar.com",
        port: "",
        pathname: "/**", // Allow all paths under api.dicebear.com
      },
      {
        protocol:'https',
        hostname: 'api.dicebear.com',
        port:'',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
