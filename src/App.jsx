import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { lazy } from "react";
import { Suspense } from "react";
import AppLayout from "./pages/AppLayout";

const FavoritePage = lazy(() => import("./pages/FavoritePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />,
      },
    ],
  },
]);
function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center h-screen items-center">
          <CircularProgress />
        </div>
      }
    >
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
