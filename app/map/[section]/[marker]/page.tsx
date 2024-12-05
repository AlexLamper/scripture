"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

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
    return <p>Loading content...</p>;
  }

  if (error) {
    return <div className="error-message">{`Error: ${error}`}</div>;
  }

  if (!content) {
    return <div className="error-message">No content found for this marker.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bold text-2xl mb-4">Content for Marker: {marker}</h2>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
