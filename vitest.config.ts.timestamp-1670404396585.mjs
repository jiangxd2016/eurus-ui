// vitest.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/xd/Documents/www/eurus-ui/node_modules/.pnpm/vitest@0.25.4_4p2q4kownwn34nmyur4w4cbbre/node_modules/vitest/dist/config.js";
import Vue from "file:///Users/xd/Documents/www/eurus-ui/node_modules/.pnpm/@vitejs+plugin-vue@3.2.0_vite@3.2.5+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Jsx from "file:///Users/xd/Documents/www/eurus-ui/node_modules/.pnpm/@vitejs+plugin-vue-jsx@2.1.1_vite@3.2.5+vue@3.2.45/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var dirname = resolve();
var vitest_config_default = defineConfig({
  resolve: {
    alias: {
      "@/": `${resolve(dirname, "src")}/`
    }
  },
  define: {
    __DEV__: true
  },
  plugins: [Vue(), Jsx()],
  test: {
    include: ["**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    coverage: {
      provider: "c8",
      exclude: ["index.ts"],
      reporter: ["text", "json", "html"]
    },
    globals: true,
    environment: "happy-dom",
    watch: false
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy94ZC9Eb2N1bWVudHMvd3d3L2V1cnVzLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveGQvRG9jdW1lbnRzL3d3dy9ldXJ1cy11aS92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy94ZC9Eb2N1bWVudHMvd3d3L2V1cnVzLXVpL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5jb25zdCBkaXJuYW1lID0gcmVzb2x2ZSgpO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQC8nOiBgJHtyZXNvbHZlKGRpcm5hbWUsICdzcmMnKX0vYCxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX0RFVl9fOiB0cnVlLFxuICB9LFxuICBwbHVnaW5zOiBbVnVlKCksIEpzeCgpXSxcbiAgdGVzdDoge1xuICAgIGluY2x1ZGU6IFsnKiovX190ZXN0c19fLyoue3Rlc3Qsc3BlY30ue2pzLG1qcyxjanMsdHMsbXRzLGN0cyxqc3gsdHN4fSddLFxuICAgIHRyYW5zZm9ybU1vZGU6IHtcbiAgICAgIHdlYjogWy9cXC5banRdc3gkL10sXG4gICAgfSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICdjOCcsXG4gICAgICBleGNsdWRlOiBbJ2luZGV4LnRzJ10sXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCddLFxuICAgIH0sXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXG4gICAgd2F0Y2g6IGZhbHNlXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsU0FBUyxlQUFlO0FBQzlTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsSUFBTSxVQUFVLFFBQVE7QUFDeEIsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLFFBQVEsU0FBUyxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN0QixNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsNERBQTREO0FBQUEsSUFDdEUsZUFBZTtBQUFBLE1BQ2IsS0FBSyxDQUFDLFdBQVc7QUFBQSxJQUNuQjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLFVBQVU7QUFBQSxNQUNwQixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxJQUNuQztBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLEVBQ1Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
