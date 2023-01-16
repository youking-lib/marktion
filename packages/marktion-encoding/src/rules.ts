export class MarkdownRule {
  code(children: string, language: string) {
    return `\`\`\`${language}\n${children}\n\`\`\``
  }

  blockquote(children: string[]) {
    return children.map(text => `> ${text}`).join('\n')
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

  paragraph(children: string) {
    return `${children}`
  }
}
