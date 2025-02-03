'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React from 'react'
import Header from '@/components/common/Header'
import { Editor } from '@/components/editor/Editor'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Loader from './Loader'
import ActiveCollaborators from '../ActiveCollaborators'

const CollabRoom = ({roomId, roomMetadata}: CollaborativeRoomProps) => {
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader/>}>
                <div className='collaborative-room'>
                    <Header>
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <p className='document-title'>Share</p>
                            </div>
                            <div className="flex w-full flex-1 justify-end  gap-2 sm:gap-3">
                                <ActiveCollaborators/>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            </div>
                        
                    </Header>

                    <Editor />

                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollabRoom