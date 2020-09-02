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
                  "INSERT INTO currencies (currency_name) VALUES ($1)",
                  [element.Ccy[0]]
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
    const allCur = await pool.query("SELECT * FROM currencies")
    res.json(allCur.rows)
  } catch (error) {
    console.error(error.message);
  }
})

http.get("http://lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=", function(res) {
    let data = '';
    res.on('data', function(stream) {
        data += stream;
    });
    
    res.on('end', function(){
        parser.parseString(data, function(error, result) {
            if(error === null) {
              
              console.log(result.FxRates.FxRate[10].CcyAmt);
            }
            else {
                console.log(error);
            }
        });
        
    });
    
});

app.listen(5000, () =>{
  console.log("server start");
})

//get currencies from lb

