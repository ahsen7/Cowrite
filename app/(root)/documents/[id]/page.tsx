import Header from '@/components/common/Header'
import { Editor } from '@/components/editor/Editor'
import React from 'react'

const Document = () => {
  return (
    <div>
        <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
            <p className='document-title'>Fake Document</p>
            </div>
        </Header>
        <Editor/>
    </div>
  )
}

export default Document