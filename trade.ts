import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const apiKey = process.env.API_KEY;
const accessToken = process.env.ACCESS_TOKEN;

if (!apiKey || !accessToken) {
    throw new Error("API_KEY and ACCESS_TOKEN environment variables must be set in .env file.");
}

const kc = new KiteConnect({ api_key: apiKey });

export async function placeOrder(tradingsymbol: string, type: "BUY" | "SELL", quantity: number) {
    try {
        kc.setAccessToken(accessToken!);
        const trade = await kc.placeOrder(
            'regular',{
                exchange: "NSE",
                tradingsymbol: tradingsymbol,
                transaction_type: type,
                quantity: quantity,
                product: "CNC",
                order_type: "MARKET"
            }
        );
        console.log("Profile:", trade);
        return trade;
    } catch (err) {
        console.error("Error placing order:", err);
        throw err;
    }
}