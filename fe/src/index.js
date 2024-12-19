import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./components/common/Layout/Layout.css";
import "./assets/css/Sidebar.css";
import "./assets/css/Navbar.css";

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('error', (e) => {
    if (e.message.includes('message channel closed')) {
      e.stopImmediatePropagation();
      console.warn('Ignored message channel error');
      return;
    }
  });

  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.message?.includes('message channel closed')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      console.warn('Ignored message channel promise rejection');
      return;
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
