import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import createStore from "../toolkit/app/store";

type TAppProvider = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: TAppProvider) {
  const queryClient = new QueryClient();
  const store = createStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
