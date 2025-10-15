import { Route, Routes, Navigate } from "react-router";

import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import PrivateGuard from "./components/PrivateGuard.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import PrivateLayout from "./components/PrivateLayout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<PrivateGuard />}>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
