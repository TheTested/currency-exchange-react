CREATE DATABASE currencyExchangeRates;

CREATE TABLE currencies(
  currency_id SERIAL PRIMARY KEY,
  currency_name VARCHAR(100),
  currency_abbreviation VARCHAR(10)
);

CREATE TABLE currencyRate(
  currency_id SERIAL PRIMARY KEY,
  currency_from VARCHAR(10),
  currency_to VARCHAR(10),
  currency_from_value decimal(19, 9),
  currency_to_value decimal(19, 9)
);

CREATE TABLE userActivity(
  currency_id SERIAL PRIMARY KEY,
  time_when_received TIMESTAMPTZ,
  currency_from VARCHAR(10),
  currency_to VARCHAR(10),
  amount_from decimal(19, 9),
  amount_to decimal(19, 9),
  exchange_rate decimal(19, 9)
);