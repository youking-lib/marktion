import React from 'react'
import { Typography } from 'marktion-theme'

export function Table({ attributes, children, element }: any) {
  return (
    <Typography.Table>
      <Typography.Tbody {...attributes}>{children}</Typography.Tbody>
    </Typography.Table>
  )
}

export function TableToolbar() {
  return <button>插入</button>
}

export function TableRow({ attributes, children, element }: any) {
  return <tr {...attributes}>{children}</tr>
}

export function TableCell({ attributes, children, element }: any) {
  return <td {...attributes}>{children}</td>
}
