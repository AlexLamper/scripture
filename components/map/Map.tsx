"use client";

import React, { useState, useEffect } from "react";
import MarkerButton from "./MarkerButton";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const Map = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSectionsAndMarkers = async () => {
      try {
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("sections")
          .select(`
            section_id,
            title,
            markers:markers (
              marker_id,
              name,
              completed,
              is_first_marker,
              is_last_marker
            )
          `);

        if (sectionsError) {
          throw new Error(`Error fetching sections: ${sectionsError.message}`);
        }

        if (sectionsData) {
          setSections(sectionsData);

          // Initialize progress state based on the fetched data
          const initialProgress = sectionsData.reduce((acc, section) => {
            section.markers.forEach((marker: any) => {
              acc[marker.marker_id] = marker.completed;
            });
            return acc;
          }, {} as { [key: string]: boolean });

          setProgress(initialProgress);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSectionsAndMarkers();
  }, [supabase]);

  const handleMarkerClick = (sectionId: string, markerId: string) => {
    console.log(`Navigating to quiz for marker: ${markerId} in section: ${sectionId}`);
    router.push(`/learn/${sectionId}/${markerId}/`);
  };

  const handleQuizCompletion = (markerId: string) => {
    console.log(`Quiz completed for marker: ${markerId}`);
    setProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress, [markerId]: true };
      console.log("Updated progress:", updatedProgress);
      return updatedProgress;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600 text-lg">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto p-6 space-y-10 map-container">
      <h3 className="text-2xl font-bold text-[#855940] justify-center text-center mb-8">
        Tervetuloa!
      </h3>
      <style jsx global>{`
        .map-container {
          -ms-overflow-style: none; /* Internet Explorer and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .map-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>

      {sections.map((section: any, index) => (
        <React.Fragment key={section.section_id}>
          {index > 0 && (
            <div className="flex items-center my-8 max-w-[60%] mx-auto">
              <hr className="flex-grow border-[#997059] border-opacity-65" />
              <span className="mx-4 text-[#855940] font-bold text-xl">{section.title}</span>
              <hr className="flex-grow border-[#997059] border-opacity-65" />
            </div>
          )}
          <div className="relative w-full">
            <div
              className="grid grid-cols-2 gap-12 relative max-w-[20%] mx-auto"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              {section.markers.map((marker: any, index: number) => {
                const completed = progress[marker.marker_id] || false;

                return (
                  <div
                    key={marker.marker_id}
                    className={`flex justify-center ${index % 2 === 0 ? "mt-0" : "mt-12"}`}
                  >
                    <MarkerButton
                      name={marker.name}
                      completed={completed}
                      onClick={() => handleMarkerClick(section.section_id, marker.marker_id)}
                      isFirstMarker={marker.is_first_marker}
                      isLastMarker={marker.is_last_marker}
                      onCompletion={() => handleQuizCompletion(marker.marker_id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Map;
