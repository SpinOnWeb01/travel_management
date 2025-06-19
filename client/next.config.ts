import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['127.0.0.1'], // 👈 Allow images from your backend ghar m se koi bhi naa mre jindgi m kbhi bhi 
  },
};

export default nextConfig;
