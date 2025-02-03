
import CollabRoom from '@/components/common/CollabRoom'
import { getDocumentUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Document = async ({params: { id }}: SearchParamProps) => {
    const clerkUser = await currentUser();
    if(!clerkUser) redirect('/sign-in')

        const room = await getDocumentUsers({
            roomId: id,
            userId: clerkUser.emailAddresses[0].emailAddress,
            
        });

        if(!room) redirect('/')

    return (
        <main className='flex w-full flex-col items-center'>
            <CollabRoom 
            roomId={id}
            roomMetadata={room.metadata}
            />
        </main>
    )
}

export default Document