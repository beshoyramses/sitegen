import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/global/loading'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'

type Props = {
  element: EditorElement
}

const Checkout = (props: Props) => {
  const { dispatch, state, funnelId } = useEditor()
  const [paymentToken, setPaymentToken] = useState('')
  const styles = props.element.styles

  useEffect(() => {
    const fetchPaymentToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}api/paymob/create-payment-token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              funnelId,
              // Add any required information for Paymob payment here
            }),
          }
        )
        const data = await response.json()
        if (data && data.token) {
          setPaymentToken(data.token)
        } else {
          throw new Error('Failed to retrieve payment token')
        }
      } catch (error) {
        console.error('Error fetching payment token:', error)
      }
    }

    if ( funnelId) {
      fetchPaymentToken()
    }
  }, [funnelId])

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'checkoutForm')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div className="border-none transition-all w-full">
        <div className="flex flex-col gap-4 w-full">
          {paymentToken ? (
            <iframe
              src={`https://accept.paymob.com/api/acceptance/iframes/868689?payment_token=${paymentToken}`}
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <Loading />
            </div>
          )}
        </div>
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  )
}

export default Checkout
