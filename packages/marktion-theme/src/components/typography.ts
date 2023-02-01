/**
 * reference: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
 */

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
})

export const Div = styled('div', {
  marginBottom: '$4',
  color: '$proseBC',
})

export const Ul = styled('ul', {
  listStyleType: 'disc',
  margin: 0,
  marginTop: '$4',
  marginBottom: '$4',
  paddingLeft: em(24, 18),

  '& > li::marker': {
    color: '$proseBullets',
  },

  'ul > li': {
    paddingLeft: em(8, 20),
  },
})

export const Ol = styled('ol', {
  listStyleType: 'decimal',
  margin: 0,
  marginTop: '$4',
  marginBottom: '$4',
  paddingLeft: em(24, 18),

  'ol > li': {
    paddingLeft: em(8, 20),
  },

  '&[type="A"]': {
    listStyleType: 'upper-alpha',
  },
  '&[type="a"]': {
    listStyleType: 'lower-alpha',
  },
  '&[type="A" s]': {
    listStyleType: 'upper-alpha',
  },
  '&[type="a" s]': {
    listStyleType: 'lower-alpha',
  },
  '&[type="I"]': {
    listStyleType: 'upper-roman',
  },
  '&[type="i"]': {
    listStyleType: 'lower-roman',
  },
  '&[type="I" s]': {
    listStyleType: 'upper-roman',
  },
  '&[type="i" s]': {
    listStyleType: 'lower-roman',
  },
  '&[type="1"]': {
    listStyleType: 'decimal',
  },

  // li style
  '& > li::marker': {
    fontWeight: '400',
    color: '$proseCounters',
  },
})

export const Hr = styled('hr', {
  marginTop: '$4',
  marginBottom: '$4',

  borderColor: '$proseHr',
  borderTopWidth: 1,
})

export const Strong = styled('strong', {
  color: '$proseBold',
  fontWeight: '600',
})

export const A = styled('a', {
  color: '$proseLink',
  textDecoration: 'underline',
  fontWeight: '500',

  '& strong': {
    color: 'inherit',
  },

  '& code': {
    color: 'inherit',
  },
})

export const Blockquote = styled('blockquote', {
  marginLeft: '0',
  marginRight: '0',
  marginTop: '$4',
  marginBottom: '$4',
  paddingLeft: '$3',

  fontWeight: '$2',
  fontStyle: 'italic',
  color: '$fontColorHighContrast',
  borderLeftWidth: '$3',
  borderLeftColor: '$quoteBorderColor',
  borderLeftStyle: 'solid',
  quotes: '"\\201C""\\201D""\\2018""\\2019"',

  '& strong': {
    color: 'inherit',
  },

  '& p:first-of-type::before': {
    content: 'open-quote',
  },
  '& p:last-of-type::after': {
    content: 'close-quote',
  },

  '& code': {
    color: 'inherit',
  },
})

export const H1 = styled('h1', {
  color: '$proseHeadings',
  fontWeight: '$5',

  '& strong': {
    fontWeight: '$6',
    color: 'inherit',
  },

  '& code': {
    color: 'inherit',
  },
})

export const H2 = styled('h2', {
  color: '$proseHeadings',
  fontWeight: '$4',

  '& strong': {
    fontWeight: '$5',
    color: 'inherit',
  },

  '& code': {
    color: 'inherit',
  },
})

export const H3 = styled('h3', {
  color: '$proseHeadings',
  fontWeight: '$3',

  '& strong': {
    fontWeight: '$4',
    color: 'inherit',
  },

  '& code': {
    color: 'inherit',
  },
})

export const H4 = styled('h4', {
  color: '$proseHeadings',
  fontWeight: '$3',

  '& strong': {
    fontWeight: '$4',
    color: 'inherit',
  },

  '& code': {
    color: 'inherit',
  },
})

export const Code = styled('code', {
  color: '$proseCode',
  fontWeight: '$3',

  '&::before': {
    content: '"`"',
  },
  '&::after': {
    content: '"`"',
  },
})

export const Pre = styled('pre', {
  marginTop: '$4',
  marginBottom: '$4',
  borderRadius: '$2',
  padding: '$3',

  color: '$prosePreCode',
  backgroundColor: '$prosePreBg',
  overflowX: 'auto',
  fontWeight: '$1',

  '& code': {
    backgroundColor: 'transparent',
    borderWidth: '0',
    borderRadius: '0',
    padding: '0',
    fontWeight: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
  },

  '& code::before': {
    content: 'none',
  },
  '& code::after': {
    content: 'none',
  },
})

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'auto',
  textAlign: 'left',
  marginTop: '$4',
  marginBottom: '$4',
})

export const Tbody = styled('tbody', {
  '& td, tfoot td': {
    paddingTop: em(12, 16),
    paddingRight: em(12, 16),
    paddingBottom: em(12, 16),
    paddingLeft: em(12, 16),
  },
  '& td:first-child, tfoot td:first-child': {
    paddingLeft: '0',
  },
  '& td:last-child, tfoot td:last-child': {
    paddingRight: '0',
  },

  '& tr': {
    borderBottomWidth: '1px',
    borderBottomColor: '$proseTdBorders',
    borderBottomStyle: 'solid',
  },
  '& tr:last-child': {
    borderBottomWidth: '0',
  },
  '& td': {
    verticalAlign: 'baseline',
  },
})

export const Thead = styled('thead', {
  borderBottomWidth: '1px',
  borderBottomColor: '$proseThBorders',

  '& th': {
    color: 'proseHeadings',
    fontWeight: '$3',
    verticalAlign: 'bottom',
  },

  '& tr': {
    borderBottomWidth: '1px',
    borderBottomColor: '$proseTdBorders',
  },

  '& tr:last-child': {
    borderBottomWidth: '0',
  },

  '& td': {
    verticalAlign: 'baseline',
  },

  '& th strong': {
    color: 'inherit',
  },

  '& th code': {
    color: 'inherit',
  },
})

export const Tfoot = styled('tfoot', {
  borderTopWidth: '1px',
  borderTopColor: '$proseThBorders',
})

export const Img = styled('img', {
  marginTop: '$4',
  marginBottom: '$4',
})

export const Video = styled('video', {
  marginTop: '$4',
  marginBottom: '$4',
})
