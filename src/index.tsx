import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CustomThemeProvider from "./Contexts/CustomThemeProvider";
import { LocaleProvider } from "./Contexts/IntlProviderWrapper";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900",
      "Material Icons",
    ],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <CustomThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </CustomThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
