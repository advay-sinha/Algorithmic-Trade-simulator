package com.algotrading.repositories;

import org.bson.Document;

import com.algotrading.models.Trade;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class TradeRepository {
    private final MongoCollection<Document> tradeCollection;

    public TradeRepository(MongoDatabase database) {
        this.tradeCollection = database.getCollection("trades");
    }

    public void saveTrade(Trade trade) {
        Document doc = new Document("symbol", trade.getSymbol())
                .append("price", trade.getPrice())
                .append("quantity", trade.getQuantity())
                .append("action", trade.getAction())
                .append("timestamp", trade.getTimestamp());
        tradeCollection.insertOne(doc);
    }
}