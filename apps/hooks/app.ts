import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../../packages/db";
import { zapRunOutboxes, zapRuns } from "../../packages/db/schema";
const app = new Hono();

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
    await db.transaction(async (tx) => {
      const [zap] = await tx
        .insert(zapRuns)
        .values({
          zapId: zapId,
        })
        .returning({ id: zapRuns.id });
      await tx.insert(zapRunOutboxes).values({
        zapRunId: zap.id,
      });

      return c.json("zap");
    });
  }
);
app.fire();
