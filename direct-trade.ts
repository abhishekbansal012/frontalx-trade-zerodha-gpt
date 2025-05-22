import { KiteConnect } from "kiteconnect";

const apiKey = process.env.API_KEY!;
const accessToken = process.env.ACCESS_TOKEN!;
const kc = new KiteConnect({ api_key: apiKey });


if (accessToken) {
    kc.setAccessToken(accessToken);
}

async function init() {
    try {
        await placeOrder("INFY", 1);
    } catch (err) {
        console.error(err);
    }
}



async function placeOrder(tradingsymbol: string, quantity: number) {
    try {
        const trade = await kc.placeOrder(
            'regular',{
                exchange: "NSE",
                tradingsymbol: tradingsymbol,
                transaction_type: "BUY",
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


async function sellOrder(tradingsymbol: string, quantity: number) {
    try {
        const trade = await kc.placeOrder(
            'regular',{
                exchange: "NSE",
                tradingsymbol: tradingsymbol,
                transaction_type: "SELL",
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

// Initialize the API calls
init();