import { EditorCompose, EditorState, RendererCompose, MarktionToolbar } from 'marktion'
import { styled } from 'marktion-theme'
import { useMemo } from 'react'

const defaultValue = `# Marktion
## Features

## Quick Start

name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
name
classNamename
name
name
name
name
name
name
name
name
name
name
name
name
`

export function MarkdownEditor() {
  const editor = useMemo(() => EditorCompose.create(EditorState.createWithSource(defaultValue || '')), [])

  return (
    <Container
      aria-hidden
      css={{
        width: '800px',
        minHeight: '600px',
        background: 'White',
      }}
    >
      <RendererCompose editor={editor}>
        <MarktionToolbar />
      </RendererCompose>
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
