# TS Translator CLI

This CLI tool was developed to ease the effort of translating entries from a locale into another. 

## Requisites
You need to have a valid API Token for the DeepL URL used. 

## Usage
First install the required packages and dependencies with `npm install`.


Once that has been done successfully, simply execute the 'package' script by running `npm run package`. This will create
an executable, which you can then execute by simply running `./i18n`.

The CLI tool currently only offers the `translate` command.

### Example Usages
`./i18n translate Hello World --langs DE`

`./i18n translate Hello World --langs DE NL FR`

Beware that only EN, DE, NL and FR are currently supported as languages.