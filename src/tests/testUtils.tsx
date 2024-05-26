import React, { PropsWithChildren } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { RootState, AppStore, setupStore } from "../redux/store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Layout from "@layout/index";

afterEach(() => {
  cleanup();
});

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

interface Option {
  initialURL: string;
  routePath: string;
  newRoutes?: React.ReactElement;
}

export function renderWithProviders(
  ui: React.ReactElement,
  option?: Option,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[option ? option.initialURL : ""]}>
          <Routes>
            <Route element={<Layout />}>
              <Route path={option ? option.routePath : ""} element={children}>
                {option?.newRoutes ? option?.newRoutes : <></>}
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
