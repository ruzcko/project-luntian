import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FirestoreProvider } from "./contexts/FirestoreContext";
import { AdminProvider } from "./contexts/AdminContext";

ReactDOM.render(
  <FirestoreProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </FirestoreProvider>,
  document.getElementById("root")
);
