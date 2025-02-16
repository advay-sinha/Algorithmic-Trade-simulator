package com.algotrading;

import com.algotrading.controllers.TradeController;
import com.algotrading.repositories.TradeRepository;
import com.algotrading.services.TradingService;
import com.algotrading.utils.MongoDBUtil;
import com.mongodb.client.MongoDatabase;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class App {
    public static void main(String[] args) throws IOException {
        // Connect to MongoDB
        MongoDatabase database = MongoDBUtil.getDatabase();

        // Initialize repositories and services
        TradeRepository tradeRepository = new TradeRepository(database);
        TradingService tradingService = new TradingService(tradeRepository);

        // Start HTTP server
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/trades", new TradeController(tradingService));
        server.setExecutor(null);
        server.start();
        System.out.println("Java Backend Running on port 8080");
    }
}