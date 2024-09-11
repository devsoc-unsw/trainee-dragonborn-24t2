import React from "react";
import ReactDOM from "react-dom/client";
import { FirebaseAppProvider } from "reactfire";
import App from "./App.tsx";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyA6DP8RSD3SeJs2YqPpoQ1MNnnvO6HHZXw",
  authDomain: "trainee-dragonborn-24t2.firebaseapp.com",
  projectId: "trainee-dragonborn-24t2",
  storageBucket: "trainee-dragonborn-24t2.appspot.com",
  messagingSenderId: "820757723728",
  appId: "1:820757723728:web:d1262bc1e7cbded76fef55",
  measurementId: "G-2DQZ9JYY64"
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App/>
    </FirebaseAppProvider>
  </React.StrictMode>,
);
