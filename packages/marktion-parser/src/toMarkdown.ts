import { MarkdownRule } from './rules'
import { Token, Tokens } from './tokens'
import { defaultVisualMarktion } from './toVisualMarktion'

export type ToBlockString = typeof toBlockString
export type ToInlineString = typeof toInlineString

export function toMarkdown(tokens: Token[]) {
  const rule = new MarkdownRule(toBlockString, toInlineString)

  return toBlockString(tokens, rule)
}

function toBlockString(tokens: Token[], rule: MarkdownRule) {
  return convert(tokens, rule).join('\n\n')
}

function toInlineString(tokens: Token[], rule: MarkdownRule) {
  return convert(tokens, rule).join('')
}

function convert(tokens: Token[], rule: MarkdownRule) {
  const fragments: string[] = []

  tokens.reduce((prev: Token, token) => {
    let children = ''
    let fragment: string | undefined = ''

    switch (token.type) {
      case 'text':
        fragment = rule.text(token.text)
        break
      case 'paragraph':
        fragment = rule.paragraph(token)
        break
      case 'fences':
        fragment = rule.fense(token)
        break
      case 'heading':
        fragment = rule.heading(token)
        break
      case 'table':
        fragment = rule.table(token)
        break
      case 'mark':
        fragment = rule.mark(token.mark)
        break
      case 'space':
        if (prev.type === 'space') {
          fragment = rule.space()
        }
        break
      case 'hr':
        fragment = rule.hr()
        break
      case 'blockquote':
        children = toBlockString(token.children, rule)
        fragment = rule.blockquote(children)
        break
      case 'escape':
        fragment = rule.escape(token)
        break
      case 'list':
        fragment = rule.list(token)
        break
      case 'strong':
        fragment = rule.strong(token)
        break
      case 'em':
        fragment = rule.em(token)
        break
      case 'del':
        fragment = rule.del(token)
        break
      case 'link':
        fragment = rule.link(token)
        break
      case 'image':
        fragment = rule.image(token)
        break
      case 'codespan':
        fragment = rule.codespan(token)
        break
      default:
        if (Array.isArray(token['children'])) {
          fragment = toInlineString(token['children'], rule)
        } else if (token['text']) {
          fragment = rule.text(token['text'])
        }
    }

    if (fragment) {
      fragments.push(fragment)
    }

    return token
  }, defaultVisualMarktion[0])

  return fragments
}
