import { Tokens } from './tokens'
import { ToBlockString, ToInlineString } from './toMarkdown'

export class MarkdownRule {
  constructor(public toBlockString: ToBlockString, public toInlineString: ToInlineString) {
    this.toBlockString = toBlockString
    this.toInlineString = toInlineString
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

  fense(token: Tokens.Fences) {
    const inline = this.toInlineString(token.children, this)
    const lang = token.lang || ''

    return '```' + lang + '\n' + inline + '\n' + '```'
  }

  heading(token: Tokens.Heading) {
    const inline = this.toInlineString(token.children, this)

    switch (token.depth) {
      case 1:
        return `# ${inline}`
      case 2:
        return `## ${inline}`
      case 3:
        return `### ${inline}`
      case 4:
        return `#### ${inline}`
      case 5:
        return `##### ${inline}`
      case 6:
        return `###### ${inline}`
    }
  }

  table(token: Tokens.Table) {
    const [header, ...rows] = token.children
    const tableHeader = this.tableHeader(header)
    const tableRows = rows.map(item => this.tableRow(item)).join('\n')
    const tableAlign = this.tableAlign(token.align)

    return [tableHeader, tableAlign, tableRows].join('\n')
  }

  tableHeader(token: Tokens.TableRow) {
    const inline = token.children.map(cell => this.tableCell(cell)).join(' | ')
    return `| ${inline} |`
  }

  tableRow(token: Tokens.TableRow) {
    const inline = token.children.map(cell => this.tableCell(cell)).join(' | ')
    return `| ${inline} |`
  }

  tableCell(token: Tokens.TableCell) {
    const inline = this.toInlineString(token.children, this)
    return inline
  }

  tableAlign(align: Tokens.Table['align']) {
    const inline = align
      .map(item => {
        switch (item) {
          case 'left':
            return ':--'
          case 'center':
            return ':-:'
          case 'right':
            return '--:'
          default:
            return '---'
        }
      })
      .join('|')

    return `|${inline}|`
  }

  space() {
    return '\n'
  }

  hr() {
    return '---'
  }

  escape(token: Tokens.Escape) {
    return `\\${token.text}`
  }

  strong(token: Tokens.Strong) {
    const children = this.toInlineString(token.children, this)
    return `**${children}**`
  }

  em(token: Tokens.Em) {
    const children = this.toInlineString(token.children, this)
    const symbols = token.raw[0] || '_'

    return `${symbols}${children}${symbols}`
  }

  del(token: Tokens.Del) {
    const children = this.toInlineString(token.children, this)
    return `~~${children}~~`
  }

  link(token: Tokens.Link) {
    const children = this.toInlineString(token.children, this)
    const title = token.title ? ` "${token.title}"` : ''

    return `[${children}](${token.href}${title})`
  }

  image(token: Tokens.Image) {
    const title = token.title ? ` "${token.title}"` : ''

    return `![image](${token.href}${title})`
  }

  codespan(token: Tokens.Codespan) {
    return `\`${token.text}\``
  }

  listItem(token: Tokens.List, item: Tokens.ListItem, index: number) {
    const children = this.toBlockString(item.children, this)
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

  paragraph(token: Tokens.Paragraph) {
    const inline = this.toInlineString(token.children, this)
    return `${inline}`
  }
}
