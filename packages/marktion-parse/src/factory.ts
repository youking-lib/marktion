import type * as MarkdownAST from 'mdast'

export type Options = {
  overrides: null
  decoration: Readonly<{
    [key in (MarkdownAST.Emphasis | MarkdownAST.Strong | MarkdownAST.Delete | MarkdownAST.InlineCode)['type']]?: true
  }>
}

export function create(nodes: MarkdownAST.Content[], options: Options) {
  return nodes.reduce<[]>((acc, node) => {
    acc.push(...covert(node, options))
    return acc
  }, [])
}

export function covert(node: MarkdownAST.Content, options: Options) {
  switch (node.type) {
  }

  return []
}
