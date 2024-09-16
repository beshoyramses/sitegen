import { EditorBtns } from '@/lib/constants';
import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

type Props = {}

const ProductComponentPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'product')}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <InventoryIcon className='text-black'/>
    </div>
  )
}

export default ProductComponentPlaceholder;