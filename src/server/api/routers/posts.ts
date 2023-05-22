
import type { User } from "@clerk/nextjs/dist/api";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterUserForClient = (user: User ) => {
  return {id: user.id, username: user.username, profileImageUrl: user.profileImageUrl}
}
export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async({ ctx }) => {
    const posts =await ctx.prisma.post.findMany({take:100});
    const users =(
      await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit:100,
     })
    ).map(filterUserForClient);

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
      orderBy: [{ createdAt: "desc" }],
    }));
  }),

  create: privateProcedure
  .input(
    z.object({
      content: z.string().emoji().min(1).max(280),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;

    const post = await ctx.prisma.post.create({
      data: {
        authorId,
        content: input.content,
      },
    });

    return post;
  }),
});
