const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-05-26',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const payload = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'limit':7
            }
        }
    }
    
    getNLUInstance().analyze(payload)
        .then(results => {
            return res.send(results.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });

});

app.get("/url/sentiment", (req,res) => {
    const payload = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'limit':7
            }
        }
    }
    
    getNLUInstance().analyze(payload)
        .then(results => {
            return res.send(results.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/emotion", (req,res) => {
    const payload = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'limit':7
            }
        }
    }
    
    getNLUInstance().analyze(payload)
        .then(results => {
            return res.send(results.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.get("/text/sentiment", (req,res) => {
    const payload = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'limit':7
            }
        }
    }
    
    getNLUInstance().analyze(payload)
        .then(results => {
            return res.send(results.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})