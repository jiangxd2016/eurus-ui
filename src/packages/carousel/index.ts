import type { App } from 'vue';
import ECarousel from './src';
import ECarouselItem from './src/carousel-item';

ECarousel.install = (app: App) => {
  app.component(ECarousel.name, ECarousel);
  app.component(ECarouselItem.name, ECarouselItem);
};

export { ECarousel, ECarouselItem };
export default ECarousel;
