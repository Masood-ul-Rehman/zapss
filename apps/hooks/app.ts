
import { Hono } from "hono";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, world!");
});

app.get("/hello/:name", (c) => {
  return c.text(`Hello, ${c.req.param("name")}!`);
}); 
app.fire();