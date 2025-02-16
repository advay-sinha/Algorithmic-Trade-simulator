package com.algotrading.controllers;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import com.algotrading.services.TradingService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class TradeController implements HttpHandler {
    private final TradingService tradingService;

    public TradeController(TradingService tradingService) {
        this.tradingService = tradingService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            Map<String, String> params = parseQueryParams(exchange.getRequestURI().getQuery());
            String symbol = params.get("symbol");
            double price = Double.parseDouble(params.get("price"));
            int quantity = Integer.parseInt(params.get("quantity"));
            String action = params.get("action");

            tradingService.executeTrade(symbol, price, quantity, action);

            String response = "Trade executed successfully";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } else {
            String response = "Invalid request method";
            exchange.sendResponseHeaders(405, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    private Map<String, String> parseQueryParams(String query) {
        Map<String, String> params = new HashMap<>();
        if (query != null) {
            for (String param : query.split("&")) {
                String[] keyValue = param.split("=");
                params.put(keyValue[0], keyValue[1]);
            }
        }
        return params;
    }
}