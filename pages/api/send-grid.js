import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey("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")

async function sendEmail(req, res) {
    try {
        const filteredCheckedItems = Object.fromEntries(
            Object.entries(req.body.checkedItems).map(([key, value]) => [
                key,
                value.filter((item) => typeof item === "object"),
            ])
        );
        // console.log("REQ.BODY", req.body);
        await sendgrid.send({
            to: `${req.body.customerPhone}`, // Your email where you'll receive emails
            from: "chennaidelightrva@gmail.com", // your website email address here
            subject: `${req.body.subject}`,
            html: `<!DOCTYPE html>
            <html>
            <head>
                <title>Order Confirmation</title>
            </head>
            <body>
                <h1>Order Confirmation</h1>
                <p>Dear ${req.body.customerName},</p>
                <ul>
                ${Object.entries(req.body.checkedItems).map(([day, items]) => {
                console.log(items);
                return `
                      <p><strong>${day}:</strong></p>
                      <ul>
                        ${items
                        .filter(item => item.itemName && item.quantity)
                        .map(item => `
                            <li><strong>Item Name:</strong> ${item.itemName}</li>
                            <li><strong>Quantity:</strong> ${item.quantity}</li>
                          `)
                        .join("")
                    }
                      </ul>
                    `;
            }).join("")}
                  
            </ul>
                <p>If you have any questions or concerns, please don't hesitate to reach out to us. Thank you for choosing our meal plan service.</p>
                <p>Sincerely,</p>
                <p>Akila</p>
            </body>
            </html>
            `,
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "email sent" });
}

export default sendEmail;