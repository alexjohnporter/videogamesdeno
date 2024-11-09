import { assert, assertEquals, assertThrows } from "@std/assert";
import { AddReviewHandler } from "./addReview.ts";
import { ReviewRepository } from "../repositories/reviewRepository.ts";

class MockReviewRepository {
  async createNewReview(videoGameId: number, content: string, rating: number) {
    return { id: 1, videoGameId, content, rating };
  }
}

Deno.test("getVideoGameId returns id as a number", () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const result = handler.getVideoGameId("/add-review/12345");

  assertEquals(result, 12345);
});

Deno.test("getVideoGameId returns false if id is not present", () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const result = handler.getVideoGameId("/video-games//add-review");

  assertEquals(result, false);
});

Deno.test("accepts returns true for valid path and method", () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const result = handler.accepts("/add-review/12345", "POST");
  assertEquals(result, true);
});

Deno.test("accepts returns false for invalid path", () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const result = handler.accepts("/random/13343", "POST");

  assertEquals(result, false);
});

Deno.test("returns 400 for bad video game id", async () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const response = await handler.handle(
    new Request("https://example.com/add-review/"),
  );

  assertEquals(response.status, 400);

  const responseBody = await response.json();

  assertEquals(responseBody.message, "Invalid video game id");
});

Deno.test("handle returns JSON response for valid request", async () => {
  const handler = new AddReviewHandler(
    new MockReviewRepository() as unknown as ReviewRepository,
  );

  const response = await handler.handle(
    new Request("https://example.com/add-review/12345"),
  );

  const body = await response.json();

  assert(body.id);
  assertEquals(body.videoGameId, 12345);
});
