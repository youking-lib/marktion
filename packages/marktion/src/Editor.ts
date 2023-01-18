import { toMarkdown, toVisualMarktion } from 'marktion-parser'
import mitt from 'mitt'
import { VisualMarktion } from 'marktion-visual'
import { SourceMarktion } from 'marktion-source'
import { EditorState } from './model/EditorState'

export type EditorEvent = {
  onChange: Editor
}

export class Editor {
  private dispatcher = mitt<EditorEvent>()
  private _visual: VisualMarktion | null = null
  private _source: SourceMarktion | null = null

  dispatch = this.dispatcher.emit
  registeAction = this.dispatcher.on
  unregisteAction = this.dispatcher.off

  constructor(public editorState: EditorState) {
    this.editorState = editorState
  }

  getVisualMarktion() {
    if (!this._visual) {
      this._visual = VisualMarktion.create(this.editorState.getContentState().getTokens())
    }
    return this._visual
  }

  getSourceMarktion() {
    if (!this._source) {
      this._source = SourceMarktion.create({
        defaultValue: this.editorState.getSourceState().getSource(),
        language: 'markdown',
      })
    }
    return this._source
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
