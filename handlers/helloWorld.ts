import { JsonResponse } from "../JsonResponse.ts";
import { HandlerStrategy } from "./handlerStrategyInterface.ts";

export class HelloWorldHandler implements HandlerStrategy {
  accepts(pathName: string, method: string): boolean {
    return pathName === "/" && method === "GET";
  }

  async handle(_req: Request): Promise<Response> {
    return JsonResponse({ message: "hello world" });
  }
}
