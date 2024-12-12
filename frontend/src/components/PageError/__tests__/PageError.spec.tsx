import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import { PageError } from "..";

vi.mock("react-router-dom", () => ({
  useRouteError: () => ({}),
  isRouteErrorResponse: () => false,
}));

describe("PageError", () => {
  it("renders without crashing", () => {
    render(<PageError />);
  });
});
