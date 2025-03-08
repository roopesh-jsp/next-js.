"use client";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState({});
  async function FetchUSer() {
    const res = await fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
    });
    const response = await res.json();

    setUser(response.user);
  }
  useEffect(() => {
    FetchUSer();
  }, []);

  return (
    <div>
      <h1>{user.user.name}</h1>
    </div>
  );
}

export default ProfilePage;
