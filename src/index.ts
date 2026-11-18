import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to Elysia + Drizzle + MySQL API with Bun",
  }))
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .group("/api", (app) =>
    app
      .get("/users", async ({ set }) => {
        try {
          const allUsers = await db.select().from(users);
          return { data: allUsers };
        } catch (error) {
          set.status = 500;
          return {
            error: "Database error",
            details: error instanceof Error ? error.message : "Unknown error",
          };
        }
      })
      .post(
        "/users",
        async ({ body, set }) => {
          try {
            await db.insert(users).values({
              name: body.name,
              email: body.email,
            });
            set.status = 201;
            return { message: "User created successfully" };
          } catch (error) {
            set.status = 500;
            return {
              error: "Database error",
              details: error instanceof Error ? error.message : "Unknown error",
            };
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
          }),
        }
      )
  )
  .listen(port, () => {
    console.log(`🦊 Elysia is running at http://localhost:${port}`);
  });

export type App = typeof app;
