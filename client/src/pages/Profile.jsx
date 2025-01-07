import React from "react";
import { UserProfile } from "@clerk/clerk-react";

function ProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen mt-2">
      <UserProfile />
    </div>
  );
}

export default ProfilePage;
