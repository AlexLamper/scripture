"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-users");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        setError(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border text-left font-medium text-gray-600">#</th>
                <th className="px-4 py-2 border text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 border text-left font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
