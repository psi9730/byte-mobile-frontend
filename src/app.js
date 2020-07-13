import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./shared/App"
import useApi, { ApiProvider } from "react-use-api"

const Root = () => (
  <ApiProvider>
    <Router>
      <App />
    </Router>
  </ApiProvider>
)

export default Root
