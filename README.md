This is a Bengali to English dictionary in JSONL, by using data derived from [Wiktionary](https://www.wiktionary.org/) dump.
License: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

## Usage

```js
const enBnDictionary = require("bn-en-dictionary");

const translation1 = enBnDictionary.translate("সপ্তাহ");
const translation2 = enBnDictionary.translate("soptah");

console.log(translation1);
console.log(translation2);
```

Object Structure Example
```json
{
    "en": "number",
    "bn": "সংখ্যা",
    "pos": "noun",
    "def": "Quantity.",
    "source": "Wiktionary",
    "license": "CC BY-SA",
    "romanised": "songkhya"
}
```

`translate(input)` returns an array of full matching dictionary objects.
It matches:

- Exact Bengali (`bn`)
- Exact romanized Bengali (`romanised`, case-insensitive)

If there is no match, it returns an empty array.

You can also access the full dictionary:

```js
const enBnDictionary = require("bn-en-dictionary");

const allEntries = enBnDictionary.dictionary;
console.log(allEntries.length);
```


## Content Notice

This package contains lexical data derived from the Wiktionary project and reflects the broad scope of vocabulary documented in natural languages. As a result, the dataset may include words, expressions, or definitions related to topics such as sexuality, violence, discrimination, religion, politics, or other culturally sensitive subjects.

The presence of such terms does not imply endorsement, promotion, or normalization of any viewpoint or behavior. These entries are included solely as part of a comprehensive linguistic record intended for educational, research, and language-technology purposes.

Because the source material originates from an open collaborative dictionary, the dataset may contain terminology that some users may consider offensive, explicit, controversial, outdated, or context-dependent. Users of this package are responsible for determining whether and how the data should be filtered, moderated, or adapted for their particular application, audience, or jurisdiction.

If this dataset is used in applications intended for minors, educational environments, or other contexts requiring moderated language content, implementers are encouraged to apply appropriate filtering or review mechanisms before presenting the data to end users.

This dataset is provided "as is" without guarantees regarding suitability for any specific use case.