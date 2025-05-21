import { KiteConnect } from "kiteconnect";
import { config } from "dotenv";

config();

const apiKey = process.env.API_KEY!;
const apiSecret = process.env.API_SECRET!;
const port = 3000;

let kc = new KiteConnect({ api_key: apiKey });

const server = Bun.serve({
    port,
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/") {
            const loginUrl = kc.getLoginURL();
            return new Response(
                `<a href="${loginUrl}">Login with Kite</a>`,
                { headers: { "Content-Type": "text/html" } }
            );
        }

        if (url.pathname === "/kite/callback") {
            const requestToken = url.searchParams.get("request_token");

            if (!requestToken) {
                return new Response("Missing request_token", { status: 400 });
            }

            kc = new KiteConnect({ api_key: apiKey });

            try {
                const session = await kc.generateSession(requestToken, apiSecret);
                kc.setAccessToken(session.access_token);

                const profile = await kc.getProfile();

                return new Response(
                    `<pre>Login successful!\n\nProfile:\n${JSON.stringify(profile, null, 2)}</pre>`,
                    { headers: { "Content-Type": "text/html" } }
                );
            } catch (err) {
                console.error("Session generation error:", err);
                return new Response("Failed to generate session", { status: 500 });
            }
        }

        return new Response("Not found", { status: 404 });
    },
});

console.log(`Kite login app running on http://localhost:${port}`);
