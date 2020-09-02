CREATE DATABASE currencyExchangeRates;

CREATE TABLE currencies(
  currency_id SERIAL PRIMARY KEY,
  currency_name VARCHAR(10)
);