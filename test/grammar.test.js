import { buildTag } from 'bablr';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import language from '../lib/grammar.js';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';

let enhancers = {};
let { raw } = String;

// enhancers = debugEnhancers;

const buildBrainFckTag = (matcher) => {
  return buildTag(language, matcher, undefined, { enhancers });
};

const print = (tree) => {
  return printPrettyCSTML(tree);
};

describe('@bablr/language-en-brainFck', () => {
  describe('Instruction', () => {
    const brainFck = buildBrainFckTag(spam`<__Instructions />`);

    it('`>`', () => {
      expect(print(brainFck`>`)).toEqual(dedent`\
        <__>
          instructions[]: <*IncrementPointer '>' />
        </>\n`);
    });
  });
});
