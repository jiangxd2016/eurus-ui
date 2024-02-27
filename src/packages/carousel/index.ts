import ECarousel from './src';
import ECarouselItem from './src/carousel-item';
import type { App } from 'vue';

ECarousel.install = (app: App) => {
	app.component(ECarousel.name, ECarousel);
	app.component(ECarouselItem.name, ECarouselItem);
};

export { ECarousel, ECarouselItem };
export default ECarousel;
