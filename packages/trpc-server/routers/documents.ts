import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { title } from "process";

export const documentsRoutes = router({
  createDoc: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        initialContent: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, initialContent } = input;
      const userId = ctx.auth.id;

      const newDoc = await ctx.db.document.create({
        data: {
          title,
          initialContent,
          userId,
        },
      });

      return newDoc;
    }),
  deleteDoc: protectedProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.document.delete({
        where: {
          id: input.docId,
        },
      });
    }),

  getAllDocs: protectedProcedure.query(async ({ ctx, input }) => {
    const Docs = await ctx.db.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return Docs;
  }),

  updateDocs: protectedProcedure
    .input(
      z.object({
        docId: z.string(),
        title: z.string().optional(),
        initialContent: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { docId, title, initialContent } = input;

      await ctx.db.document.update({
        where: { id: docId },
        data: {
          ...(title && { title }),
          ...(initialContent && { initialContent }),
        },
      });
    }),
});
