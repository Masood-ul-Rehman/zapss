import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
const app = new Hono();

const client = new PrismaClient();
app.get("/", (c) => {
  return c.text("Hello, world!");
});

app.post(
  "/hooks/catch/:userId/:zapId",
  zValidator(
    "param",
    z.object({
      userId: z.string(),
      zapId: z.string(),
    })
  ),
  async (c) => {
    const { userId, zapId } = c.req.param();
    await client.$transaction(async (tx) => {
      const zap = await tx.zapRun.create({
        data: {
          zapId: zapId,
        },
      });
      await tx.zapRunOutbox.create({
        data: {
          zapRunId: zap.id,
        },
      });
    });

    return c.json("zap");
  }
);
app.fire();
