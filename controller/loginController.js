const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended:false});
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/mydb';
let bcrypt = require('bcrypt');




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

            let usPw = req.body.pass;

            db.collection('userprofile').findOne({name: req.body.name},(err, user) =>{
                let pwDB = user.pass;
                let savedSalt = user.salt;

                // Hash the user input with the salt from the DB for this user
                    bcrypt.hash(usPw, savedSalt, (err, hash) => {
                        usPw = hash;
                        console.log('This is the hash with the salt: ' + hash);
                        if (user === null){
                            res.end('Login invalid');
                        } else if(user.name === req.body.name && usPw === user.pass) {
                            res.render('completeprofile',{profileData: user});
                        } else {
                            console.log ('Credentials wrong');
                            res.end('Login invalid');
                        }
                });
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

        console.log("save");
        let obj = req.body;
        console.log('Final reg Data: ' + JSON.stringify(obj));
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(obj.pass,salt, (err,hash) =>{
                obj.pass = hash;
                console.log("Hash:" + hash);
                console.log(JSON.stringify(obj, null, 2));
                // let jsonObj = JSON.parse(obj);
                let jsonObj = obj;
                obj['salt'] = salt;
                console.log(JSON.stringify(jsonObj));
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
            })
        });
    });

};