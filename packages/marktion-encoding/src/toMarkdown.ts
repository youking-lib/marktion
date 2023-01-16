import { MarkdownRule } from './rules'
import { Token } from './tokens'
import { defaultVisualMarktion } from './toVisualMarktion'

export function toMarkdown(tokens: Token[]) {
  return convert(tokens)
}

function convert(tokens: Token[], rule = new MarkdownRule()) {
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
      default:
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
