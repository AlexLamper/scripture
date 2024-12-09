"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Map from "@/components/map/Map";
import Statistics from "@/components/home/Statistics";

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
    <div className="flex-1 w-full flex flex-col min-h-[100vh] p-6">
      <div className="flex w-full gap-6">
        <div id="map-section" className="lg:w-8/12 w-auto">
          <Map />
        </div>

        <div id="statistics-section" className="lg:w-4/12 hidden md:block w-auto">
          <h2 className="font-bold text-3xl mb-6">Statistics</h2>
          <Statistics />
        </div>
      </div>
    </div>
  );
}
