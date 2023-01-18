import produce from 'immer'
import type { VisualMarktionValue } from 'marktion-visual'
import { ContentState } from './ContentState'
import { SourceState } from './SourceState'

export type EditorStateRecord = {
  mode: 'visual' | 'source'
  hasFocus: boolean
  contentState: ContentState
  sourceState: SourceState
}

export class EditorState {
  constructor(private _immutable: EditorStateRecord) {
    this._immutable = _immutable
  }

  getState() {
    return this._immutable
  }

  isVisualMode() {
    return this._immutable.mode === 'visual'
  }

  isSourceMode() {
    return this._immutable.mode === 'source'
  }

  getMode() {
    return this._immutable.mode
  }

  getHasFocus() {
    return this._immutable.hasFocus
  }

  getContentState() {
    return this._immutable.contentState
  }

  getSourceState() {
    return this._immutable.sourceState
  }

  static set<T extends EditorState>(editorState: T, recipe: (draft: ReturnType<T['getState']>) => void) {
    const nextStateRecord = produce(editorState._immutable, recipe)

    if (nextStateRecord !== editorState._immutable) {
      return new EditorState(nextStateRecord)
    }

    return editorState
  }

  static updateTokens(editorState: EditorState, tokens: VisualMarktionValue) {
    return EditorState.set(editorState, draft => {
      draft.contentState.tokens = tokens
    })
  }

  static updateSource(editorState: EditorState, source: string) {
    return EditorState.set(editorState, draft => {
      draft.sourceState.source = source
    })
  }

  static createWithSource(source: string) {
    return EditorState.create({
      contentState: ContentState.createWithSource(source),
      sourceState: SourceState.create(source),
      hasFocus: false,
      mode: 'visual',
    })
  }

  static create(_immutable: EditorStateRecord) {
    return new EditorState(_immutable)
  }
}
