'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { upsertWebsitePage } from '@/lib/firebase'
// import { saveActivityLogsNotification, upsertFunnelPage } from '@/lib/queries'
import { DeviceTypes, useEditor } from '@/providers/editor/editor-provider'
// Remove this line: import { FunnelPage } from '@prisma/client'
import clsx from 'clsx'
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FocusEventHandler, useEffect } from 'react'
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

type Props = {
  funnelId: string
  funnelPageDetails: any // Use a more specific type if available
}

const FunnelEditorNavigation = ({
  funnelId,
  funnelPageDetails,
}: Props) => {
  const router = useRouter()
  const { state, dispatch } = useEditor()
  const content = state.editor.elements;

  useEffect(() => {
    dispatch({
      type: 'SET_FUNNELPAGE_ID',
      payload: { funnelPageId: funnelPageDetails.id },
    })
  }, [funnelPageDetails])

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value === funnelPageDetails.name) return
    if (event.target.value) {
      await upsertWebsitePage(funnelId, funnelPageDetails.id, content);

      toast('Success', {
        description: 'Saved Funnel Page title',
      })
      router.refresh()
    } else {
      toast('Oppse!', {
        description: 'You need to have a title!',
      })
      event.target.value = funnelPageDetails.name
    }
  }

  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }

  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }

  const handleOnSave = async () => {
    try {
       const reponse = await upsertWebsitePage(funnelId, funnelPageDetails.id, content);
        alert("Saved successfully")
    } catch (error) {
      toast('Oops!', {
        description: 'Could not save editor',
        style: {
          backgroundColor: '#FF4D4D',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '16px',
        },
      });
    }
  };

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          'border-b-[1px] border-gray-700 bg-gray-900 text-gray-200 flex items-center justify-between p-6 gap-2 transition-all',
          { '!h-0 !p-0 !overflow-hidden': state.editor.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link href={`/dashboard/websites/${funnelId}`}>
            <ArrowLeftCircle className="text-gray-400 hover:text-white" />
          </Link>
          <div className="flex flex-col w-full ">
            <Input
              defaultValue={funnelPageDetails.name}
              className="bg-gray-800 text-white border-none h-5 m-0 p-0 text-lg"
              onBlur={handleOnBlurTitleChange}
              value={`/${funnelPageDetails.id}`}
            />
            <span className="text-sm text-gray-400">
               View Your Live website
            </span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: 'CHANGE_DEVICE',
                payload: { device: value as DeviceTypes },
              })
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-gray-700 w-10 h-10 p-0 text-gray-400 hover:text-white"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="data-[state=active]:bg-gray-700 w-10 h-10 p-0 text-gray-400 hover:text-white"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="data-[state=active]:bg-gray-700 w-10 h-10 p-0 text-gray-400 hover:text-white"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-gray-700 text-gray-400"
            onClick={handlePreviewClick}
          >
            <EyeIcon />
          </Button>
          <Button
            disabled={!(state.history.currentIndex > 0)}
            onClick={handleUndo}
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-gray-700 text-gray-400"
          >
            <Undo2 />
          </Button>
          <Button
            disabled={!(state.history.currentIndex < state.history.history.length - 1)}
            onClick={handleRedo}
            variant={'ghost'}
            size={'icon'}
            className="hover:bg-gray-700 text-gray-400 mr-4"
          >
            <Redo2 />
          </Button>
          <div className="flex flex-col item-center mr-4 text-gray-400">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch disabled defaultChecked={true} />
              Publish
            </div>
            <span className="text-sm">Last updated yesterday</span>
          </div>
          <Button className="bg-green-500 text-white" onClick={handleOnSave}>
            Save
          </Button>
        </aside>
      </nav>
    </TooltipProvider>
  )
}

export default FunnelEditorNavigation;
