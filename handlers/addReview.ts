import { JsonResponse } from "../JsonResponse.ts";
import { ReviewRepository } from "../repositories/reviewRepository.ts";
import { HandlerStrategy } from "./handlerStrategyInterface.ts";
import generateWords from "jsr:@biegomar/lorem";

export class AddReviewHandler implements HandlerStrategy {
  private reviewRepository: ReviewRepository;

  constructor() {
    //use proper DI here
    this.reviewRepository = new ReviewRepository();
  }

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

    if (typeof videoGameId !== "number") {
      throw new Error("Bad video game id");
    }

    const review = await this.reviewRepository.createNewReview(
      videoGameId,
      generateWords(Math.floor(Math.random() * 100) + 10),
      Math.floor(Math.random() * 10) + 1,
    );

    return JsonResponse(review);
  }
}
