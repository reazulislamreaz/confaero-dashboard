// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//     host: "3.150.217.155",
//     port: 5000,
//     allowedHosts: "all",
//     // allowedHosts: [
//     //   'sayedbro3060.syedbipul.me',
//     //   'reazul3060.suplify.life'
//     // ],
//     open: true,
//   },
//   //   server: {
//   //   host: '0.0.0.0',
//   //   port: 3060,
//   //   allowedHosts: 'all'
//   // }
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("/react/")
          ) {
            return "react-vendor";
          }
          if (id.includes("@reduxjs")) {
            return "redux";
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "confaero.com",
      "www.confaero.com",
      "reazul3060.suplify.life",
    ],
  },
});
