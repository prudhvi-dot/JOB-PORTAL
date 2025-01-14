import React from "react";
import { UserProfile } from "@clerk/clerk-react";

function ProfilePage() {
  return (
    <div className="flex  justify-center mt-2">
      <div className="h-[500px] overflow-hidden rounded-xl shadow-md">
        <UserProfile />
      </div>
    </div>
  );
}

export default ProfilePage;
