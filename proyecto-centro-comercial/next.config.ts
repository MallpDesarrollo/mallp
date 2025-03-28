// @ts-ignore
import type { NextConfig } from "next";
import withPWA from "next-pwa";


const nextConfig = {
  reactStrictMode: true, // ✅ Esto pertenece a Next.js
};

export default withPWA({
  ...nextConfig, // ✅ Pasamos la configuración de Next.js
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});


