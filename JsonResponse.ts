export const JsonResponse = (
  content: object | string,
  status: number = 200,
): Response => {
  return new Response(JSON.stringify(content), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
};
