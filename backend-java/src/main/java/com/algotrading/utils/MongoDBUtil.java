package com.algotrading.utils;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBUtil {
    private static MongoClient mongoClient;
    private static MongoDatabase database;

    static {
        String uri = "mongodb://localhost:27017"; // Load from config.properties
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("algotrading");
    }

    public static MongoDatabase getDatabase() {
        return database;
    }
}