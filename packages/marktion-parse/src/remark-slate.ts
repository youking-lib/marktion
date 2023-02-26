import type { Plugin, Compiler } from 'unified'
import type { Root } from 'mdast'

export type Options = {
  overrides?: null
}

export const toSlatePlugin: Plugin<[Options?], Root, []> = function ({ overrides } = {}) {
  const compiler: Compiler<Root, []> = function (node) {
    return []
  }

  Object.assign(this, { Compiler: compiler })
}
