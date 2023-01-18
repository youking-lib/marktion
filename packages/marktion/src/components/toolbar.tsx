import React from 'react'
import {
  ToolbarRoot,
  ToggleGroup,
  ToolbarToggleItem,
  ToolbarLink,
  ToolbarButton,
  ToolbarSeparator,
  FileTextIcon,
  EyeOpenIcon,
} from 'marktion-theme'
import { useEditorCompose } from './hooks'
import { MarktionModifier } from '../model/Modifier'
import { EditorStateRecord } from '../model/EditorState'

export const MarktionToolbar = () => {
  const editor = useEditorCompose()

  return (
    <ToolbarRoot aria-label="Formatting options">
      <ToggleGroup
        type="single"
        defaultValue={editor.editorState.getMode()}
        aria-label="Text alignment"
        onValueChange={(mode: EditorStateRecord['mode']) => {
          const nextState = MarktionModifier.setViewMode(editor.editorState, mode)
          editor.update(nextState)
        }}
      >
        <ToolbarToggleItem value="visual" aria-label="Left aligned">
          <EyeOpenIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="source" aria-label="Center aligned">
          <FileTextIcon />
        </ToolbarToggleItem>
      </ToggleGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#" target="_blank" css={{ marginRight: 10 }}>
        Edited 2 hours ago
      </ToolbarLink>
      <ToolbarButton css={{ marginLeft: 'auto' }}>Share</ToolbarButton>
    </ToolbarRoot>
  )
}
