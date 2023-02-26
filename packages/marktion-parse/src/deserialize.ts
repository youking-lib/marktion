/// <reference types="vfile" />

import remark from 'remark-parse'
import { unified } from 'unified'
import type * as MarkdownAST from 'mdast'
import { toSlatePlugin } from './remark-slate'
import { SlateElement, SlateNode } from './types'

// export function deserialize(md: string) {
//   const processor = unified().use(remark).use(toSlatePlugin)

//   return processor.processSync(md)
// }

export type Options = {
  overrides: null
  decoration: Readonly<{
    [key in (MarkdownAST.Emphasis | MarkdownAST.Strong | MarkdownAST.Delete | MarkdownAST.InlineCode)['type']]?: true
  }>
}

export function deserialize(root: MarkdownAST.Root, options: Options) {
  return deserializer.format(root.children, options)
}

export type ContentType<T extends MarkdownAST.Content> = T['type']
export type DeserializerImpl<T extends MarkdownAST.Content> = {
  format(node: T, options: Options): SlateNode[]
}

const deserializerMap = new Map<string, DeserializerImpl<MarkdownAST.Paragraph>>()

export const deserializer = {
  impl<T extends MarkdownAST.Content>(type: ContentType<T>, impl: DeserializerImpl<T>) {
    deserializerMap.set(type, impl as DeserializerImpl<MarkdownAST.Paragraph>)
  },

  get<T extends MarkdownAST.Content>(type: ContentType<T>) {
    return deserializerMap.get(type) as DeserializerImpl<T>
  },

  format(nodes: MarkdownAST.Content[], options: Options) {
    return nodes.reduce<SlateNode[]>((acc, node) => {
      const impl = deserializer.get(node.type)

      acc.push(...impl.format(node, options))

      return acc
    }, [])
  },
}

deserializer.impl<MarkdownAST.Paragraph>('paragraph', {
  format(node, options) {
    return [
      {
        type: node.type,
        children: deserializer.format(node.children, options),
      },
    ]
  },
})

// export type FormatNode = MarkdownAST.Content
// export type FormatterMethods<T extends FormatNode> = {
//   format(node: T, options?: Options): SlateNode
// }
// // export type FormatterImpl<T extends FormatNode> = FormatterMethods<T> | ((node: T) => FormatterMethods<T>)
// export type FormatterImpl<T extends FormatNode> = FormatterMethods<T>

// const formatterMap = new Map<FormatNode['type'], any>()

// export const Formatter = {
//   impl<T extends FormatNode>(type: T['type'], impl: FormatterImpl<T>) {
//     // formatterMap.set(type, impl as FormatterImpl)
//   },
// }

// Formatter.impl('paragraph', {
//   format(node, options) {
//     return {
//       type: 'paragraph',
//       children: [],
//     }
//   },
// })
