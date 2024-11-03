import { JsonResponse } from "../JsonResponse.ts";
import { HandlerStrategy } from "./handlerStrategyInterface.ts";

export class VideoGamesHandler implements HandlerStrategy {
  accepts(pathName: string, method: string): boolean {
    return pathName === "/videogames" && method === "GET";
  }

  async handle(_req: Request): Promise<Response> {
    const videoGamesResponse = await fetch(
      "https://www.freetogame.com/api/games",
    );

    const games = await videoGamesResponse.json();

    return JsonResponse({ games });
  }
}
