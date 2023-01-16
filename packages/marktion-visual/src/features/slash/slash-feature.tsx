import React, { useEffect, useState } from 'react'
import { Dropdown } from 'antd'
import { Range } from 'slate'
import { useHotkey } from 'marktion-share'
import { Anchor } from '../mark/anchor'
import { useVisual } from '../../hooks'
import { VisualMarktion } from '../../VisualMarktion'
import { TransformActions } from '../../model/actions/Actions'
import { EditEnhanceActionPayload, EditEnhanceActions } from '../../model/actions/Actions'
import { SlashHelper } from './helper'

export const SlashFeature = () => {
  const visual = useVisual()
  const [slashDropdownOpen, setSlashDropdownOpen] = useState(false)
  const slashEditEnhance = useSlashEditEnhance(visual)
  const menuItems = [
    { label: '文本', key: 'paragraph', action: TransformActions.toParagraph },
    { label: '标题1', key: 'heading-1', payload: 1, action: TransformActions.toHeading },
    { label: '标题2', key: 'heading-2', payload: 2, action: TransformActions.toHeading },
    { label: '标题3', key: 'heading-3', payload: 3, action: TransformActions.toHeading },
  ]
  const [selectedKey, setSelectedKey] = useState(menuItems[0].key)

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

  useEffect(() => setSlashDropdownOpen(Boolean(slashEditEnhance)), [slashEditEnhance])

  useEffect(() => {
    if (!slashDropdownOpen) {
      visual.editor.disposeEditEnhance()
    }
  }, [slashDropdownOpen])

  useHotkey('enter', e => {
    if (slashDropdownOpen) {
      e.preventDefault()
      e.stopPropagation()

      const item = menuItems.find(item => item.key === selectedKey)!

      SlashHelper.dispatch(visual, item.action, item.payload as any)
    }
  })

  useHotkey('arrowUp', e => {
    if (slashDropdownOpen) {
      e.preventDefault()
      e.stopPropagation()
      prev()
    }
  })

  useHotkey('arrowDown', e => {
    if (slashDropdownOpen) {
      e.preventDefault()
      e.stopPropagation()
      next()
    }
  })

  useHotkey('arrowLeft', e => {
    if (slashDropdownOpen) {
      e.preventDefault()
      e.stopPropagation()
    }
  })

  return (
    <Dropdown
      menu={{
        onClick: ({ key }) => {
          const menuItem = menuItems.find(item => {
            return item.key === key
          })

          if (!menuItem) return

          SlashHelper.dispatch(visual, menuItem.action, menuItem.payload as any)
        },
        items: menuItems,
        selectedKeys: [selectedKey],
        selectable: true,
      }}
      open={slashDropdownOpen}
      onOpenChange={setSlashDropdownOpen}
      trigger={['click']}
    >
      <Anchor range={slashEditEnhance?.anchor} />
    </Dropdown>
  )
}

function useSlashEditEnhance(visual: VisualMarktion) {
  type Slash = { anchor: Range; word: string }

  const [mark, setSlash] = useState<Slash | null>(null)

  useEffect(() => {
    const onSlashEnhance = (options: EditEnhanceActionPayload) => {
      if (options.visible) {
        setSlash({
          anchor: options.anchor,
          word: options.word,
        })
      } else {
        setSlash(null)
      }
    }

    visual.registeAction(EditEnhanceActions.slash, onSlashEnhance)

    return () => {
      visual.unregisteAction(EditEnhanceActions.slash, onSlashEnhance)
    }
  }, [mark])

  return mark
}
