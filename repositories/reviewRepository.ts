import { Client } from "https://deno.land/x/postgres/mod.ts";
import { load } from "jsr:@std/dotenv";

const envVars = await load();

export class ReviewRepository {
    private client: Client;

    constructor() {
        this.client = new Client(envVars.DATABASE_URL);
    }

    async createNewReview(videoGameId: number, reviewText: string, rating: number) {
        await this.client.connect();

        const review = await this.client.queryArray(`INSERT INTO reviews (videogame_id, review, rating) VALUES ($videoGameId, $reviewText, $rating)`, {
          videoGameId,
          reviewText,
          rating, 
        })
    
        await this.client.end();

        return review;
    }
}