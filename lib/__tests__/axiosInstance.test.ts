import { getSession } from "next-auth/react";
import { AuthAxios } from "../axoisInstance";
import { server } from "../../mocks/node";

server.listen();
jest.mock("next-auth/react");

describe("AccessToken", () => {
  it("should retry with new token if the first token is expired", async () => {
    // Mock session - first one is expired, second one is new
    (getSession as jest.Mock)
      .mockResolvedValueOnce({
        accessToken: "expired-token",
        provider: "credentials",
      }) // Initial call
      .mockResolvedValueOnce({
        accessToken: "new-token",
        provider: "credentials",
      }); // After refresh

    const axiosInstance = AuthAxios();

    const response = await axiosInstance.get("/protected");

    expect(response.status).toBe(200);
  });
});
