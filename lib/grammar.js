import { re, spam as m } from '@bablr/boot';
import { o, eat, eatMatch, match, fail, defineAttribute } from '@bablr/helpers/grammar';

export const canonicalURL = 'https://bablr.org/languages/core/en/brainFck';

export const defaultMatcher = m`<__Instructions />`;

export const validInstructions = Object.freeze([
  '<',
  '>',
  '+',
  '-',
  '.',
  ',',
  '[',
  ']'
])

export const grammar = class BrainFckGrammar {
  *Instructions() {
    while (yield eatMatch(m`<Instruction />`));
  }

  *Instruction() {
    if (yield match(re`/>/`)) {
      yield eat(m`<IncrementPointer />`);
    } else {
    }
  }

  *IncrementPointer(){
    yield eat(re`/>/`);
  }
}


export default { canonicalURL, grammar, defaultMatcher };
