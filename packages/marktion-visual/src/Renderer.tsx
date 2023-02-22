import React, { KeyboardEventHandler } from 'react'
import { Descendant } from 'slate'
import { useCallback } from 'react'
import { Editable, Slate } from 'slate-react'
import { useForceUpdate } from 'marktion-share'
import { VisualMarktion } from './VisualMarktion'
import { Element, Leaf } from './slate-renderer'
import { VisualContext } from './hooks'
import { ActionsChanel } from './model/actions/Actions'

export type VisualRendererProps = React.PropsWithChildren<{
  visual: VisualMarktion
  editableProps?: React.TextareaHTMLAttributes<HTMLDivElement>
}>

export const VisualRenderer: React.FunctionComponent<VisualRendererProps> = props => {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const forceUpdate = useForceUpdate()

  const { visual, editableProps } = props
  const slateEditor = props.visual.editor
  const value = props.visual.value

  const onDOMBeforeInput = useCallback((e: InputEvent) => slateEditor.beforeInput(e), [slateEditor])

  const onChange = useCallback(
    (value: Descendant[]) => {
      const isAstChange = slateEditor.operations.some(op => 'set_selection' !== op.type)

      if (isAstChange) {
        forceUpdate()
        visual.update(value)
      }
    },
    [slateEditor],
  )

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    e => {
      visual.dispatch(ActionsChanel.EventActions.onMouseDown, e)
    },
    [slateEditor],
  )

  return (
    <VisualContext.Provider value={props.visual}>
      <Slate editor={slateEditor} value={value} onChange={onChange}>
        <Editable
          autoFocus
          spellCheck
          placeholder="Write some markdown..."
          onDOMBeforeInput={onDOMBeforeInput}
          onKeyDown={onKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          {...editableProps}
        />
      </Slate>

      {props.children}
    </VisualContext.Provider>
  )
}
