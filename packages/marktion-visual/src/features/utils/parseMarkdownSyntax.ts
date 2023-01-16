import { MARKDOWN_RULES } from '../../model/constants/Markdown'

export function parseMarkdownSyntax(str: string) {
  if (!str) return null
  const rule = MARKDOWN_RULES.find(rule => rule.reg.test(str))
  return rule || null
}
