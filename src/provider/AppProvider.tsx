import { QueryClientProvider, QueryClient } from "react-query";

type AppProvider = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
