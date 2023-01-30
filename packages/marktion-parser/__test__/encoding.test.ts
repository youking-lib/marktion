import { Token, toMarkdown, toVisualMarktion } from '../src'

function expectEncoding(md: string, tokens: Token[]) {
  expect(toVisualMarktion(md)).toEqual(tokens)
  expect(toMarkdown(tokens)).toBe(md)
}

describe('encoding', () => {
  describe('paragraph', () => {
    it('space between paragraphs', () => {
      expectEncoding('paragraph 1\n\nparagraph 2', [
        {
          type: 'paragraph',
          raw: 'paragraph 1',
          children: [{ type: 'text', raw: 'paragraph 1', text: 'paragraph 1' }],
        },
        {
          type: 'paragraph',
          raw: 'paragraph 2',
          children: [{ type: 'text', raw: 'paragraph 2', text: 'paragraph 2' }],
        },
      ])
    })
  })

  describe('code', () => {
    it('indented code', () => {
      expect(toVisualMarktion('    code')).toEqual([
        {
          type: 'code',
          codeBlockStyle: 'indented',
          raw: '    code',
          children: [{ text: 'code' }],
        },
      ])
    })

    it('fenced code', () => {
      expectEncoding('```\ncode\n```', [
        {
          type: 'fences',
          lang: '',
          raw: '```\ncode\n```',
          children: [{ text: 'code' }],
        },
      ])
    })

    it('fenced code lang', () => {
      expectEncoding('```text\ncode\n```', [
        {
          type: 'fences',
          lang: 'text',
          raw: '```text\ncode\n```',
          children: [{ text: 'code' }],
        },
      ])
    })
  })

  describe('headings', () => {
    it('depth', () => {
      expectEncoding(
        `# heading 1

## heading 2

### heading 3

#### heading 4

##### heading 5

###### heading 6`,
        [
          {
            type: 'heading',
            raw: '# heading 1\n\n',
            depth: 1,
            children: [{ type: 'text', raw: 'heading 1', text: 'heading 1' }],
          },
          {
            type: 'heading',
            raw: '## heading 2\n\n',
            depth: 2,
            children: [{ type: 'text', raw: 'heading 2', text: 'heading 2' }],
          },
          {
            type: 'heading',
            raw: '### heading 3\n\n',
            depth: 3,
            children: [{ type: 'text', raw: 'heading 3', text: 'heading 3' }],
          },
          {
            type: 'heading',
            raw: '#### heading 4\n\n',
            depth: 4,
            children: [{ type: 'text', raw: 'heading 4', text: 'heading 4' }],
          },
          {
            type: 'heading',
            raw: '##### heading 5\n\n',
            depth: 5,
            children: [{ type: 'text', raw: 'heading 5', text: 'heading 5' }],
          },
          {
            type: 'heading',
            raw: '###### heading 6',
            depth: 6,
            children: [{ type: 'text', raw: 'heading 6', text: 'heading 6' }],
          },
        ],
      )
    })

    it('should not be heading if depth > 6', () => {
      expectEncoding('####### heading 7', [
        {
          type: 'paragraph',
          raw: '####### heading 7',
          children: [{ type: 'text', raw: '####### heading 7', text: '####### heading 7' }],
        },
      ])
    })
  })

  describe('table', () => {
    it('pipe table', () => {
      expectEncoding(
        `| a | b |
|---|---|
| 1 | 2 |`,
        [
          {
            type: 'table',
            align: [null, null],
            raw: '| a | b |\n|---|---|\n| 1 | 2 |',
            header: [
              {
                content: 'a',
                children: [{ type: 'text', raw: 'a', text: 'a' }],
              },
              {
                content: 'b',
                children: [{ type: 'text', raw: 'b', text: 'b' }],
              },
            ],
            rows: [
              [
                {
                  content: '1',
                  children: [{ type: 'text', raw: '1', text: '1' }],
                },
                {
                  content: '2',
                  children: [{ type: 'text', raw: '2', text: '2' }],
                },
              ],
            ],
          },
        ],
      )
    })

    it('table after para', () => {
      expectEncoding(
        `paragraph 1

| a | b |
|---|---|
| 1 | 2 |`,
        [
          {
            type: 'paragraph',
            raw: 'paragraph 1',
            children: [{ type: 'text', raw: 'paragraph 1', text: 'paragraph 1' }],
          },
          {
            type: 'table',
            align: [null, null],
            raw: '| a | b |\n|---|---|\n| 1 | 2 |',
            header: [
              {
                content: 'a',
                children: [{ type: 'text', raw: 'a', text: 'a' }],
              },
              {
                content: 'b',
                children: [{ type: 'text', raw: 'b', text: 'b' }],
              },
            ],
            rows: [
              [
                {
                  content: '1',
                  children: [{ type: 'text', raw: '1', text: '1' }],
                },
                {
                  content: '2',
                  children: [{ type: 'text', raw: '2', text: '2' }],
                },
              ],
            ],
          },
        ],
      )
    })

    it('align table', () => {
      expectEncoding(
        `| a | b | c |
|:--|:-:|--:|
| 1 | 2 | 3 |`,
        [
          {
            type: 'table',
            align: ['left', 'center', 'right'],
            raw: '| a | b | c |\n|:--|:-:|--:|\n| 1 | 2 | 3 |',
            header: [
              {
                content: 'a',
                children: [{ type: 'text', raw: 'a', text: 'a' }],
              },
              {
                content: 'b',
                children: [{ type: 'text', raw: 'b', text: 'b' }],
              },
              {
                content: 'c',
                children: [{ type: 'text', raw: 'c', text: 'c' }],
              },
            ],
            rows: [
              [
                {
                  content: '1',
                  children: [{ type: 'text', raw: '1', text: '1' }],
                },
                {
                  content: '2',
                  children: [{ type: 'text', raw: '2', text: '2' }],
                },
                {
                  content: '3',
                  children: [{ type: 'text', raw: '3', text: '3' }],
                },
              ],
            ],
          },
        ],
      )
    })
  })

  describe('hr', () => {
    it('hr', () => {
      expectEncoding('---', [{ type: 'hr', raw: '---', children: [{ text: '' }] }])
    })
  })

  describe('blockquote', () => {
    it('start, inner-tokens, end', () => {
      expectEncoding('> blockquote', [
        {
          type: 'blockquote',
          raw: '> blockquote',
          children: [{ type: 'text', raw: 'blockquote', text: 'blockquote' }],
        },
      ])
    })

    it('paragraph token in list', () => {
      expectEncoding('- > blockquote', [
        {
          type: 'list',
          raw: '- > blockquote',
          ordered: false,
          start: '',
          loose: false,
          children: [
            {
              type: 'list_item',
              raw: '- > blockquote',
              task: false,
              checked: undefined,
              loose: false,
              content: '> blockquote',
              children: [
                {
                  type: 'blockquote',
                  raw: '> blockquote',
                  children: [{ type: 'text', raw: 'blockquote', text: 'blockquote' }],
                },
              ],
            },
          ],
        },
      ])
    })
  })

  describe('list', () => {
    it('unordered', () => {
      expectEncoding(
        `- item 1
- item 2`,
        [
          {
            type: 'list',
            raw: '- item 1\n- item 2',
            ordered: false,
            start: '',
            loose: false,
            children: [
              {
                type: 'list_item',
                raw: '- item 1\n',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 1',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 1',
                    children: [{ type: 'text', raw: 'item 1', text: 'item 1' }],
                  },
                ],
              },
              {
                type: 'list_item',
                raw: '- item 2',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 2',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 2',
                    children: [{ type: 'text', raw: 'item 2', text: 'item 2' }],
                  },
                ],
              },
            ],
          },
        ],
      )
    })

    it('ordered', () => {
      expectEncoding(
        `1. item 1
2. item 2`,
        [
          {
            type: 'list',
            raw: '1. item 1\n2. item 2',
            ordered: true,
            start: 1,
            loose: false,
            children: [
              {
                type: 'list_item',
                raw: '1. item 1\n',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 1',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 1',
                    children: [{ type: 'text', raw: 'item 1', text: 'item 1' }],
                  },
                ],
              },
              {
                type: 'list_item',
                raw: '2. item 2',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 2',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 2',
                    children: [{ type: 'text', raw: 'item 2', text: 'item 2' }],
                  },
                ],
              },
            ],
          },
        ],
      )
    })

    it('space after list', () => {
      expectEncoding(
        `- item 1
- item 2

paragraph`,
        [
          {
            type: 'list',
            raw: '- item 1\n- item 2',
            ordered: false,
            start: '',
            loose: false,
            children: [
              {
                type: 'list_item',
                raw: '- item 1\n',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 1',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 1',
                    children: [{ type: 'text', raw: 'item 1', text: 'item 1' }],
                  },
                ],
              },
              {
                type: 'list_item',
                raw: '- item 2',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 2',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 2',
                    children: [{ type: 'text', raw: 'item 2', text: 'item 2' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            raw: 'paragraph',
            children: [
              {
                type: 'text',
                raw: 'paragraph',
                text: 'paragraph',
              },
            ],
          },
        ],
      )
    })

    it('start', () => {
      expectEncoding(
        `2. item 1
3. item 2`,
        [
          {
            loose: false,
            type: 'list',
            raw: '2. item 1\n3. item 2',
            ordered: true,
            start: 2,
            children: [
              {
                type: 'list_item',
                raw: '2. item 1\n',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 1',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 1',
                    children: [{ type: 'text', raw: 'item 1', text: 'item 1' }],
                  },
                ],
              },
              {
                type: 'list_item',
                raw: '3. item 2',
                task: false,
                checked: undefined,
                loose: false,
                content: 'item 2',
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 2',
                    children: [{ type: 'text', raw: 'item 2', text: 'item 2' }],
                  },
                ],
              },
            ],
          },
        ],
      )
    })

    it('task', () => {
      expectEncoding(
        `- [ ] item 1
- [x] item 2`,
        [
          {
            loose: false,
            type: 'list',
            raw: '- [ ] item 1\n- [x] item 2',
            ordered: false,
            start: '',
            children: [
              {
                type: 'list_item',
                raw: '- [ ] item 1\n',
                loose: false,
                content: 'item 1',
                task: true,
                checked: false,
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 1',
                    children: [{ type: 'text', raw: 'item 1', text: 'item 1' }],
                  },
                ],
              },
              {
                type: 'list_item',
                raw: '- [x] item 2',
                task: true,
                loose: false,
                content: 'item 2',
                checked: true,
                children: [
                  {
                    type: 'paragraph',
                    raw: 'item 2',
                    children: [{ type: 'text', raw: 'item 2', text: 'item 2' }],
                  },
                ],
              },
            ],
          },
        ],
      )
    })
  })

  describe('inline', () => {
    describe('inlineTokens', () => {
      it('escape', () => {
        expectEncoding('\\>', [
          {
            type: 'paragraph',
            raw: '\\>',
            children: [{ type: 'escape', raw: '\\>', text: '>' }],
          },
        ])
      })

      it('escaped punctuation inside emphasis', () => {
        expectEncoding('**strong text\\[**\\]', [
          {
            type: 'paragraph',
            raw: '**strong text\\[**\\]',
            children: [
              {
                type: 'strong',
                raw: '**strong text\\[**',
                children: [
                  { type: 'text', raw: 'strong text', text: 'strong text' },
                  { type: 'escape', raw: '\\[', text: '[' },
                ],
              },
              { type: 'escape', raw: '\\]', text: ']' },
            ],
          },
        ])

        expectEncoding('_em\\<pha\\>sis_', [
          {
            type: 'paragraph',
            raw: '_em\\<pha\\>sis_',
            children: [
              {
                type: 'em',
                raw: '_em\\<pha\\>sis_',
                children: [
                  { type: 'text', raw: 'em', text: 'em' },
                  { type: 'escape', raw: '\\<', text: '<' },
                  { type: 'text', raw: 'pha', text: 'pha' },
                  { type: 'escape', raw: '\\>', text: '>' },
                  { type: 'text', raw: 'sis', text: 'sis' },
                ],
              },
            ],
          },
        ])
      })

      it('link', () => {
        expectEncoding('[link](https://github.com/youking-lib/marktion)', [
          {
            type: 'paragraph',
            raw: '[link](https://github.com/youking-lib/marktion)',
            children: [
              {
                type: 'link',
                raw: '[link](https://github.com/youking-lib/marktion)',
                href: 'https://github.com/youking-lib/marktion',
                title: null,
                content: 'link',
                children: [{ type: 'text', raw: 'link', text: 'link' }],
              },
            ],
          },
        ])
      })

      it('link title', () => {
        expectEncoding('[link](https://github.com/youking-lib/marktion "title")', [
          {
            type: 'paragraph',
            raw: '[link](https://github.com/youking-lib/marktion "title")',
            children: [
              {
                type: 'link',
                raw: '[link](https://github.com/youking-lib/marktion "title")',
                href: 'https://github.com/youking-lib/marktion',
                title: 'title',
                content: 'link',
                children: [{ type: 'text', raw: 'link', text: 'link' }],
              },
            ],
          },
        ])
      })

      it('no def', () => {
        expectEncoding('[link]', [
          {
            type: 'paragraph',
            raw: '[link]',
            children: [{ type: 'text', raw: '[link]', text: '[link]' }],
          },
        ])
      })

      it('image', () => {
        expectEncoding('![image](https://github.com/youking-lib/marktion/image.png)', [
          {
            type: 'paragraph',
            raw: '![image](https://github.com/youking-lib/marktion/image.png)',
            children: [
              {
                type: 'image',
                raw: '![image](https://github.com/youking-lib/marktion/image.png)',
                content: 'image',
                href: 'https://github.com/youking-lib/marktion/image.png',
                title: null,
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ])
      })

      it('image title', () => {
        expectEncoding('![image](https://github.com/youking-lib/marktion/image.png "title")', [
          {
            type: 'paragraph',
            raw: '![image](https://github.com/youking-lib/marktion/image.png "title")',
            children: [
              {
                type: 'image',
                raw: '![image](https://github.com/youking-lib/marktion/image.png "title")',
                content: 'image',
                href: 'https://github.com/youking-lib/marktion/image.png',
                title: 'title',
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ])
      })

      it('strong', () => {
        expectEncoding('**strong**', [
          {
            type: 'paragraph',
            raw: '**strong**',
            children: [
              {
                type: 'strong',
                raw: '**strong**',
                children: [{ type: 'text', raw: 'strong', text: 'strong' }],
              },
            ],
          },
        ])
      })

      it('em', () => {
        expectEncoding('*em*', [
          {
            type: 'paragraph',
            raw: '*em*',
            children: [
              {
                type: 'em',
                raw: '*em*',
                children: [{ type: 'text', raw: 'em', text: 'em' }],
              },
            ],
          },
        ])
      })

      describe('codespan', () => {
        it('code', () => {
          expectEncoding('`code`', [
            {
              type: 'paragraph',
              raw: '`code`',
              children: [{ type: 'codespan', raw: '`code`', text: 'code' }],
            },
          ])
        })

        it('only spaces not stripped', () => {
          expectEncoding('`   `', [
            {
              type: 'paragraph',
              raw: '`   `',
              children: [{ type: 'codespan', raw: '`   `', text: '   ' }],
            },
          ])
        })

        it('beginning space only not stripped', () => {
          expectEncoding('` a`', [
            {
              type: 'paragraph',
              raw: '` a`',
              children: [{ type: 'codespan', raw: '` a`', text: ' a' }],
            },
          ])
        })

        it('end space only not stripped', () => {
          expectEncoding('`a `', [
            {
              type: 'paragraph',
              raw: '`a `',
              children: [{ type: 'codespan', raw: '`a `', text: 'a ' }],
            },
          ])
        })

        it('begin and end spaces are stripped', () => {
          expect(toVisualMarktion('` a `')).toEqual([
            {
              type: 'paragraph',
              raw: '` a `',
              children: [{ type: 'codespan', raw: '` a `', text: 'a' }],
            },
          ])
        })

        it('begin and end newlines are stripped', () => {
          expect(toVisualMarktion('`\na\n`')).toEqual([
            {
              type: 'paragraph',
              raw: '`\na\n`',
              children: [{ type: 'codespan', raw: '`\na\n`', text: 'a' }],
            },
          ])
        })

        it('begin and end tabs are not stripped', () => {
          expectEncoding('`\ta\t`', [
            {
              type: 'paragraph',
              raw: '`\ta\t`',
              children: [{ type: 'codespan', raw: '`\ta\t`', text: '\ta\t' }],
            },
          ])
        })

        it('begin and end newlines', () => {
          expect(toVisualMarktion('`\na\n`')).toEqual([
            {
              type: 'paragraph',
              raw: '`\na\n`',
              children: [{ type: 'codespan', raw: '`\na\n`', text: 'a' }],
            },
          ])
        })

        it('begin and end multiple spaces only one stripped', () => {
          expect(toVisualMarktion('`  a  `')).toEqual([
            {
              type: 'paragraph',
              raw: '`  a  `',
              children: [{ type: 'codespan', raw: '`  a  `', text: ' a ' }],
            },
          ])
        })

        it('newline to space', () => {
          expect(toVisualMarktion('`a\nb`')).toEqual([
            {
              type: 'paragraph',
              raw: '`a\nb`',
              children: [{ type: 'codespan', raw: '`a\nb`', text: 'a b' }],
            },
          ])
        })
      })

      it('br', () => {
        expectEncoding('a\nb', [
          {
            type: 'paragraph',
            raw: 'a\nb',
            children: [{ type: 'text', raw: 'a\nb', text: 'a\nb' }],
          },
        ])
      })

      it('del', () => {
        expectEncoding('~~del~~', [
          {
            type: 'paragraph',
            raw: '~~del~~',
            children: [
              {
                type: 'del',
                raw: '~~del~~',
                children: [{ type: 'text', raw: 'del', text: 'del' }],
              },
            ],
          },
        ])
      })

      describe('url', () => {
        it('autolink', () => {
          expect(toVisualMarktion('<https://github.com/youking-lib/marktion>')).toEqual([
            {
              type: 'paragraph',
              raw: '<https://github.com/youking-lib/marktion>',
              children: [
                {
                  type: 'link',
                  raw: '<https://github.com/youking-lib/marktion>',
                  href: 'https://github.com/youking-lib/marktion',
                  children: [
                    {
                      type: 'text',
                      raw: 'https://github.com/youking-lib/marktion',
                      text: 'https://github.com/youking-lib/marktion',
                    },
                  ],
                },
              ],
            },
          ])
        })
      })

      it('text', () => {
        expectEncoding('text', [
          {
            type: 'paragraph',
            raw: 'text',
            children: [
              {
                type: 'text',
                raw: 'text',
                text: 'text',
              },
            ],
          },
        ])
      })

      describe('smartypants', () => {
        it('single quotes', () => {
          expectEncoding("'single quotes'", [
            {
              type: 'paragraph',
              raw: "'single quotes'",
              children: [
                {
                  type: 'text',
                  raw: "'single quotes'",
                  text: "'single quotes'",
                },
              ],
            },
          ])
        })

        it('double quotes', () => {
          expectEncoding('"double quotes"', [
            {
              type: 'paragraph',
              raw: '"double quotes"',
              children: [
                {
                  type: 'text',
                  raw: '"double quotes"',
                  text: '"double quotes"',
                },
              ],
            },
          ])
        })

        it('ellipses', () => {
          expectEncoding('ellipses...', [
            {
              type: 'paragraph',
              raw: 'ellipses...',
              children: [
                {
                  type: 'text',
                  raw: 'ellipses...',
                  text: 'ellipses...',
                },
              ],
            },
          ])
        })

        it('en-dash', () => {
          expectEncoding('en--dash', [
            {
              type: 'paragraph',
              raw: 'en--dash',
              children: [
                {
                  type: 'text',
                  raw: 'en--dash',
                  text: 'en--dash',
                },
              ],
            },
          ])
        })

        it('em-dash', () => {
          expectEncoding('em---dash', [
            {
              type: 'paragraph',
              raw: 'em---dash',
              children: [
                {
                  type: 'text',
                  raw: 'em---dash',
                  text: 'em---dash',
                },
              ],
            },
          ])
        })
      })
    })
  })
})
