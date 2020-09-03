const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());

const http = require('http');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

//ROUTES

//get all currencies

//upload all currencies
app.post("/updateCurList", async (req,res1) => {
  try {
    pool.query(
      "DELETE FROM currencies",
      []
    );
    http.get("http://lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList?", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
              
              result.CcyTbl.CcyNtry.forEach(element => {
                pool.query(
                  "INSERT INTO currencies (currency_name, currency_abbreviation) VALUES($1, $2)",
                  [element.CcyNm[1]._, element.Ccy[0]]
                );
              });
                
              res1.json("done");
            }
            else {
                console.log(error);
            }
        });
        
    });
    
});
  } catch (error) {
    console.error(error.message);
  }
})

//get all currencies
app.get("/getCurList", async (req, res) => {
  try {
    const allCur = await pool.query("SELECT * FROM currencies WHERE EXISTS (SELECT 1 FROM currencyRate WHERE currency_to = currencies.currency_abbreviation)")
    res.json(allCur.rows)
  } catch (error) {
    console.error(error.message);
  }
})

//upload all currency rates
app.post("/updateCurRateList", async (req,res1) => {
  try {
    pool.query(
      "DELETE FROM currencyRate",
      []
    );
    http.get("http://lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
              pool.query(
                "INSERT INTO currencyRate (currency_from, currency_to, currency_from_value, currency_to_value) VALUES($1, $2, $3, $4)",
                ["EUR", "EUR", 1, 1]
              );
              result.FxRates.FxRate.forEach(element => {
                
                pool.query(
                  "INSERT INTO currencyRate (currency_from, currency_to, currency_from_value, currency_to_value) VALUES($1, $2, $3, $4)",
                  [element.CcyAmt[0].Ccy[0], element.CcyAmt[1].Ccy[0], element.CcyAmt[0].Amt[0], element.CcyAmt[1].Amt[0]]
                );
              });
                
              res1.json("done");
            }
            else {
                console.log(error);
            }
        });
        
    });
    
});
  } catch (error) {
    console.error(error.message);
  }
})

// get exchange rate and toAmount
app.get("/getRate/:amount_from/:currency_from/:currency_to", async (req,res1) => {
  try {
    const {amount_from, currency_from, currency_to} = req.params
    const curRate = await getExchange(currency_from, currency_to)
    res1.json({"exchange_rate": curRate, "amount_to":(Math.round(amount_from*curRate * 100) / 100).toFixed(2)})
    userAct(currency_from, currency_to, amount_from, (Math.round(amount_from*curRate * 100) / 100).toFixed(2), curRate)
  } catch (error) {
    console.error(error.message);
  }
})

//POST user activity
async function userAct(currency_from, currency_to, amount_from, amount_to, curRate) {
  await pool.query(
    "INSERT INTO userActivity (time_when_received, currency_from, currency_to, amount_from, amount_to, exchange_rate) VALUES(current_timestamp, $1, $2, $3, $4, $5)",
    [currency_from, currency_to, amount_from, amount_from*curRate, curRate]
    
  )
}


app.listen(5000, () =>{
  console.log("server start");
})

async function getExchange(nameFrom, nameTo) {
  let Cur1
  let Cur2
  Cur1 = await getExchangeSingle(nameFrom)
  Cur2 = await getExchangeSingle(nameTo)
  return Cur2 / Cur1
}

async function getExchangeSingle(name) {
  let Cur1
  if(name === "EUR") {
     Cur1 = 1
  } else {
    Cur1 = await pool.query("SELECT currency_to_value FROM currencyRate WHERE currency_to='" + name + "'")
    Cur1 = Cur1.rows[0].currency_to_value
  }
  return Cur1
}




