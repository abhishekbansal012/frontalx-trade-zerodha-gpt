import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {placeOrder} from "./trade.ts";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });


// Create an MCP server
const server = new McpServer({
    name: "trade-bot",
    version: "1.0.0"
});


server.tool("buy-stock", "Buys a stock on Zerodha exchange for a user. It executes a real order to buy stock for a user.",
    { stock: z.string(), qty: z.number() },
    async ( {stock, qty}) => {
        try {
            await placeOrder(stock, "BUY", qty);
            return {
                content: [{type: "text", text: "Stock has been bought successfully"}]
            }
        } catch (err) {
            return {
                content: [{type: "text", text: `Failed to buy stock: ${err instanceof Error ? err.message : err}`}]
            }
        }
})

server.tool("sell-stock", "Sells a stock on Zerodha exchange for a user. It executes a real order to sell stock for a user.",
    { stock: z.string(), qty: z.number() },
    async ( {stock, qty}) => {
        try {
            await placeOrder(stock, "SELL", qty);
            return {content: [{type: "text", text: "Order placed"}]}
        } catch (err) {
            return {
                content: [{type: "text", text: `Failed to sell stock: ${err instanceof Error ? err.message : err}`}]
            }
        }
    })

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);