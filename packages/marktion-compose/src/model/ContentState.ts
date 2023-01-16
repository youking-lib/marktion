import { toVisualMarktion } from 'marktion-encoding'
import type { VisualMarktionValue } from 'marktion-visual'
import { EditorState } from './EditorState'

export class ContentState {
  constructor(public tokens: VisualMarktionValue) {
    this.tokens = tokens
  }

  getTokens() {
    return this.tokens
  }

  static updateTokens(editorState: EditorState, tokens: VisualMarktionValue) {
    return EditorState.set(editorState, draft => {
      if (editorState.isVisualMode()) {
        draft.contentState.tokens = tokens
      }
    })
  }

  static createWithSource(source: string) {
    const tokens = toVisualMarktion(source)

    return new ContentState(tokens)
  }
}
