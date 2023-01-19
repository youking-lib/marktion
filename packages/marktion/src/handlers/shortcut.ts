import isHotkey from 'is-hotkey'
import { MarktionModifier } from '../model/Modifier'
import { EditorCompose } from '../Editor'

export const ShortcutHandler = {
  toggleMode(editor: EditorCompose, e: KeyboardEvent) {
    if (!editor.editorState.getHasFocus() || !Shortcuter.check('toggleMode', e)) {
      return
    }

    const nextState = MarktionModifier.toggleViewMode(editor.editorState)
    editor.update(nextState)
  },
}

export type ShortcutCommand = 'toggleMode'
export type ShortcuterMethod = {
  check(e: KeyboardEvent): boolean
}

const keyboardMap = new Map<ShortcutCommand, ShortcuterMethod>()

export const Shortcuter = {
  impl(command: ShortcutCommand, impl: ShortcuterMethod) {
    keyboardMap.set(command, impl)
  },

  get(command: ShortcutCommand) {
    return keyboardMap.get(command)
  },

  check(command: ShortcutCommand, event: KeyboardEvent) {
    const checker = Shortcuter.get(command)

    if (!checker) {
      throw new Error(`No impl found for Shortcuter, command: ${command}`)
    }

    return checker.check(event)
  },
}

Shortcuter.impl('toggleMode', {
  check(e) {
    return isHotkey('cmd+/', e)
  },
})
