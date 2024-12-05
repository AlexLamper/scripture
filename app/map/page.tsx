"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function MapPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase.from("sections").select();

      if (error) {
        console.error("Error fetching sections:", error.message);
      } else {
        setSections(data);
      }
    };

    fetchSections();
  }, [supabase]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase.from("markers").select();

      if (error) {
        console.error("Error fetching markers:", error.message);
      } else {
        setMarkers(data);
      }
    };

    fetchMarkers();
  }, [supabase]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bold text-2xl mb-4">All Sections and Markers</h2>
      {sections.map((section) => (
        <div key={section.section_id}>
          <h3 className="font-bold text-xl mt-4">{section.title}</h3>
          <ul className="space-y-2">
            {markers
              .filter((marker) => marker.section_id === section.section_id)
              .map((marker) => (
                <li key={marker.marker_id}>
                  <Link
                    href={`/map/${section.section_id}/${marker.marker_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {marker.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
