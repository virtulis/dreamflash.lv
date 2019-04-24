import { ujsx } from 'ujsx';
import { format } from 'url';

const src = {
	protocol: 'https:',
	slashes: true,
	host: 'umap.openstreetmap.fr',
	query: {
		scaleControl: false,
		miniMap: false,
		scrollWheelZoom: false,
		zoomControl: true,
		allowEdit: false,
		moreControl: false,
		datalayersControl: false,
		captionBar: false,
		datalayers: 839781,
		fullscreenControl: true,
		searchControl: false,
		embedControl: false,
	},
	pathname: '/en/map/dreamflash_317794',
};

export const mapIframe = <iframe
	width="100%"
	height="500"
	allowFullScreen
	src={format(src)}
/>;
