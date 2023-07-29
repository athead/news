import { render } from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
