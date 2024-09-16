'use client'
import { useModal } from '@/providers/ModalProvider'
import React from 'react'
import { Button } from '../ui/button'
// import CustomModal from '../global/custom-modal'
// import UploadMediaForm from '../forms/upload-media'

type Props = {
  subaccountId: string
}

const MediaUploadButton = () => {
  return (
    <Button>
      Upload
    </Button>
  )
}

export default MediaUploadButton