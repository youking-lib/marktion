import React from 'react'
import { useFocused, useSelected } from 'slate-react'
import { Typography } from 'marktion-theme'
import { Fences } from './fences'
import { Image } from './image'
import { Heading } from './heading'
import { Table, TableCell, TableRow } from './table'
import { InlineChromiumBugfix } from './leaf'

export const Element = (props: any) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'paragraph':
      return <Typography.Div {...attributes}>{children}</Typography.Div>
    case 'horizontal-rule':
      return <hr />
    case 'code':
      return (
        <pre {...attributes}>
          <Typography.Code>{children}</Typography.Code>
        </pre>
      )
    case 'fences':
      return <Fences {...props} />
    case 'heading':
      return <Heading {...props} />
    case 'lheading':
      return React.createElement('h' + element.depth, attributes, children)
    case 'table':
      return <Table {...props} />
    case 'table-row':
      return <TableRow {...props} />
    // case 'table-head':
    //   return <th {...attributes}>{children}</th>
    case 'table-cell':
      return <TableCell {...props} />
    case 'image':
      return <Image {...props} />
    case 'hr':
      return <Hr {...props} />
    case 'blockquote':
      return <Typography.Blockquote {...attributes}>{children}</Typography.Blockquote>
    case 'list':
      return <List {...props} />
    case 'list_item':
      return <ListItem {...props} />
    case 'html':
      return <pre {...attributes}>{children}</pre>
    case 'checkbox':
      return <input checked={false} type="checkbox" />
    case 'table':
      return <section>// TODO table placeholder</section>
    case 'strong':
      return <Typography.Strong {...attributes}>{children}</Typography.Strong>
    case 'em':
      return <em {...attributes}>{children}</em>
    case 'text':
      return <>{children}</>
    case 'br':
      return <br />
    case 'mark':
      return <InlineMark {...props} />
    case 'del':
      return <del {...attributes}>{children}</del>
    case 'link':
      return (
        <Typography.A {...attributes} href={element.href} title={element.title}>
          {children}
        </Typography.A>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

function Hr({ attributes, element, children }: any) {
  const selected = useSelected()
  const focused = useFocused()

  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={{
          boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
        }}
      >
        <Typography.Hr />
      </div>
    </div>
  )
}

function List({ attributes, element, children }: any) {
  return element.ordered ? (
    <Typography.Ol {...attributes}>{children}</Typography.Ol>
  ) : (
    <Typography.Ul {...attributes}>{children}</Typography.Ul>
  )
}

function ListItem({ attributes, element, children }: any) {
  if (element.task) {
    return (
      <li {...attributes}>
        <input type="checkbox" defaultChecked={element.checked} />
        {children}
      </li>
    )
  } else {
    return <li {...attributes}>{children}</li>
  }
}

function InlineMark(props: any) {
  const { attributes, children, element } = props
  const selected = useSelected()
  const focused = useFocused()

  const style: React.CSSProperties = {
    padding: '3px 3px 2px',
    margin: '0 1px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: '#eee',
    fontSize: '0.9em',
    boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
  }

  return (
    <span {...attributes} contentEditable={false} style={style}>
      {children}#{element['mark']}
      <InlineChromiumBugfix />
    </span>
  )
}
