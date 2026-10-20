"use client";

import { authApi } from "@/features/auth/api/authApi";
import { adminSession } from "@/features/auth/model/session";
import { ComicButton } from "@/shared/comic";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await authApi.logout();
    adminSession.set("guest");
  };

  return (
    <ComicButton variant="red" onClick={handleLogout}>
      LOG OUT
    </ComicButton>
  );
};
