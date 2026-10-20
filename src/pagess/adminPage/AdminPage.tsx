"use client";

import { AdminDashboard } from "@/pagess/adminPage/components/AdminDashboard";
import { adminSession, authApi, LoginForm } from "@/features/auth";
import { Caption } from "@/shared/comic";
import { useAtom } from "@reatom/react";
import { useEffect, useState } from "react";

export const AdminPage: React.FC = () => {
  const [session] = useAtom(adminSession);
  const [isApiDown, setIsApiDown] = useState(false);

  useEffect(() => {
    authApi
      .checkSession()
      .then((isAdmin) => adminSession.set(isAdmin ? "admin" : "guest"))
      .catch(() => setIsApiDown(true));
  }, []);

  if (isApiDown) {
    return (
      <div className="flex flex-1 justify-center items-center p-4 min-h-screen paper">
        <Caption>API is offline — start the backend and reload</Caption>
      </div>
    );
  }

  if (session === "unknown") {
    return (
      <div className="flex flex-1 justify-center items-center p-4 min-h-screen paper">
        <Caption>Checking credentials…</Caption>
      </div>
    );
  }

  if (session === "guest") {
    return (
      <div className="flex flex-1 justify-center items-center p-4 min-h-screen paper">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen paper">
      <AdminDashboard />
    </div>
  );
};
