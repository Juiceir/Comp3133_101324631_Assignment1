//Assignment 1
//Jaeden Salandanan 101324631

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/schema.js";
import resolvers from "./src/resolvers.js";
import { connectDB } from "./src/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
