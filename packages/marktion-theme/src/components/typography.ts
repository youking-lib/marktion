import { styled } from '../themes'

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px: number) => `${round(px / 16)}rem`
const em = (px: number, base: number) => `${round(px / base)}em`

export const P = styled('p', {
  marginBottom: '$4',
  color: '$fontColorHighContrast',
})

export const Div = styled('div', {
  marginBottom: '$4',
  color: '$fontColorHighContrast',
})

export const Blockquote = styled('blockquote', {
  margin: '0',
  paddingLeft: '$3',

  fontWeight: '$2',
  fontStyle: 'italic',
  color: '$fontColorHighContrast',
  borderLeftWidth: '$3',
  borderLeftColor: '$quoteBorderColor',
  borderLeftStyle: 'solid',
  quotes: '"\\201C""\\201D""\\2018""\\2019"',
})

export const Ul = styled('ul', {
  listStyleType: 'disc',
  margin: 0,
  paddingLeft: '26px',
  ['& > li']: {
    paddingLeft: '$1',
  },
})

export const Ol = styled('ol', {
  listStyleType: 'decimal',
  margin: 0,
  paddingLeft: '26px',
  ['& > li']: {
    paddingLeft: '$1',
  },
})
