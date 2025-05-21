import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {placeOrder} from "./trade.ts";

// Create an MCP server
const server = new McpServer({
    name: "Demo",
    version: "1.0.0"
});


server.tool("buy-stock", "Buys a stock on Zerodha exchange for a user. It executes a real order to buy stock for a user.",
    { stock: z.string(), qty: z.number() },
    async ( {stock, qty}) => {
        await placeOrder(stock, "BUY", qty);
        return {content: [{type: "text", text: "Order placed"}]}
})

server.tool("sell-stock", "Sells a stock on Zerodha exchange for a user. It executes a real order to sell stock for a user.",
    { stock: z.string(), qty: z.number() },
    async ( {stock, qty}) => {
        await placeOrder(stock, "BUY", qty);
        return {content: [{type: "text", text: "Order placed"}]}
    })

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);