import { KiteConnect } from "kiteconnect";

const apiKey = process.env.API_KEY!;
const apiSecret = process.env.API_SECRET!;
const requestToken = "eTPiS4Rioa2wsS6O4BFl1wGyqtezIwa8";
let accessToken = "";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL())
async function init() {
    try {
        await generateSession();
        await getProfile();
    } catch (err) {
        console.error(err);
    }
}

async function generateSession() {
    try {
        const response = await kc.generateSession(requestToken, apiSecret);
        kc.setAccessToken(response.access_token);
        console.log("Access token:", response.access_token);
        accessToken =  response.access_token;
        console.log("Session generated:", response);
    } catch (err) {
        console.error("Error generating session:", err);
    }
}


async function getProfile() {
    try {
        const profile = await kc.getProfile();
        console.log("Profile:", profile);
    } catch (err) {
        console.error("Error getting profile:", err);
    }
}