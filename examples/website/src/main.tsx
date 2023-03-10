import React from 'react'
import ReactDOM from 'react-dom/client'
import { styled } from 'marktion-theme'
import { darkTheme, globalStyles } from './styles'
import { MarkdownEditor } from './editor'

function App() {
  globalStyles()

  return (
    <Container
      aria-hidden
      css={{
        height: '100vh',
        background: 'linear-gradient(0deg, $indigo6, $crimson5)',
        [`.${darkTheme} &`]: {
          background: 'linear-gradient(0deg, $indigo4, $plum3)',
        },
      }}
    >
      <MarkdownEditor />
    </Container>
  )
}

export const Container = styled('div', {
  display: 'flex',
  position: 'relative',
  ai: 'center',
  jc: 'center',
  borderRadius: '$2',
  boxSizing: 'border-box',

  pt: '50px',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  cursor: 'default',
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
