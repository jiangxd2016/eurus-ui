import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        {
          type: 'component',
          resolve: (name) => {
            const names = name.slice(1);
            return {
              importName: names,
              path: 'eurus-ui',
              sideEffects: `eurus-ui/dist/es/packages/${names.toLowerCase()}/index.css`,
            };
          },
        },
      ],
      dts: true,
    }),
  ],
});
