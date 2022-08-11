import type { App } from 'vue';
import ECarousel from './src/carousel.vue';

ECarousel.install = (app: App) => {
  app.component(ECarousel.name, ECarousel);
};

export { ECarousel };
export default ECarousel;
