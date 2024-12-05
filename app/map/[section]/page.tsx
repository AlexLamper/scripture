"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SectionPage() {
  const [markers, setMarkers] = useState<any[]>([]);
  const { section } = useParams();
  const supabase = createClient();

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from("markers")
        .select()
        .eq("section_id", section);

      if (error) {
        console.error(`Error fetching markers for section ${section}:`, error.message);
      } else {
        setMarkers(data);
      }
    };

    if (section) {
      fetchMarkers();
    }
  }, [section, supabase]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bold text-2xl mb-4">Markers for Section: {section}</h2>
      <ul className="space-y-2">
        {markers.map((marker) => (
          <li key={marker.marker_id}>
            <Link
              href={`/map/${section}/${marker.marker_id}`}
              className="text-blue-500 hover:underline"
            >
              {marker.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
