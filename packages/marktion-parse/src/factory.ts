import type * as MarkdownAST from 'mdast'
import * as SlateTypes from './types'

export type Options = {
  overrides: null
  decoration: Readonly<{
    [key in (MarkdownAST.Emphasis | MarkdownAST.Strong | MarkdownAST.Delete | MarkdownAST.InlineCode)['type']]?: true
  }>
}

export function create(nodes: MarkdownAST.Content[], options: Options) {
  return nodes.reduce<SlateTypes.Node[]>((acc, node) => {
    acc.push(...covert(node, options))
    return acc
  }, [])
}

export function covert(node: MarkdownAST.Content, options: Options) {
  switch (node.type) {
  }

  return []
}

export type FormatNode = MarkdownAST.Content
export type FormatterMethods<T extends FormatNode> = {
  format(node: T, options?: Options): SlateTypes.Node
}
// export type FormatterImpl<T extends FormatNode> = FormatterMethods<T> | ((node: T) => FormatterMethods<T>)
export type FormatterImpl<T extends FormatNode> = FormatterMethods<T>

const formatterMap = new Map<FormatNode['type'], any>()

export const Formatter = {
  impl<T extends FormatNode>(type: T['type'], impl: FormatterImpl<T>) {
    // formatterMap.set(type, impl as FormatterImpl)
  },
}

Formatter.impl('paragraph', {
  format(node, options) {
    return {
      type: 'paragraph',
      children: [],
    }
  },
})
