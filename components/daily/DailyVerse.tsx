"use client";

import React, { useEffect, useState } from "react";

// Define the structure of a verse
interface Verse {
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

export default function VerseOfTheDay() {
  const [verse, setVerse] = useState<Verse | null>(null); // State to hold the verse
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      setLoading(true);
      setError(null);

      try {
        // Access the API key from environment variables
        const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

        if (!rapidApiKey) {
          throw new Error("API Key is missing!");
        }

        // Get today's date (you can modify the logic to choose a random verse if needed)
        const today = new Date();
        const dayOfYear = today.getDate(); // Simple approach using day of the year as index

        // Example: Use dayOfYear to fetch a specific chapter and verse
        const book = "Proverbs"; // You can choose any book here
        const chapter = 1; // You can dynamically adjust chapter
        const verseNum = (dayOfYear % 31) + 1; // Select a verse based on the day of the month (e.g., verse 1-31)

        // Fetch the verse from the API
        const response = await fetch(
          `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Book=${book}&chapter=${chapter}&Verse=${verseNum}`, 
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "ajith-holy-bible.p.rapidapi.com",
            },
          }
        );

        // Log the response status and body for debugging
        console.log("Response Status:", response.status);
        const data = await response.json();
        console.log("API Response Data:", data);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the data contains the expected verse text
        if (data && data.Output) {
          setVerse({
            text: data.Output, // Use Output as the verse text
            book: data.Book, // Use Book from response
            chapter: parseInt(data.Chapter), // Ensure chapter is a number
            verse: parseInt(data.Verse), // Ensure verse is a number
          });
        } else {
          throw new Error("Verse data not found in response.");
        }
      } catch (error) {
        setError(`Error fetching verse: ${error instanceof Error ? error.message : "Unknown error"}`);
        console.error("Error fetching verse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerseOfTheDay();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Loading state
  if (loading) return <div>Loading verse of the day...</div>;

  // Error state
  if (error) return <div>Error: {error}</div>;

  // Render the verse of the day
  return (
    <div>
      {verse ? (
        <div>
          <p><strong>{verse.book} {verse.chapter}:{verse.verse}</strong></p>
          <p>{verse.text}</p>
        </div>
      ) : (
        <div>No verse available.</div>
      )}
    </div>
  );
}
