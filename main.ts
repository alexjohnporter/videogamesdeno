import { StrategyHandler } from "./strategyHandler.ts";

Deno.serve((req: Request) => {
  const strategyHandler = new StrategyHandler();

  return strategyHandler.handle(req);
});
