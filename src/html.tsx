import { ujsx, ujsxToHTML } from 'ujsx';
import { forEachLang, languages } from './i18n';
import { dudeRef, fbIcon, secretDude } from './svg/svg';
import { mapIframe } from './map';
import { metaDescription, photos, siteUrl, title, year } from './content';

export default function generateHTML() {
	return '<!DOCTYPE html>\n' + ujsxToHTML(<html>

	<head>

		<meta charSet="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<title>{title}</title>
		<meta name="description" content={metaDescription} />
		<meta name="keywords" content="dreamflash, дримфлеш, парад мыльных пузырей, ziepju burbuļu parāde, ziepju burbuļu gājiens" />

		<meta property="og:type" content="website" />
		<meta property="og:url" content={siteUrl} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={metaDescription} />
		<meta property="og:image" content={`${siteUrl}img/bubbles.jpg`} />

		<link href="./woff2.css" rel="stylesheet"/>

	</head>

	<body>

		<header className="header">
			<h1>{title}</h1>
			<div className="header__nav">
				{languages.map(
					lang => <a href={'#' + lang} className="header__nav-button header__nav-button--language">{lang.toUpperCase()}</a>
				)}
				<div className="header__nav-separator" />
				<a className="header__nav-button header__nav-button--fb" href="https://www.facebook.com/DreamflashRiga/">
					{fbIcon}
				</a>
			</div>
		</header>

		<main>

			{forEachLang(c => <h2 className="essentials">
				<span>{c.date}</span>{' '}
				<span>14:14</span>{' '}
				<span>Bastejkalns</span>
			</h2>)}

			{forEachLang(c => <section className="info">{c.info}</section>)}

			<section className="photos">
				{photos.map(pid => <a
					className="photos__thumb"
					href={`https://www.facebook.com/${pid}`}
					style={{ backgroundImage: `url(./img/thumbs/${pid}.500.jpg)` }}
					target="_blank"
				/>)}
			</section>

			{forEachLang(c => <section className="howto">
				<ul className="howto__do">{c.do}</ul>
				<ul className="howto__dont">{c.dont}</ul>
			</section>)}

			<section className="map">
				{mapIframe}
			</section>

		</main>

		<footer className="footer">
			<a href="mailto:riga@dreamflash.lv">riga@dreamflash.lv</a>
			<div className="footer__copy">
				&copy; 2008-{year}
				<div className="footer__dude footer__dude--left">{secretDude}</div>
				<div className="footer__dude footer__dude--right">{dudeRef}</div>
			</div>
			<div className="footer__attrib">
				Icons by <a href="https://fontawesome.com/">FontAwesome</a>.
			</div>
		</footer>

	</body>

	</html>);
}
