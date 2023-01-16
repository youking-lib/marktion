import { Range } from 'slate'
import { Dropdown, PopoverProps, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHotkey } from 'marktion-share'
import { EditEnhanceActionPayload, EditEnhanceActions } from '../../model/actions/Actions'
import { VisualMarktion } from '../../VisualMarktion'
import { useVisual } from '../../hooks'
import { markPlugin } from './plugin'
import { MarkHelper } from './helper'
import { Anchor } from './anchor'

export type MarkOption = { mark: string; label: string; key: string }

export type MarkFeatureProps = {
  onOpenChange?: PopoverProps['onOpenChange']
  onWordChange?: (word: string) => void
  onInsertMark?: (item: MarkOption) => void
  menuProps?: Omit<MenuProps, 'items'> & {
    items: MarkOption[]
  }
}

export const MarkFeature: React.FC<MarkFeatureProps> = ({
  menuProps = {},
  onOpenChange,
  onWordChange,
  onInsertMark,
}) => {
  const visual = useVisual()
  const markEditEnhance = useMarkEditEnhance(visual)
  const [markPanelOpen, setMarkPanelOpen] = useState(false)
  const menuItems: MarkOption[] = menuProps.items || []
  const [selectedKey, setSelectedKey] = useState((menuItems[0]?.key as string) || '')

  const next = () => {
    let selectIndex = menuItems.findIndex(item => item.key === selectedKey)

    if (selectIndex === menuItems.length - 1) {
      selectIndex = 0
    } else {
      selectIndex++
    }

    setSelectedKey(menuItems[selectIndex].key)
  }

  const prev = () => {
    let selectIndex = menuItems.findIndex(item => item.key === selectedKey)

    if (selectIndex === 0) {
      selectIndex = menuItems.length - 1
    } else {
      selectIndex--
    }

    setSelectedKey(menuItems[selectIndex].key)
  }

  useEffect(() => {
    visual.use(markPlugin)
  }, [])

  useEffect(() => {
    setSelectedKey((menuItems[0]?.key as string) || '')
  }, [menuItems])

  useEffect(() => {
    if (markEditEnhance) {
      onWordChange && onWordChange(markEditEnhance.word)
      setMarkPanelOpen(true)
    } else {
      setMarkPanelOpen(false)
    }
  }, [markEditEnhance])

  useEffect(() => {
    if (!markPanelOpen) {
      visual.editor.disposeEditEnhance()
    }
  }, [markPanelOpen])

  useEffect(() => {
    onOpenChange && onOpenChange(markPanelOpen)
  }, [markPanelOpen])

  useHotkey('arrowUp', e => {
    if (markPanelOpen) {
      e.preventDefault()
      e.stopPropagation()
      prev()
    }
  })

  useHotkey('arrowDown', e => {
    if (markPanelOpen) {
      e.preventDefault()
      e.stopPropagation()
      next()
    }
  })

  useHotkey('arrowLeft', e => {
    if (markPanelOpen) {
      e.preventDefault()
      e.stopPropagation()
    }
  })

  useHotkey('enter', e => {
    if (markPanelOpen) {
      e.preventDefault()
      e.stopPropagation()

      handleInsertMark({
        key: selectedKey,
      })
    }
  })

  const handleInsertMark = ({ key }: { key: string }) => {
    const menuItem = menuItems.find(item => item?.key === key)

    if (menuItem) {
      onInsertMark && onInsertMark(menuItem)
      MarkHelper.insertMark(visual, menuItem['mark'])
    }
  }

  return (
    <Dropdown
      menu={{
        onClick: handleInsertMark,
        items: menuItems,
        selectedKeys: [selectedKey],
        selectable: true,
      }}
      open={markPanelOpen}
      onOpenChange={setMarkPanelOpen}
      trigger={['click']}
    >
      <Anchor range={markEditEnhance?.anchor} />
    </Dropdown>
  )
}

function useMarkEditEnhance(visual: VisualMarktion) {
  type Mark = { anchor: Range; word: string }

  const [mark, setMark] = useState<Mark | null>(null)

  useEffect(() => {
    const onMarkEnhance = (options: EditEnhanceActionPayload) => {
      if (options.visible) {
        setMark({
          anchor: options.anchor,
          word: options.word,
        })
      } else {
        setMark(null)
      }
    }

    visual.registeAction(EditEnhanceActions.mark, onMarkEnhance)

    return () => {
      visual.unregisteAction(EditEnhanceActions.mark, onMarkEnhance)
    }
  }, [mark])

  return mark
}
