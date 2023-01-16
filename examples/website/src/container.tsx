import { styled } from '@modulz/design-system'

export const Container = styled('div', {
  display: 'flex',
  position: 'relative',
  ai: 'center',
  jc: 'center',
  borderRadius: '$3',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  cursor: 'default',
})
