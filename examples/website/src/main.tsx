import React from 'react'
import ReactDOM from 'react-dom/client'
import { darkTheme, globalStyles } from './styles'
import { Container } from './container'
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
