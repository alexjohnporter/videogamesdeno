import { client } from "../dbClient.ts";
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
    await client.connect();

    const review = await client.queryArray(`INSERT INTO reviews (videogame_id, review, rating) VALUES ($videoGameId, $review, $rating)`, {
      videoGameId,
      review: generateWords(Math.floor(Math.random() * 100) + 10),
      rating: Math.floor(Math.random() * 10) + 1
    })

    await client.end();
    //todo - add check against api to ensure video game exists
    // const review = {
      // 'videogame_id': videoGameId,
      // 'review': generateWords(Math.floor(Math.random() * 100) + 10),
      // 'rating': Math.floor(Math.random() * 10) + 1
    // };

    // const review = await prisma.reviews.create({
    //   data : {
    //     'videogame_id': videoGameId,
    //   'review': generateWords(Math.floor(Math.random() * 100) + 10),
    //   'rating': Math.floor(Math.random() * 10) + 1
    //   }
    // })
    return JsonResponse(review);
  }
}
