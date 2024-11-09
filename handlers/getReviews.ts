import { JsonResponse } from "../JsonResponse.ts";
import { ReviewRepository } from "../repositories/reviewRepository.ts";
import { HandlerStrategy } from "./handlerStrategyInterface.ts";

export class GetReviewsHandler implements HandlerStrategy {
  private reviewRepository: ReviewRepository;

  constructor() {
    //use proper DI here
    this.reviewRepository = new ReviewRepository();
  }

  accepts(pathName: string, _method: string): boolean {
    return pathName.includes("/reviews");
  }

  async handle(_req: Request): Promise<Response> {
    const url = new URL(_req.url);
    const params = new URLSearchParams(url.search);
    const videogameId = params.get("videogameId");
    let data;

    if (!videogameId) {
      data = await this.reviewRepository.getReviews();
    } else {
      data = await this.reviewRepository.getReviews(parseInt(videogameId));
    }

    return JsonResponse(data);
  }
}
