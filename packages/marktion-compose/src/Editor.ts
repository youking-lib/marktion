import { toMarkdown, toVisualMarktion } from 'marktion-encoding'
import mitt from 'mitt'
import { EditorState } from './model/EditorState'
import { Renderer } from './renderer'

export type EditorEvent = {
  onChange: Editor
}

export class Editor {
  private dispatcher = mitt<EditorEvent>()
  private _renderer: Renderer | null = null

  dispatch = this.dispatcher.emit
  registeAction = this.dispatcher.on
  unregisteAction = this.dispatcher.off

  constructor(public editorState: EditorState) {
    this.editorState = editorState
  }

  replaceEditorState(editorState: EditorState) {
    this.editorState = editorState
  }

  update(editorState: EditorState) {
    if (editorState !== this.editorState) {
      this.editorState = editorState
      this.dispatch('onChange', this)
    }
  }

  focus() {
    this.update(
      EditorState.set(this.editorState, draft => {
        draft.hasFocus = true
      }),
    )
  }

  blur() {
    this.update(
      EditorState.set(this.editorState, draft => {
        draft.hasFocus = false
      }),
    )
  }

  getRenderer() {
    return this._renderer!
  }

  getMarkdown() {
    return toMarkdown(this.editorState.getContentState().getTokens() as any)
  }

  toggleViewMode() {
    this.update(
      EditorState.set(this.editorState, draft => {
        if (this.editorState.getMode() === 'visual') {
          const tokens = draft.contentState.getTokens()
          const source = toMarkdown(tokens as any)

          draft.mode = 'source'
          draft.sourceState.source = source
        } else {
          const source = draft.sourceState.getSource()

          draft.mode = 'visual'
          draft.contentState.tokens = toVisualMarktion(source)
        }
      }),
    )
  }

  static create(editorState: EditorState) {
    return new Editor(editorState)
  }
}
