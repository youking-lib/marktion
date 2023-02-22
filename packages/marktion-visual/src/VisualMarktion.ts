import mitt from 'mitt'
import { ReactEditor } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { ModelAction, TransformActions } from './model/actions/Actions'
import { shortcuts } from './plugins/shortcuts'
import { history } from './plugins/history'
import { react } from './plugins/react'
import { EditorFormat, format } from './plugins/format'
import { editEnhance } from './plugins/editEnhance'
import { Actions } from './model/types'

export type Plugin = (visualMarktion: VisualMarktion) => void
export type VisualMarktionValue = Descendant[]

export class VisualMarktion {
  public editor = createEditor()
  private dispatcher = mitt<Actions>()

  dispatch = this.dispatcher.emit
  registeAction = this.dispatcher.on
  unregisteAction = this.dispatcher.off

  constructor(public value: VisualMarktionValue = []) {
    this.use(history)
    this.use(react)
    this.use(shortcuts)
    this.use(format)
    this.use(editEnhance)

    this.registeInternalActions()

    window['visual'] = this

    this.dispatcher.on('*', (action, payload) => {
      console.log(`VisualMarktion:dispatcher - ${action}`, payload)
    })
  }

  private registeInternalActions() {
    this.registeAction(ModelAction.onChange, value => {
      this.value = value
    })

    this.registeAction(TransformActions.toHeading, depth => {
      EditorFormat.set(this.editor, 'heading', depth)
    })

    this.registeAction(TransformActions.toParagraph, () => {
      EditorFormat.set(this.editor, 'paragraph')
    })
  }

  update(value: Descendant[]) {
    this.dispatch(ModelAction.onChange, value)
  }

  focus() {
    ReactEditor.focus(this.editor)
  }

  blur() {
    ReactEditor.blur(this.editor)
  }

  isFocused() {
    ReactEditor.isFocused(this.editor)
  }

  use(plugin: Plugin) {
    plugin(this)
  }

  static create(value: Descendant[] = []) {
    return new VisualMarktion(value)
  }

  static ModalAction = ModelAction
}
