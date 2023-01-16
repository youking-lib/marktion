import mitt, { Emitter } from 'mitt'
import { basicSetup } from 'codemirror'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { Actions, ModelAction } from './model/Actions'
import { EditorState } from '@codemirror/state'

// Ref: https://github.com/uiwjs/react-codemirror/blob/7bd0ed7850/core/src/useCodeMirror.ts

type MarktionSourceOptions = {
  defaultValue: string
  language: 'markdown'
}

export class MarktionSource {
  declare editorView: EditorView
  declare container: HTMLElement

  private dispatcher = mitt<Actions>()

  dispatch: Emitter<Actions>['emit'] = this.dispatcher.emit
  registeAction: Emitter<Actions>['on'] = this.dispatcher.on
  unregisteAction: Emitter<Actions>['off'] = this.dispatcher.off

  constructor(public options: MarktionSourceOptions) {}

  public initEditor(container: HTMLElement) {
    this.container = container

    const updateListener = EditorView.updateListener.of(viewUpdate => {
      if (viewUpdate.docChanged) {
        const doc = viewUpdate.state.doc
        const value = doc.toString()

        this.dispatcher.emit(ModelAction.onChange, {
          value,
          viewUpdate,
        })
      }
    })

    const state = EditorState.create({
      doc: this.options.defaultValue,
      extensions: [basicSetup, markdown(), updateListener],
    })

    this.editorView = new EditorView({
      state: state,
      parent: container,
    })

    this.dispatcher.on('*', action => {
      console.log(`MarktionSource:dispatcher - ${action}`)
    })
  }

  static create(options: MarktionSourceOptions) {
    return new MarktionSource(options)
  }

  static ModalAction = ModelAction
}
