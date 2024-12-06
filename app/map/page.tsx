"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Import your Card component from ShadCN

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
    return <p className="text-center text-gray-600">Loading sections...</p>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (sections.length === 0) {
    return <div className="text-center text-gray-600">No sections found.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 min-h-[100vh] p-6">
      <h2 className="font-bold text-3xl mb-6">Explore the Sections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.section_id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold">
                <Link href={`/map/${section.section_id}`} className="text-blue-600 hover:text-blue-800">
                  {section.title}
                </Link>
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
