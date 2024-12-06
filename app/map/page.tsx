"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function MapPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase.from("sections").select();

        if (error) {
          setError(`Error fetching sections: ${error.message}`);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          setSections(data);
        } else {
          setSections([]);
        }
        setLoading(false);
      } catch (err: any) {
        setError(`Error during sections fetch: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSections();
  }, [supabase]);

  if (loading) {
    return <p>Loading sections...</p>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (sections.length === 0) {
    return <div className="error-message">No sections found.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 min-h-[100vh] p-6">
      <h2>Explore the Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.section_id}>
            <Link href={`/map/${section.section_id}`}>
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
