import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    "An unexpected error occured, Please try again later."
  );

  expect(alerts).toHaveLength(2);
});
