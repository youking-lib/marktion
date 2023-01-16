import { Tokens } from './tokens'
import { Convert } from './toMarkdown'

export class MarkdownRule {
  constructor(public convert: Convert) {
    this.convert = convert
  }

  code(children: string, language: string) {
    return `\`\`\`${language}\n${children}\n\`\`\``
  }

  blockquote(children: string) {
    return `> ${children}`
  }

  text(text: string) {
    return text.trim()
  }

  mark(mark: string) {
    return ` #${mark} `
  }

  heading(children: string, depth: number) {
    switch (depth) {
      case 1:
        return `# ${children}`
      case 2:
        return `## ${children}`
      case 3:
        return `### ${children}`
      case 4:
        return `#### ${children}`
      case 5:
        return `##### ${children}`
      case 6:
        return `###### ${children}`
    }
  }

  space() {
    return '\n'
  }

  hr() {
    return '---'
  }

  listItem(token: Tokens.List, item: Tokens.ListItem, index: number) {
    const children = this.convert(item.children, this)
    const taskStr = item.task ? `[${item.checked ? 'x' : ' '}] ` : ''

    if (token.ordered) {
      const start = token.start || 1
      return `${start + index}. ${taskStr}${children}`
    }

    return `- ${taskStr}${children}`
  }

  list(token: Tokens.List) {
    const listItems = token.children.map((listItemToken, index) => this.listItem(token, listItemToken, index))

    return listItems.join('\n')
  }

  paragraph(children: string) {
    return `${children}`
  }
}
