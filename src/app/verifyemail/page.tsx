"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-center">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Verify Email
        </h1>

        <h2 className="p-2 mb-4 bg-orange-500 dark:bg-orange-600 text-black dark:text-white rounded-md">
          {token ? `${token}` : "No token"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
              Email Verified
            </h2>
            <Link
              href="/login"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 dark:bg-red-600 text-black dark:text-white px-4 py-2 rounded-md">
              Verification Failed
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
