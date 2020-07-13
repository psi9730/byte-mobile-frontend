import React from "react";
import ReactDOM from "react-dom";
import Root from "./app";
import * as serviceWorker from "./registerServiceWorker";

ReactDOM.render(<Root />, document.getElementById("root"));
// registerServiceWorker();
// serviceWorker.unregister();
serviceWorker.register();
