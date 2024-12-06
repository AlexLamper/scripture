"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select();

      if (error) {
        console.error("Error fetching notes:", error.message);
      } else {
        setNotes(data);
      }
    };

    fetchNotes();
  }, [supabase]);

  return (
    <div className="p-6 min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      {notes && notes.length > 0 ? (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li key={note.id} className="border p-3 rounded-md">
              {note.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}
