import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContextProvider } from "./AppContext";
import { App } from "./App";

function main(target, container) {
  ReactDOM.render(target, container);
}

main(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("root")
);