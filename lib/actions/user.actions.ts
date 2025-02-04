'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    
    const users = await Promise.all(
      userIds.map(async (email) => {
        try {
          const userList = await clerkClient.users.getUserList({
            emailAddress: [email], // Filter by email
          });
          const user = userList[0]; // Get the first user (if found)
          if (user) {
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.emailAddresses[0].emailAddress,
              avatar: user.imageUrl,
            };
          }
          return null; // Return null if no user is found
        } catch (error) {
          console.error(`Error fetching user with email ${email}:`, error);
          return null;
        }
      })
    );

    // Filter out null values (invalid or missing users)
    const validUsers = users.filter((user) => user !== null);

    return parseStringify(validUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return parseStringify([]); // Return an empty array in case of error
  }
};