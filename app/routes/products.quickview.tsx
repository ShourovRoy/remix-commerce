import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

const QuickView = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default QuickView;

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Errors km</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
