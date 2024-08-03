import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { App as AntdApp, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          zIndexBase: 9999,
          zIndexPopupBase: 9999,
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </>
);
