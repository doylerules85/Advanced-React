import { createTransport } from 'nodemailer';

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function makeEmail(text: string): string {
    return `
        <div style="border: 1px solid; padding: 20px; font-size: 20px;">
            <h2>Yo!</h2>
            <p>${text}</p>
        </div>
    `;
}
// interface for custom return value
interface MailResponse {
    message: string;
}

export async function sendPasswordResetEmail(
    resetToken: string,
    to: string
    // this is TS. once the function is evoked we expect a promise to return which is nothing (void)
): Promise<void> {
    const info = (await transport.sendMail({
        to,
        from: 'test@example.com',
        subject: 'your password reset token broh',
        html: makeEmail(`your password reset token is here.
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Reset Password</a>
        `),
    })) as MailResponse;
    // ^ apply the interface
    console.log(info);
}
