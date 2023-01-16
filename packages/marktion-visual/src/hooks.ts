import React from 'react'
import { VisualMarktion } from './VisualMarktion'

export const VisualContext = React.createContext<VisualMarktion | null>(null)

export function useVisual() {
  const context = React.useContext(VisualContext)!

  if (!context) {
    throw new Error(`The \`useVisual\` hook must be used inside the <VisualContext> component's context.`)
  }

  return context
}

export function useEditor() {
  return useVisual().editor
}
