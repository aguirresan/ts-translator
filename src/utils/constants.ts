export const SUPPORTED_LANGS = ['EN', 'DE', 'NL', 'FR'];
export type Lang = typeof SUPPORTED_LANGS[number]

export interface DeeplTranslation {
    translations: [{
        detected_source_language: string,
        text: string
    }];
}