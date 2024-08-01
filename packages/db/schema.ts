
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
   
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm/relations";
  
  export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  
  export const userRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
  }));
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
      createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
        () => new Date()
      ),
      updatedAt: timestamp("updated_at", { mode: "date" })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  );
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  export const verificationTokens = pgTable(
    "verification_token",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compoundKey: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  );
  export const zaps = pgTable("zap", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    triggerId: text("triggerId"),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  
  export const triggers = pgTable("trigger", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    zapId: text("zapId").unique(),
    triggerId: text("triggerId"),
    sortingOrder: integer("sortingOrder"),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  
  export const availableTriggers = pgTable("available_trigger", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
  });
  
  export const actions = pgTable("action", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    zapId: text("zapId").notNull(),
    actionId: text("actionId").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  
  export const availableActions = pgTable("available_action", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
  });
  
  export const zapRuns = pgTable("zap_run", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    zapId: text("zapId").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  
  export const zapRunOutboxes = pgTable("zap_run_outbox", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    zapRunId: text("zapRunId").unique().notNull(),
  });
  
  // Relations for Zap and related tables
  export const zapRelations = relations(zaps, ({ many, one }) => ({
    trigger: one(triggers, {
      fields: [zaps.triggerId],
      references: [triggers.id],
    }),
    actions: many(actions),
    zapRuns: many(zapRuns),
  }));
  
  export const triggerRelations = relations(triggers, ({ one }) => ({
    zap: one(zaps, {
      fields: [triggers.zapId],
      references: [zaps.id],
    }),
    type: one(availableTriggers, {
      fields: [triggers.triggerId],
      references: [availableTriggers.id],
    }),
  }));
  
  export const actionRelations = relations(actions, ({ one }) => ({
    zap: one(zaps, {
      fields: [actions.zapId],
      references: [zaps.id],
    }),
    type: one(availableActions, {
      fields: [actions.actionId],
      references: [availableActions.id],
    }),
  }));
  
  export const zapRunRelations = relations(zapRuns, ({ one }) => ({
    zap: one(zaps, {
      fields: [zapRuns.zapId],
      references: [zaps.id],
    }),
    zapRunOutbox: one(zapRunOutboxes, {
      fields: [zapRuns.id],
      references: [zapRunOutboxes.zapRunId],
    }),
  }));
  
  // Define the Run model
  export const runs = pgTable("run", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    zapRunId: text("zapRunId").notNull(),
    status: text("status").notNull(),
    error: text("error"),
    createdAt: timestamp("created_at", { mode: "date" }).$defaultFn(
      () => new Date()
    ),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  });
  