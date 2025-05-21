import { KiteConnect } from "kiteconnect";

const apiKey = process.env.API_KEY!;
const accessToken = process.env.ACCESS_TOKEN!;
const kc = new KiteConnect({ api_key: apiKey });

if (accessToken) {
    kc.setAccessToken(accessToken);
}

export async function placeOrder(tradingsymbol: string, type: "BUY" | "SELL", quantity: number) {
    try {
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
    } catch (err) {
        console.error("Error placing order:", err);
    }
}