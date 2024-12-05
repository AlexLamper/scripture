"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation"; // Use next/navigation for search params

export default function MarkerPage() {
  const [content, setContent] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const marker = searchParams.get("marker"); // Use query params directly from search params
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      if (!marker) return; // Check if marker ID is present
      const { data, error } = await supabase
        .from("content")
        .select("markdown")
        .eq("marker_id", marker)
        .single();

      if (error) {
        console.error(`Error fetching content for marker ${marker}:`, error.message);
      } else {
        setContent(data?.markdown || null);
      }
    };

    fetchContent();
  }, [marker, supabase]); // Fetch data whenever marker ID changes

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bold text-2xl mb-4">Content for Marker: {marker}</h2>
      {content ? (
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}
