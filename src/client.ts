import './style.scss';
import { isLanguageId, LanguageId, languages } from './content';
import { on } from 'dtk';

const sheets = Array.from(document.styleSheets) as CSSStyleSheet[];
const sheet = sheets.find(ss => !ss.href) || sheets.pop()!;

for (let lang of languages) {
	sheet.insertRule(
		`body.language--${lang} .translated:not(.translated--${lang}) { display: none }`,
		sheet.cssRules.length
	);
}

export const state = {} as {
	language: LanguageId;
};

export function setLanguage(lang: LanguageId) {
	for (let clang of languages) {
		document.body.classList.toggle('language--' + clang, lang == clang);
	}
	state.language = lang;
}

export function checkLocationHash() {
	const hv = window.location.hash.substr(1);
	if (isLanguageId(hv)) setLanguage(hv);
}

on(window, 'hashchange', checkLocationHash);
checkLocationHash();
if (!state.language) setLanguage(languages[0]);
