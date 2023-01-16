export const MARKDOWN_RULES = [
  {
    type: 'BOLD',
    reg: /\*{2}.+\*{2}$/,
    start: '**',
    end: '**',
  },
  {
    type: 'ITALIC',
    reg: /\*.+\*$/,
    start: '*',
    end: '*',
  },
  {
    type: 'STRIKETHROUGH',
    reg: /[~～]{2}.+[~～]{2}$/,
    start: '~~',
    end: '~~',
  },
  {
    type: 'UNDER_LINE',
    reg: /[~～].+[~～]$/,
    start: '~',
    end: '~',
  },
  {
    type: 'heading3',
    reg: /^#{3}$/,
    start: '###',
  },
  {
    type: 'heading2',
    reg: /^#{2}$/,
    start: '##',
  },
  {
    type: 'heading1',
    reg: /^#$/,
    start: '#',
  },
  {
    type: 'order',
    reg: /^1\.$/,
    start: '1.',
  },
  {
    type: 'bullet',
    reg: /^(-|\*|\+)$/,
    start: '*',
  },
  {
    type: 'todo',
    reg: /^(\[]|【】)$/,
    start: '[]',
  },
  {
    type: 'HORIZONTAL_LINE',
    reg: /^(-{3}|\*{3})$/,
    start: '---',
  },
  {
    type: 'CODE_BLOCK',
    reg: /^`{3}$/,
    start: '```',
  },
  {
    type: 'quote',
    reg: /^[>》]$/,
    start: '>',
  },
]
