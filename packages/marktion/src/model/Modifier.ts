import { toMarkdown, toVisualMarktion } from 'marktion-parser'
import { EditorState, EditorStateRecord } from './EditorState'

export const MarktionModifier = {
  setViewMode(editorState: EditorState, mode: EditorStateRecord['mode']) {
    if (mode === editorState.getMode()) return editorState

    return EditorState.set(editorState, draft => {
      if (mode === 'source') {
        const tokens = draft.contentState.getTokens()
        const source = toMarkdown(tokens as any)

        draft.mode = 'source'
        draft.sourceState.source = source
      } else {
        const source = draft.sourceState.getSource()

        draft.mode = 'visual'
        draft.contentState.tokens = toVisualMarktion(source)
      }
    })
  },

  toggleViewMode(editorState: EditorState) {
    const mode: EditorStateRecord['mode'] = editorState.getMode() === 'source' ? 'visual' : 'source'
    return MarktionModifier.setViewMode(editorState, mode)
  },
}
