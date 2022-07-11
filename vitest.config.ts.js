// vitest.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';
const dirname = resolve();
const vitest_config_default = defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(dirname, 'src')}/`
    }
  },
  plugins: [Vue(), Jsx()],
  test: {
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    coverage: {
      exclude: ['index.ts']
    },
    globals: true,
    environment: 'happy-dom',
    watch: false
  }
});
export {
  vitest_config_default as default
};
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuY29uc3QgZGlybmFtZSA9IHJlc29sdmUoKTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AvJzogYCR7cmVzb2x2ZShkaXJuYW1lLCAnc3JjJyl9L2AsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1Z1ZSgpLCBKc3goKV0sXG4gIHRlc3Q6IHtcbiAgICB0cmFuc2Zvcm1Nb2RlOiB7XG4gICAgICB3ZWI6IFsvXFwuW2p0XXN4JC9dLFxuICAgIH0sXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIGV4Y2x1ZGU6IFsnaW5kZXgudHMnXVxuICAgIH0sXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXG4gICAgd2F0Y2g6IGZhbHNlXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU0sVUFBVSxRQUFRO0FBQ3hCLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxRQUFRLFNBQVMsS0FBSztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN0QixNQUFNO0FBQUEsSUFDSixlQUFlO0FBQUEsTUFDYixLQUFLLENBQUMsV0FBVztBQUFBLElBQ25CO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUFTLENBQUMsVUFBVTtBQUFBLElBQ3RCO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
