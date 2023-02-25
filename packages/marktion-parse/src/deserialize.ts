/// <reference types="vfile" />

import remark from 'remark-parse'
import { unified } from 'unified'
import { toSlatePlugin } from './remark-slate'

export function deserialize(md: string) {
  const processor = unified().use(remark).use(toSlatePlugin)

  return processor.processSync(md)
}
