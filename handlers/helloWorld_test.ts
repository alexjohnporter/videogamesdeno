import { assertEquals } from "@std/assert";
import { HelloWorldHandler } from "./helloWorld.ts";

const helloHandler = new HelloWorldHandler();

Deno.test("it is the accepts / as a route", () => {
  assertEquals(helloHandler.accepts("/", "GET"), true);
  assertEquals(helloHandler.accepts("/foo", "GET"), false);
});

Deno.test("it only accepts GET requests", () => {
  assertEquals(helloHandler.accepts("/", "GET"), true);
  assertEquals(helloHandler.accepts("/", "POST"), false);
  assertEquals(helloHandler.accepts("/", "PATCH"), false);
  assertEquals(helloHandler.accepts("/", "DELETE"), false);
});

Deno.test("it returns a message with hello world", async () => {
  const resp = await helloHandler.handle(new Request("https://example.com/"));
  const data = await resp.json();

  assertEquals(data.message, "hello world");
});
