import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch sections from the database
  const { data: sections, error } = await supabase
    .from("sections")
    .select("section_id, title");

  if (error) {
    console.error("Error fetching sections:", error.message);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-6">
      {/* Info Message */}
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Welcome to Scripture! You are authenticated.
        </div>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-2xl">Explore Sections</h2>
        {sections && sections.length > 0 ? (
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.section_id}
                className="border rounded-md p-4 hover:bg-accent transition"
              >
                <Link
                  href={`/${section.section_id}`}
                  className="text-blue-500 underline font-semibold text-lg"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No sections available to explore yet.</p>
        )}
      </div>
    </div>
  );
}
