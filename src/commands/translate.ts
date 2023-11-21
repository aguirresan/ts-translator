import type { Arguments, CommandBuilder } from 'yargs';
import { DeeplTranslation, Lang } from '../utils/constants';
import { buildHeaders, buildPayload, langGuard, useEnvVars } from '../utils/utils';

type Options = {
    phrase: string;
    langs: Lang[];
};

export const command: string = 'translate <phrase>';
export const desc: string = 'Translate <key> to <lang>';

export const builder: CommandBuilder = (yargs) =>
    yargs
        .options({
            langs: { type: 'array' },
        })
        .positional('phrase', { type: 'string', demandOption: true });

export const handler = async (argv: Arguments<Options>) => {
    const { phrase, langs } = argv;

    if (!langGuard(langs)) {
        process.stderr.write(`Input languages not supported!`);
        process.exit(1);
    }

    const translations = await translate(phrase, langs);

    console.log(translations);
    process.exit(0);
};

const translate = async (phrase: string, langs: Lang[]) => {

    const { requestUrl, deeplApiToken } = useEnvVars();
    if (!deeplApiToken) {
        process.stderr.write('You need to provide a DeepL API token!');
        process.exit(1);
    }

    const headers = buildHeaders(deeplApiToken);

    let translations: any = {};

    for (const lang of langs) {
        const payload = buildPayload(phrase, lang);
        const response = await fetch(requestUrl, { method: 'POST', body: JSON.stringify(payload), headers });
        const data = await response.json() as DeeplTranslation;

        if (data.translations[0].detected_source_language !== 'EN') {
            process.stderr.write('The detected source language was not English!');
        }

        translations[lang] = data.translations[0].text;
    }
    return translations;
};