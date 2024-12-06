"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Import your Card component from ShadCN

export default function MarkerPage() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { section, marker } = useParams();
  const supabase = createClient();

  // Log for debugging purposes
  console.log("Section:", section);
  console.log("Marker:", marker);

  useEffect(() => {
    const fetchContent = async () => {
      if (!marker) {
        setError("Marker ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("content")
          .select("markdown")
          .eq("marker_id", marker)
          .single();

        if (error) {
          throw new Error(`Error fetching content for marker ${marker}: ${error.message}`);
        }

        setContent(data?.markdown || null);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching marker content:", err);
      }
    };

    fetchContent();
  }, [marker, supabase]);

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
    <div className="flex-1 w-full flex flex-col gap-12 min-h-[100vh] p-6">
      <h2 className="font-bold text-3xl mb-6">Content for Marker: {marker}</h2>
      <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-4">Marker Details</CardTitle>
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
