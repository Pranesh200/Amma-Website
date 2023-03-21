import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    "https://bpnihamszdrqhtpvaizk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmloYW1zemRycWh0cHZhaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDEzMjcsImV4cCI6MTk5MzcxNzMyN30.HbXoEwm4pYh8W6tStK-0Uz_yIArLRL6I75p1a8eKNhk"
);
export default async function handler(req, res) {
    const { customerName, customerPhone, checkedItems } = req.body;

    try {
        const orders = [];

        // Loop through each day of the week in the checkedItems object
        for (const dayOfWeek in checkedItems) {
            const items = checkedItems[dayOfWeek];

            // Loop through each item in the current day's items array
            for (const itemName of items) {
                // Query the menu table to get the menu_id for the current item
                const { data: menuData, error: menuError } = await supabase
                    .from('menu')
                    .select('menu_id')
                    .eq('item_name', itemName)
                    .single();

                if (menuError) {
                    console.error(menuError);
                    return res.status(500).json({ message: 'Error inserting order' });
                }

                // If no matching item was found in the menu table, return an error
                if (!menuData) {
                    return res.status(400).json({ message: `Item "${itemName}" not found in menu` });
                }

                // Add a new order object to the orders array for the current item
                orders.push({
                    menu_id: menuData.menu_id,
                    order_date: new Date(),
                    customer_name: customerName,
                    customer_phone: customerPhone
                });
            }
        }

        // Insert the new orders into the Supabase orders table
        const { data: ordersData, error: ordersError } = await supabase
            .from('orders')
            .insert(orders);

        if (ordersError) {
            console.error(ordersError);
            return res.status(500).json({ message: 'Error inserting order' });
        }

        return res.status(200).json({ message: 'Orders successfully inserted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error inserting order' });
    }
}
