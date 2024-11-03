import { supabase } from "../dbClient.ts";
import { JsonResponse } from "../JsonResponse.ts";
import { HandlerStrategy } from "./handlerStrategyInterface.ts";
import generateWords from "jsr:@biegomar/lorem";

export class AddReviewHandler implements HandlerStrategy {
  getVideoGameId(pathName: string): number | boolean {
    const id = pathName.split("/")[2];

    if (!id) {
      return false;
    }

    return parseInt(id);
  }

  accepts(pathName: string, method: string): boolean {
    return pathName.includes("/add-review") && !!this.getVideoGameId(pathName);
  }

  async handle(req: Request): Promise<Response> {
    const videoGameId = this.getVideoGameId(new URL(req.url).pathname);

    //todo - add check against api to ensure video game exists
    const review = {
      'videogame_id': videoGameId,
      'review': generateWords(Math.floor(Math.random() * 100) + 10),
      'rating': Math.floor(Math.random() * 10) + 1
    };

    await supabase.from('videogame_reviews').insert([review]).select();

    return JsonResponse(review);
  }
}
