import { Client } from "https://deno.land/x/postgres/mod.ts";
import { load } from "jsr:@std/dotenv";

const envVars = await load();

export class ReviewRepository {
  private client: Client;

  constructor() {
    this.client = new Client(envVars.DATABASE_URL);
  }

  async createNewReview(
    videoGameId: number,
    reviewText: string,
    rating: number,
  ) {
    await this.client.connect();

    await this.client.queryArray(
      `INSERT INTO reviews (videogame_id, review, rating) VALUES ($videoGameId, $reviewText, $rating)`,
      {
        videoGameId,
        reviewText,
        rating,
      },
    );

    await this.client.end();

    return { status: "successful", data: { videoGameId, reviewText, rating } };
  }

  async getReviews(videoGameId: number | null = null) {
    await this.client.connect();
    let results = null;

    if (videoGameId) {
      results = await this.client.queryObject(
        "SELECT * FROM reviews WHERE videogame_id = $videoGameId",
        { videoGameId },
      );
    } else {
      results = await this.client.queryObject("SELECT * FROM reviews");
    }

    await this.client.end();

    return { status: "successful", data: results.rows };
  }
}
