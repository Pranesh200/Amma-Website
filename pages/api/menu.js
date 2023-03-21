import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    // Create a new Supabase client
    const supabase = createClient(
        "https://bpnihamszdrqhtpvaizk.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmloYW1zemRycWh0cHZhaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDEzMjcsImV4cCI6MTk5MzcxNzMyN30.HbXoEwm4pYh8W6tStK-0Uz_yIArLRL6I75p1a8eKNhk"
    );

    try {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // An array of weekdays to fetch menu items for
        const itemsByWeekday = {};

        for (const weekday of weekdays) {
            const { data, error } = await supabase
                .from("menu")
                .select("item_name")
                .eq("day_of_week", weekday);

            if (error) throw error;

            const itemNames = data.map((item) => item.item_name);
            itemsByWeekday[weekday] = itemNames;
        }

        res.status(200).json(itemsByWeekday);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu items." });
    }
}
