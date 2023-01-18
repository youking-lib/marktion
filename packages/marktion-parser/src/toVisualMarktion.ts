import { Lexer } from '../libs/md-serializer'
import { Token } from './tokens'

export const defaultVisualMarktion: Token[] = [
  {
    type: 'paragraph',
    raw: '',
    children: [{ text: '', raw: '', type: 'text' }],
  },
]

export function toVisualMarktion(markdown: string) {
  const tokens = Lexer.lex(markdown)

  delete tokens['links']

  return tokens.length > 0 ? tokens : defaultVisualMarktion
}
