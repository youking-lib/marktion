export class Lexer {
  constructor(options?: MarkedOptions)
  tokens: TokensList
  options: MarkedOptions
  rules: Rules
  static rules: Rules
  static lex(src: string, options?: MarkedOptions): TokensList
  static lexInline(src: string, options?: MarkedOptions): Token[]
  lex(src: string): TokensList
  blockTokens(src: string, tokens: Token[]): Token[]
  blockTokens(src: string, tokens: TokensList): TokensList
  inline(src: string, tokens?: Token[]): Token[]
  inlineTokens(src: string, tokens?: Token[]): Token[]
  state: {
    inLink: boolean
    inRawBlock: boolean
    top: boolean
  }
}

export namespace Tokens {
  type Inline = Text
  type NestToken = Text | Mark

  interface Space {
    type: 'space'
    raw: string
    children?: Text[]
  }

  // indented code blocks
  // https://spec.commonmark.org/0.30/#indented-code-blocks
  interface Code {
    type: 'code'
    raw: string
    codeBlockStyle?: 'indented' | undefined
    lang?: string | undefined
    children: Text[]
  }

  interface Fences {
    type: 'fences'
    raw: string
    lang: string
    children: Text[]
  }

  interface Heading {
    type: 'heading'
    raw: string
    depth: number
    children: Inline[]
  }

  // setext-headings
  // https://spec.commonmark.org/0.30/#setext-headings
  interface SetextHeading {
    type: 'lheading'
    raw: string
    depth: number
    children: Inline[]
  }

  interface Table {
    type: 'table'
    raw: string
    align: Array<'center' | 'left' | 'right' | null>
    header: TableCell[]
    rows: TableCell[][]
  }

  interface TableCell {
    text: string
    children: Token[]
  }

  interface Hr {
    type: 'hr'
    raw: string
    children: []
  }

  interface Blockquote {
    type: 'blockquote'
    raw: string
    text: string
    children: NestToken[]
  }

  interface List {
    type: 'list'
    raw: string
    ordered: boolean
    start: number | ''
    loose: boolean
    items: ListItem[]
  }

  interface ListItem {
    type: 'list_item'
    raw: string
    task: boolean
    checked?: boolean | undefined
    loose: boolean
    children: Token[]
  }

  interface Paragraph {
    type: 'paragraph'
    raw: string
    // pre?: boolean | undefined
    // text: string
    children: NestToken[]
  }

  interface HTML {
    type: 'html'
    raw: string
    pre: boolean
    children: [
      {
        text: string
      },
    ]
  }
  interface Def {
    type: 'def'
    raw: string
    tag: string
    href: string
    title: string
  }

  interface Text {
    type: 'text'
    raw: string
    text: string
    children?: Token[] | undefined
  }

  interface Escape {
    type: 'escape'
    raw: string
    text: string
  }

  interface Tag {
    type: 'text' | 'html'
    raw: string
    inLink: boolean
    inRawBlock: boolean
    text: string
  }

  interface Link {
    type: 'link'
    raw: string
    href: string
    title: string
    // text: string
    children: Token[]
  }

  interface Image {
    type: 'image'
    raw: string
    href: string
    title: string
    text: string
  }

  interface Strong {
    type: 'strong'
    raw: string
    // text: string
    children: Token[]
  }

  interface Em {
    type: 'em'
    raw: string
    // text: string
    children: Token[]
  }

  interface Codespan {
    type: 'codespan'
    raw: string
    text: string
  }

  interface Br {
    type: 'br'
    raw: string
  }

  interface Del {
    type: 'del'
    raw: string
    // text: string
    children: Token[]
  }

  interface Mark {
    type: 'mark'
    raw?: string
    mark: string
    children: Token[]
  }

  interface Generic {
    [index: string]: any
    type: string
    raw: string
    children?: Token[] | undefined
  }
}
