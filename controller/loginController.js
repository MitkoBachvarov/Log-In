const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended:false});
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/mydb';


module.exports = (app) => {
    app.get('/', (req,res) =>{
        res.render('home');
    });

    app.get('/register',(req,res) => {
        res.render('register')
    });

    app.get('/login',(req, res) => {
        res.render('login');
    });

    // Login to DB ==============

    app.post('/demo', urlencodedParser, (req,res) =>{
        MongoClient.connect(url, (err, client) => {
            if(err) throw err;

            let db = client.db('mydb');

            db.collection('userprofile').findOne({name: req.body.name},(err, user) =>{
                if (user === null){
                    res.end('Login invalid');
                } else if(user.name === req.body.name && user.pass === req.body.pass) {
                    res.render('completeprofile',{profileData: user});
                } else {
                    console.log ('Credentials wrong');
                    res.end('Login invalid');
                }
            });
        });
    });

    // register to DB ===============
    app.post('/regiterToDb', urlencodedParser, (req,res) => {
        let obj = JSON.stringify(req.body);
        let jsonObj = JSON.parse(obj);

        res.render('profile',{loginData: req.body});
    });
    //register profile to MongoDB ========
    app.post('/completeprofile', urlencodedParser, (req,res) =>{
        let obj = JSON.stringify(req.body);
        console.log('Final reg Data: ' + obj);
        let jsonObj = JSON.parse(obj);
        MongoClient.connect(url, (err, client) => {
            if(err) throw err;

            let db = client.db('mydb');

            db.collection('userprofile').insertOne(jsonObj, (err, res) => {
                if(err) throw err;
                console.log('1 Document inserted');
                client.close();
            });
            res.render('completeprofile',{profileData:req.body});
        });
    });

};