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
import { EditorCompose } from '../Editor'

export type MarktionToolbarProps = {
  showLinkMeta?: boolean
  showSubmitButton?: boolean
  onSubmit?: (editor: EditorCompose) => void
}

export const MarktionToolbar: React.FC<MarktionToolbarProps> = ({
  showLinkMeta = true,
  showSubmitButton = true,
  onSubmit,
}) => {
  const editor = useEditorCompose()

  return (
    <ToolbarRoot aria-label="Formatting options">
      <ToggleGroup
        type="single"
        defaultValue={editor.editorState.getMode()}
        aria-label="editor mode"
        onValueChange={(mode: EditorStateRecord['mode']) => {
          const nextState = MarktionModifier.setViewMode(editor.editorState, mode)
          editor.update(nextState)
        }}
      >
        <ToolbarToggleItem value="visual" aria-label="visual editor mode">
          <EyeOpenIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="source" aria-label="source editor mode">
          <FileTextIcon />
        </ToolbarToggleItem>
      </ToggleGroup>

      {showLinkMeta && <ToolbarSeparator />}
      {showLinkMeta && (
        <ToolbarLink href="https://github.com/youking-lib/marktion" target="_blank" css={{ marginRight: 10 }}>
          Power by Marktion
        </ToolbarLink>
      )}

      {showSubmitButton && (
        <ToolbarButton css={{ marginLeft: 'auto' }} onClick={() => onSubmit && onSubmit(editor)}>
          Submit
        </ToolbarButton>
      )}
    </ToolbarRoot>
  )
}
