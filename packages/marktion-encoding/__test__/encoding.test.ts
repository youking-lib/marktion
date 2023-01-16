import { Token, toMarkdown, toVisualMarktion } from '../src'

function expectEncoding(md: string, tokens: Token[]) {
  console.log(JSON.stringify(toVisualMarktion(md), null, 2))

  expect([...toVisualMarktion(md)]).toEqual(tokens)
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

  // describe('code', () => {
  //   it('indented code', () => {
  //     expectEncoding('    code', [
  //       {
  //         type: 'code',
  //         raw: '    code',
  //         children: [{ type: 'text', text: 'code', raw: 'code' }],
  //         codeBlockStyle: 'indented',
  //       },
  //     ])
  //   })

  //   it('fenced code', () => {
  //     expectEncoding('```\ncode\n```', [
  //       {
  //         type: 'code',
  //         raw: '```\ncode\n```',
  //         children: [{ type: 'text', text: 'code', raw: 'code' }],
  //         lang: '',
  //       },
  //     ])
  //   })

  //   it('fenced code lang', () => {
  //     expectEncoding('```text\ncode\n```', [
  //       {
  //         type: 'code',
  //         raw: '```text\ncode\n```',
  //         children: [{ type: 'text', text: 'code', raw: 'code' }],
  //         lang: 'text',
  //       },
  //     ])
  //   })
  // })
})
