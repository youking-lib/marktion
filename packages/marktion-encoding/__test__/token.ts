import { Token } from '../src/tokens'

export const basicToken: Token[] = [
  {
    type: 'heading',
    raw: '# Marktion Quick Start\\n\\n',
    depth: 1,
    children: [{ type: 'text', raw: 'Marktion Quick Start', text: 'Marktion Quick Start' }],
  },
  {
    type: 'paragraph',
    raw: 'Start with cmd+/ Tag: #d ',
    children: [
      { type: 'text', raw: 'Start with cmd+/ Tag: ', text: 'Start with cmd+/ Tag: ' },
      { type: 'mark', raw: '#d', mark: 'd', children: [{ type: 'text', raw: 'd', text: 'd' }] },
      { type: 'text', raw: ' ', text: ' ' },
    ],
  },
]
