// import React, { useState, useEffect } from "react";
// import { sections } from "@/data/sections";
// import { Section } from "@/types";
// import MarkerButton from "./MarkerButton";
// import { useRouter } from "next/navigation";

// const Map = () => {
//   const [progress, setProgress] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     const initialProgress = sections.reduce((acc, section) => {
//       section.markers.forEach((marker) => {
//         acc[marker.id] = marker.completed;
//       });
//       return acc;
//     }, {} as { [key: string]: boolean });

//     setProgress(initialProgress);
//   }, []);

//   const router = useRouter();

//   const handleMarkerClick = (sectionId: string, markerId: string) => {
//     console.log(`Navigating to quiz for marker: ${markerId} in section: ${sectionId}`);
//     router.push(`/map/${sectionId}/${markerId}/`);
//   };

//   const handleQuizCompletion = (markerId: string) => {
//     console.log(`Quiz completed for marker: ${markerId}`);
//     setProgress((prevProgress) => {
//       const updatedProgress = { ...prevProgress, [markerId]: true };
//       console.log("Updated progress:", updatedProgress);
//       return updatedProgress;
//     });
//   };

//   return (
//     <div className="w-full h-full overflow-auto p-6 space-y-10 map-container">
//       <h3 className="text-2xl font-bold text-[#855940] justify-center text-center mb-8">
//         Tervetuloa!
//       </h3>
//       <style jsx global>{`
//         .map-container {
//           -ms-overflow-style: none; /* Internet Explorer and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//         .map-container::-webkit-scrollbar {
//           display: none; /* Chrome, Safari, and Opera */
//         }
//       `}</style>

//       {sections.map((section: Section, index) => (
//         <React.Fragment key={section.id}>
//           {index > 0 && (
//             <div className="flex items-center my-8 max-w-[60%] mx-auto">
//               <hr className="flex-grow border-[#997059] border-opacity-65" />
//               <span className="mx-4 text-[#855940] font-bold text-xl">{section.title}</span>
//               <hr className="flex-grow border-[#997059] border-opacity-65" />
//             </div>
//           )}
//           <div className="relative w-full">
//             <div
//               className="grid grid-cols-2 gap-12 relative max-w-[20%] mx-auto"
//               style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
//             >
//               {section.markers.map((marker, index) => {
//                 const completed = progress[marker.id] || false;

//                 return (
//                   <div key={marker.id} className={`flex justify-center ${index % 2 === 0 ? "mt-0" : "mt-12"}`}>
//                     <MarkerButton
//                       name={marker.name}
//                       completed={completed}
//                       onClick={() => handleMarkerClick(section.id, marker.id)}
//                       isFirstMarker={marker.isFirstMarker}
//                       isLastMarker={marker.isLastMarker}
//                       onCompletion={() => handleQuizCompletion(marker.id)}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default Map;
