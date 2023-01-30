import { Tokens } from '../libs/md-serializer'

export type { Tokens }

export type Token =
  | Tokens.Space
  | Tokens.Code
  | Tokens.Fences
  | Tokens.Heading
  | Tokens.Table
  | Tokens.Hr
  | Tokens.Blockquote
  | Tokens.List
  | Tokens.ListItem
  | Tokens.Paragraph
  | Tokens.HTML
  | Tokens.Text
  | Tokens.Def
  | Tokens.Escape
  | Tokens.Tag
  | Tokens.Image
  | Tokens.Link
  | Tokens.Strong
  | Tokens.Em
  | Tokens.Codespan
  | Tokens.Br
  | Tokens.Del
  | Tokens.Mark

export type TokensList = Token[] & {
  links: {
    [key: string]: { href: string | null; title: string | null }
  }
}
