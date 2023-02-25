import type { Plugin, Compiler } from 'unified'
import type { Root } from 'mdast'
import type { Node } from './types'

export type Options = {
  overrides?: null
}

export const toSlatePlugin: Plugin<[Options?], Root, Node[]> = function ({ overrides } = {}) {
  const compiler: Compiler<Root, Node[]> = function (node) {
    return []
  }

  Object.assign(this, { Compiler: compiler })
}
