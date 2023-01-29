import { EditorCompose, EditorState, RendererCompose, MarktionToolbar } from 'marktion'
import { styled } from 'marktion-theme'
import { useMemo } from 'react'

const defaultValue = `# Marktion
## Features

## Quick Start

## Test

---

title

# Heading1
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6

---

block quote

> Github
> Github
> Github
> Github

- > Github
- > Github
- > Github

---

list

- unordered1
- unordered2
- unordered3

1. nest ordered1
  1. nest ordered child1
  2. nest ordered child2
  3. nest ordered child3
  
2. ordered2
3. ordered3

start from number.

5. ordered5 [TODO] BUGFIX
6. ordered7 [TODO] BUGFIX

---

escape

**strong text\\[**\\] _em\\<pha\\>sis_

---

Link

[marktion](https://github.com/youking-lib/marktion)

[marktion with title](https://github.com/youking-lib/marktion "github url")

<https://github.com/youking-lib/marktion>

---

image

![image](https://raw.githubusercontent.com/youking-lib/marktion/feature/compose/examples/website/public/beek.svg)

![image](https://raw.githubusercontent.com/youking-lib/marktion/feature/compose/examples/website/public/beek.svg "marktion logo")

---

**strong** *em* ~~del~~

---

codespan

\`document.querySelector\`

\`\na\n\`

---

br

a\nb

---

smartypants

'single quotes'

"double quotes"

ellipses...

en--dash

em---dash

---

By default, --Tailwind-- **removes** all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you really are just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.
`

export function MarkdownEditor() {
  const editor = useMemo(() => EditorCompose.create(EditorState.createWithSource(defaultValue || '')), [])

  // @ts-ignore
  window['editor'] = editor

  return (
    <Container
      aria-hidden
      css={{
        width: '800px',
        minHeight: '600px',
        height: '100%',
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
  boxSizing: 'border-box',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  cursor: 'default',
})
