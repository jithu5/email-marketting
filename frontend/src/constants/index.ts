export const emailTemplates = [
    {
        name: "Welcome Email",
        subject: "Welcome to Our Community!",
        body: `
            <p>Hi {{name}},</p>
            <p>Welcome to our community! We're thrilled to have you on board.</p>
            <p>Let us know if you have any questions.</p>
            <p>Best,</p>
            <p>The Team</p>
        `,
    },
    {
        name: "Product Update",
        subject: "Exciting New Updates Just for You!",
        body: `
            <p>Hi {{name}},</p>
            <p>We have some exciting updates that we think you'll love.</p>
            <p>Check them out now!</p>
            <p>Best regards,</p>
            <p>The Team</p>
        `,
    },
];
