'use client'
import { Badge } from '@/components/ui/badge'
import { EditorBtns, defaultStyles } from '@/lib/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import { Trash } from 'lucide-react'

type Props = { element: EditorElement }

const ProductComponent = ({ element }: Props) => {
  const { id, content, styles } = element
  const { dispatch, state } = useEditor()

  const handleOnClickProduct = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  const handleChangeContent = (field: 'name' | 'price' | 'image', value: string) => {
    dispatch({
      type: 'UPDATE_ELEMENT_CONTENT',
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            [field]: value,
          },
        },
      },
    })
  }

  return (
    <div
      style={styles}
      className={clsx('relative p-4 transition-all group border border-dashed border-slate-300', {
        '!border-blue-500': state.editor.selectedElement.id === id && !state.editor.liveMode,
        '!border-solid': state.editor.selectedElement.id === id && !state.editor.liveMode,
      })}
      onClick={handleOnClickProduct}
    >
      {/* Badge to indicate the selected element */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {element.name}
        </Badge>
      )}

      {/* Editable Image */}
      <div className="mb-4">
        <img
          src={element.content.image || 'https://via.placeholder.com/150'}
          alt="Product"
          className="w-[150px] h-[150px] object-cover cursor-pointer"
          onClick={() => {
            const newImage = prompt('Enter new image URL', element.content.image)
            if (newImage) handleChangeContent('image', newImage)
          }}
        />
      </div>

      {/* Editable Product Name */}
      <div
        className="text-lg font-bold text-gray-600 cursor-pointer mb-2"
        onClick={() => {
          const newName = prompt('Enter new product name', element.content.name)
          if (newName) handleChangeContent('name', newName)
        }}
      >
        {element.content.name || 'Product Name'}
      </div>

      {/* Editable Product Price */}
      <div
        className="text-lg text-gray-600 cursor-pointer"
        onClick={() => {
          const newPrice = prompt('Enter new product price', element.content.price)
          if (newPrice) handleChangeContent('price', newPrice)
        }}
      >
        {element.content.price || '$0.00'}
      </div>

      {/* Delete button */}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
          <Trash size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </div>
  )
}

export default ProductComponent
