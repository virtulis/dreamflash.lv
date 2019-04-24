import './style.scss';
import { isLanguageId, LanguageId, languages } from './i18n';
import { attr, list, on } from 'dtk';

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
	for (let a of list('a', '.header__nav-button--language')) {
		a.classList.toggle('header__nav-button--active', attr(a, 'href')!.substr(1) == lang);
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
