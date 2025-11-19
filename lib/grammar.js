import { t, spam as m } from '@bablr/boot';
import { eat, eatMatch, match, fail } from '@bablr/helpers/grammar';
import {
  buildIdentifier,
  buildPattern,
  buildAlternatives,
  buildAlternative,
  buildElements,
} from '@bablr/helpers/builders';
import { treeFromStreamSync as treeFromStream, buildToken } from '@bablr/agast-helpers/tree';
import { buildLiteralTag } from '@bablr/agast-helpers/builders';
import { buildEmbeddedRegex } from '@bablr/agast-vm-helpers/builders';

export const canonicalURL = 'https://bablr.org/languages/core/en/brainFck';

export const defaultMatcher = m`<Program />`;

export const validOperators = Object.freeze({
  '<': 'DecrementPointer',
  '>': 'IncrementPointer',
  '+': 'IncrementByte',
  '-': 'DecrementByte',
  '.': 'OutputByte',
  ',': 'AcceptByte',
  '[': 'StartLoop',
  ']': 'EndLoop',
});

export const templates = {
  Instruction: (op) => {
    return treeFromStream([
      t`<${buildIdentifier(validOperators[op])}>`,
      buildLiteralTag(op),
      t`</>`,
    ]);
  },
};

const operatorPattern = buildPattern(
  buildAlternatives([
    buildAlternative(
      buildElements([
        ...Object.keys(validOperators).map((op) => {
          return buildToken('Character', op);
        }),
      ]),
    ),
  ]),
);

export const grammar = class BrainFckGrammar {
  *Program() {
    yield eat(m`<__Instructions />`);
  }

  *Instructions() {
    while (yield eatMatch(m`<Instruction />`));
  }

  *Instruction() {
    let op = yield match(buildEmbeddedRegex(operatorPattern));
    if (!op) yield fail();

    yield m`<${buildIdentifier(validOperators[op])} />`;
  }
};

export default { canonicalURL, grammar, defaultMatcher };
