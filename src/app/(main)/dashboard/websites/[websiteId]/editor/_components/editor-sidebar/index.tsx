'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'
import TabList from './tabs'
import SettingsTab from './tabs/settings-tab'
import MediaBucketTab from './tabs/media-bucket-tab'
import ComponentsTab from './tabs/components-tab'

type Props = {
  subaccountId: string
}

const FunnelEditorSidebar = ({ subaccountId }: Props) => {
  const { state } = useEditor()

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        {/* Sidebar tabs navigation */}
        <SheetContent
          side="right"
          className={clsx(
            'mt-[97px] w-16 z-[80] shadow-none p-0 transition-all overflow-hidden bg-gray-900',
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>

        {/* Main content of the sidebar */}
        <SheetContent
          side="right"
          className={clsx(
            'mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-gray-800 text-gray-200 h-full transition-all overflow-hidden hide-scrool',
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-x-hidden">
            {/* Settings Tab */}
            <TabsContent value="Settings" >
              <SheetHeader className="text-left p-6" >
                <SheetTitle className="text-white">Styles</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="Media">
              <MediaBucketTab subaccountId={subaccountId} />
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6">
                <SheetTitle className="text-white">Components</SheetTitle>
                <SheetDescription className="text-gray-400">
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  )
}

export default FunnelEditorSidebar
