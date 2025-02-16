package com.algotrading.services;

import com.algotrading.models.Trade;
import com.algotrading.repositories.TradeRepository;

public class TradingService {
    private final TradeRepository tradeRepository;

    public TradingService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public void executeTrade(String symbol, double price, int quantity, String action) {
        Trade trade = new Trade();
        trade.setSymbol(symbol);
        trade.setPrice(price);
        trade.setQuantity(quantity);
        trade.setAction(action);
        trade.setTimestamp(System.currentTimeMillis());

        tradeRepository.saveTrade(trade);
    }
}