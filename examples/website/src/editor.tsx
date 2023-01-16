import { Editor, EditorState, ReactRenderer } from 'marktion'
import { styled } from '@modulz/design-system'
import { useMemo } from 'react'

const defaultValue = 'header'

export function MarkdownEditor() {
  const editor = useMemo(() => new Editor(EditorState.createWithSource(defaultValue || '')), [])

  return (
    <Container
      aria-hidden
      css={{
        width: '800px',
        height: '600px',
        background: 'White',
      }}
    >
      <ReactRenderer editor={editor} />
    </Container>
  )
}

export const Container = styled('div', {
  borderRadius: '$3',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  cursor: 'default',

  // Content slightly above vertical center feels perfectly centred
  p: '$3',
})
