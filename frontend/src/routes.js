import { useRouteError, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "stores";

export function RequireAuth() {
  const authStatus = useAuthStore((state) => state.status);
  const location = useLocation();

  if (authStatus !== "authorized") {
    return (
      <Navigate
        to={{ pathname: "/login", state: { from: location } }}
        replace
      />
    );
  }
  return <Outlet />;
}

export function Fallback() {
  return <p>Performing initial data "load"</p>;
}
export function RootErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
}
