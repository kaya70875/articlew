import { getSourceName } from "../helpers";

test("extract name from url", () => {
  const string = "https://www.google.com";
  const results = getSourceName(string);

  expect(results).toBe("google");
});
