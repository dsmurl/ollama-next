import type { AppType } from "next/app";
import "@/styles/globals.css";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { ThemeProvider } from "@/hooks/useTheme";
import ThemeToggle from "@/components/ThemeToggle";

const MyApp: AppType = ({ Component, pageProps }) => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  // Create a tRPC client
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return (
    <ThemeProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ThemeToggle />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
