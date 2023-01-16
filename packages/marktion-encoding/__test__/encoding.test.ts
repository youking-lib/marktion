import { Token, toMarkdown, toVisualMarktion } from '../src'

function expectEncoding(html: string, tokens: Token[]) {
  expect(toMarkdown(tokens)).toBe(html)
  expect([...toVisualMarktion(html)]).toEqual(tokens)
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
      expectEncoding('    code', [
        {
          type: 'code',
          raw: '    code',
          children: [{ type: 'text', text: 'code', raw: 'code' }],
          codeBlockStyle: 'indented',
        },
      ])
    })

    it('fenced code', () => {
      expectEncoding('```\ncode\n```', [
        {
          type: 'code',
          raw: '```\ncode\n```',
          children: [{ type: 'text', text: 'code', raw: 'code' }],
          lang: '',
        },
      ])
    })

    it('fenced code lang', () => {
      expectEncoding('```text\ncode\n```', [
        {
          type: 'code',
          raw: '```text\ncode\n```',
          children: [{ type: 'text', text: 'code', raw: 'code' }],
          lang: 'text',
        },
      ])
    })
  })
})
