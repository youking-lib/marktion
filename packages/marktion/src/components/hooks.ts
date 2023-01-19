import React from 'react'
import { EditorCompose } from 'src/Editor'

export const EditorComposeContext = React.createContext<EditorCompose | null>(null)

export function useEditorCompose() {
  const editor = React.useContext(EditorComposeContext)

  if (!editor) {
    throw new Error(`The \`useEditorCompose\` hook must be used inside the <RenderCompose> component's context.`)
  }

  return editor
}
