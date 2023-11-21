import { Lang, SUPPORTED_LANGS } from './constants';
import dotenv from 'dotenv';

export const langGuard = (inputLangs: string[]): inputLangs is Lang[] => {
    return inputLangs.reduce((acc, lang) => acc && SUPPORTED_LANGS.includes(lang), true);
};

export const useEnvVars = () => {
    dotenv.config();
    const hostUrl = process.env.HOST_URL;
    const path = process.env.REQ_PATH;
    const deeplApiToken = process.env.DEEPL_API_TOKEN;

    return {
        requestUrl: `${hostUrl}/${path}`,
        deeplApiToken,
    };
};

export const buildHeaders = (deeplApiToken: string) => {
    return {
        Authorization: `DeepL-Auth-Key ${deeplApiToken}`,
        'Content-Type': 'application/json',
    };
};

export const buildPayload = (text: string, targetlang: Lang) => {
    return {
        text: [text],
        target_lang: targetlang,
    };
};