'use client'
import { Button } from '@/components/ui/button'
import { getPage } from '@/lib/firebase'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { EyeOff } from 'lucide-react'
import React, { useEffect, useCallback, useMemo } from 'react'
import Recursive from './website-editor-components/recursive'

interface PageResponse {
  id: string;
  content?: string; // 'content' may or may not exist
}

type Props = { 
  funnelPageId: string; 
  liveMode?: boolean; 
  websiteId: string;
}

const FunnelEditor = ({ websiteId, funnelPageId, liveMode }: Props) => {
  const { dispatch, state } = useEditor()

  // Toggles live mode on initial render if liveMode is passed as a prop
  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: 'TOGGLE_LIVE_MODE',
        payload: { value: true },
      })
    }
  }, [liveMode, dispatch])

  // Fetch page data based on funnelPageId and memoize fetch function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PageResponse = await getPage(websiteId, funnelPageId)
        console.log('Fetched page data:', response) // Log the response to inspect its structure

        if (response && response.content) { // Check if 'content' exists and is a string
          dispatch({
            type: 'LOAD_DATA',
            payload: {
              elements: JSON.parse(response.content),
              withLive: !!liveMode,
            },
          })
        } else {
          console.error('No content found in the response')
        }
      } catch (error) {
        console.error('Failed to fetch page data:', error)
      }
    }

    fetchData()
  }, [funnelPageId, websiteId, dispatch, liveMode])

  // Handle click to change the clicked element
  const handleClick = useCallback(() => {
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {},
    })
  }, [dispatch])

  // Handle un-preview and exit live mode
  const handleUnpreview = useCallback(() => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }, [dispatch])

  // Memoize the element rendering to avoid unnecessary re-renders
  const renderedElements = useMemo(() => {
    return (
      Array.isArray(state.editor.elements) &&
      state.editor.elements.map((childElement) => (
        <Recursive key={childElement.id} element={childElement} />
      ))
    )
  }, [state.editor.elements])

  return (
    <div
      className={clsx(
        'use-automation-zoom-in h-full overflow-hidden mr-[385px] bg-background transition-all rounded-md hide-scrool',
        {
          '!p-0 !mr-0': state.editor.previewMode || state.editor.liveMode,
          '!w-[850px]': state.editor.device === 'Tablet',
          '!w-[420px]': state.editor.device === 'Mobile',
          'w-full': state.editor.device === 'Desktop',
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {renderedElements}
    </div>
  )
}

export default React.memo(FunnelEditor)
