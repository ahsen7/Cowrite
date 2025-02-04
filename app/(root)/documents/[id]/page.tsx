
import CollabRoom from '@/components/common/CollabRoom'
import { getDocumentUsers } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Document = async ({ params: { id } }: SearchParamProps) => {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect('/sign-in')

    const room = await getDocumentUsers({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress,

    });

    if (!room) redirect('/')

    const userIds = Object.keys(room.usersAccesses);
    const users = await getClerkUsers({ userIds });

    console.log("User IDs:", userIds);
    console.log("Fetched Users:", users);


    const userData = users.map((user: User) => ({
        ...user,
        userType: room.usersAccesses[user.email]?.includes('room:write')
            ? 'editor'
            : 'viewer',
    }));

    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.
        includes('room:write')
        ? 'editor'
        : 'viewer';

    return (
        <main className='flex w-full flex-col items-center'>
            <CollabRoom
                roomId={id}
                roomMetadata={room.metadata}
                users={userData}
                currentUserType={currentUserType}
            />
        </main>
    )
}

export default Document