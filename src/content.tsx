import { ujsx, UJSX, UJSXObject } from 'ujsx';

export const year = 2019;

export type LanguageId = 'lv' | 'ru' | 'en';
export const languages: LanguageId[] = ['lv', 'ru', 'en'];

export const contentData = {
	when: {
		lv: 'Kad?',
		ru: 'Когда?',
		en: 'When?',
	}
};

export type ContentId = keyof typeof contentData;
export type ContentMap = Record<ContentId | string, UJSX>;

export const content = contentData as Record<ContentId | string, Record<LanguageId, UJSX>>; // leet hax

export const contentForLang = {} as Record<LanguageId, ContentMap>;
for (let lang of languages) {
	const lc = {} as ContentMap;
	for (let key in content) {
		lc[key] = content[key][lang];
	}
	contentForLang[lang] = lc;
}

export function forEachLang(fun: (c: ContentMap, lang: LanguageId) => UJSX) {
	return languages.map(lang => {
		const res = fun(contentForLang[lang], lang) as UJSXObject;
		res.attributes.class = ((res.attributes.class || '') + ' translated translated--' + lang).trim();
		return res;
	});
}

export function isLanguageId(s: any): s is LanguageId {
	return languages.includes(s);
}
