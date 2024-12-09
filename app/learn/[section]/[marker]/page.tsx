"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Import your Card component from ShadCN
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function MarkerPage() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState<string | null>(null);
  const { section, marker } = useParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      if (!marker) {
        setError("Marker ID is missing.");
        setLoading(false);
        return;
      }

      try {
        // Fetch content for the marker
        const { data, error } = await supabase
          .from("content")
          .select("markdown")
          .eq("marker_id", marker)
          .single();

        if (error) {
          throw new Error(`Error fetching content for marker ${marker}: ${error.message}`);
        }

        setContent(data?.markdown || null);

        // Fetch user details to get role
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserRole(user.user_metadata?.role || null);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching marker content:", err);
      }
    };

    fetchContent();
  }, [marker, supabase]);

  const handleEdit = () => {
    setEditing(true);
    setEditContent(content);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditContent(null);
  };

  const handleSave = () => {
    // Save functionality will be implemented later
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <p className="text-gray-600 text-lg">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md p-4">
          <p className="font-semibold">No content found for this marker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col min-h-[100vh] p-6">
      <h2 className="font-bold text-3xl mb-6">Content for Marker: {marker}</h2>
      <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-4">Marker Details</CardTitle>

          {editing ? (
            <textarea
              className="w-full h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editContent || ""}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Buttons for Admin */}
          {userRole === "admin" && (
            <div className="flex gap-4 mt-6">
              {!editing ? (
                <>
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
