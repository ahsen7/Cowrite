'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/common/Header'
import { Editor } from '@/components/editor/Editor'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Loader from './Loader'
import ActiveCollaborators from '../ActiveCollaborators'
import { Input } from '../ui/input'
import Image from 'next/image'
import { updateDocument } from '@/lib/actions/room.actions'

const CollabRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {

    const currentUserType = 'editor';

    const [documentTitle, setdocumentTitle] = useState(roomMetadata.title);
    const [isEditing, setisEditing] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const titleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setisLoading(true);

            try {
                if (documentTitle !== roomMetadata.title) {
                    const updatedDocument = await updateDocument(roomId, documentTitle);

                    if (updatedDocument) {
                        setisEditing(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }

            setisLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                updateDocument(roomId, documentTitle);
                setisEditing(false);

            };
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [roomId, documentTitle])

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing])


    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className='collaborative-room'>
                    <Header>
                        <div
                            ref={containerRef}
                            className='flex w-fit items-center justify-center gap-2'>

                            {isEditing ? (
                                <Input
                                    type='text'
                                    value={documentTitle}
                                    ref={inputRef}
                                    placeholder='Enter a title'
                                    onChange={(e) => setdocumentTitle(e.target.value)}
                                    onKeyDown={titleHandler}
                                    disabled={!isEditing}
                                    className='document-title-input'
                                    autoFocus
                                    onBlur={() => setisEditing(false)}
                                />
                            ) : (
                                <p className='document-title' onClick={() => setisEditing(true)}>
                                    {documentTitle}
                                </p>
                            )}

                            {currentUserType === 'editor' && !isEditing &&
                                <Image
                                    src='/assets/icons/edit.svg'
                                    alt='edit'
                                    width={24}
                                    height={24}
                                    onClick={() => setisEditing(true)}
                                    className='pointer cursor-pointer'
                                />
                            }
                            {currentUserType !== 'editor' && !isEditing && (
                                <p className='view-only-tag'>View Only</p>
                            )}

                            {isLoading && <p className='text-sm text-gray-400'>Saving...</p>}
                        </div>
                        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                            <ActiveCollaborators />
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
