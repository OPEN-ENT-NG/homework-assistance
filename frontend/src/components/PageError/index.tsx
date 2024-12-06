/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function PageError() {
  const error = useRouteError();

  console.error("An error has occurred:", error);

  const getErrorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
      return error.statusText || error.data?.message || "Unknown error";
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    return "Unknown error occurred";
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{getErrorMessage(error)}</i>
      </p>
    </div>
  );
}
