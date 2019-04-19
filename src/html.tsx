import { ujsx, ujsxToHTML } from 'ujsx';
import { forEachLang, languages } from './content';

const fbIcon = <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square"
					className="svg-inline--fa fa-facebook-square fa-w-14" role="img"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
	<path fill="currentColor"
		  d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"/>
</svg>;

export default function generateHTML() {
	return '<!DOCTYPE html>\n' + ujsxToHTML(<html lang="en">
	<head>
		<meta charSet="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>Dreamflash Rīga 2019</title>
		<link href="./woff2.css" rel="stylesheet"/>
	</head>
	<body>
		<div className="page">
			<header className="header">
				<h1>Dreamflash Rīga 2019</h1>
				<div className="header__nav">
					{languages.map(
						lang => <a href={'#' + lang} className="header__nav-button">{lang.toUpperCase()}</a>
					)}
					<div className="header__nav-separator" />
					<a className="header__nav-button header__nav-button--fb" href="https://www.facebook.com/DreamflashRiga/">
						{fbIcon}
					</a>
				</div>
			</header>
			<main>
				{forEachLang(c => <section className="essentials">
					<div>
						<h3>{c.when}</h3>
					</div>
				</section>)}
			</main>
			<footer className="footer">
				<a href="mailto:riga@dreamflash.lv">riga@dreamflash.lv</a>
			</footer>
		</div>
	</body>
	</html>);
}
