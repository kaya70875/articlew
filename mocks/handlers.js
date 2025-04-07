import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://127.0.0.1:8000/api/protected", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || authHeader === "Bearer expired-token") {
      return new HttpResponse(null, {
        status: 401,
      });
    }

    return new HttpResponse(null, {
      status: 200,
    });
  }),

  http.options("http://127.0.0.1:8000/api/protected", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
