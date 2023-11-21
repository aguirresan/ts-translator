export const SUPPORTED_LANGS = ['EN', 'DE', 'NL', 'FR'];
export type Lang = typeof SUPPORTED_LANGS[number]

export interface DeeplTranslation {
    translations: [{
        detected_source_language: string,
        text: string
    }];
}

export const HOST_URL = 'https://api-free.deepl.com';
export const REQ_PATH = 'v2/translate';