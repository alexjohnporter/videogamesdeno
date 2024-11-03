import { AddReviewHandler } from "./handlers/addReview.ts";
import { HandlerStrategy } from "./handlers/handlerStrategyInterface.ts";
import { HelloWorldHandler } from "./handlers/helloWorld.ts";
import { VideoGamesHandler } from "./handlers/videoGames.ts";
import { JsonResponse } from "./JsonResponse.ts";

export class StrategyHandler {
  private strategies: HandlerStrategy[] = [
    new HelloWorldHandler(),
    new VideoGamesHandler(),
    new AddReviewHandler()
    // ... other strategies
  ];

  public async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const pathName = url.pathname;
    const method = req.method;

    for (const strategy of this.strategies) {
      if (strategy.accepts(pathName, method)) {
        return strategy.handle(req);
      }
    }

    return JsonResponse({message: 'Page not found'}, 404)
  }
}
