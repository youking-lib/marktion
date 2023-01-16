import { MarkdownRule } from './rules'
import { Token } from './tokens'
import { defaultVisualMarktion } from './toVisualMarktion'

export type Convert = typeof convert

export function toMarkdown(tokens: Token[]) {
  const rule = new MarkdownRule(convert)

  return convert(tokens, rule)
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
        children = convert(token.children, rule)
        fragment = rule.paragraph(children)
        break
      case 'heading':
        children = convert(token.children, rule)
        fragment = rule.heading(children, token.depth)
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
        children = convert(token.children, rule)
        fragment = rule.blockquote(children)
        break

      case 'list':
        fragment = rule.list(token)
        break
      default:
        console.log(token.type)
        if (Array.isArray(token['children'])) {
          children = convert(token['children'], rule)
          fragment = rule.paragraph(children)
        } else if (token['text']) {
          fragment = rule.text(token['text'])
        }
    }

    if (fragment) {
      fragments.push(fragment)
    }

    return token
  }, defaultVisualMarktion[0])

  return fragments.join('\n\n')
}
