const express = require("express"); // Importarea modulului Express
const app = express(); // Inițializarea unei instanțe Express
const mysql = require("mysql"); // Importarea modulului MySQL
const cors = require("cors"); // Importarea modulului CORS
const session = require("express-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// app.use((err, req, res, next) => {
//     console.error(err); // Log the error
//     res.status(500).send('Internal Server Error'); // Send an appropriate response to the client
//   });

app.use(cors({
    origin: ['https://localhost:3000', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
}));
app.use(express.json()); // Utilizarea middleware-ului Express pentru a procesa datele JSON
app.use(cookieParser());
app.use(
    session({
        secret: 'secret-key', // Cheia secretă pentru semnarea cookie-urilor de sesiune
        resave: false, // Dacă să se salveze sesiunea la fiecare cerere, chiar dacă nu a fost modificată
        saveUninitialized: false, // Dacă să se salveze o sesiune neinițializată (fără date)
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // Durata de expirare a cookie-ului de sesiune (24 de ore în milisecunde)
            secure: false, // Dacă să se permită cookie-uri doar prin HTTPS (true în producție)
        },
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    // Crearea unei conexiuni la baza de date MySQL
    user: "if0_34602571",
    host: "sql209.infinityfree.com",
    password: "KwG3LgrZusp",
    database: "if0_34602571_express_mysql",
    port: "3306"
});

app.listen(3001, () => {
    // Pornirea serverului Express pe portul 3001
    console.log("Running on port 3001");
});



app.post("/create", (req, res) => {
    // Definirea unui endpoint POST la ruta '/create'

    const name = req.body.name; // Extrage valoarea proprietății 'name' din corpul cererii
    const email = req.body.email; // Extrage valoarea proprietății 'email' din corpul cererii
    const password = req.body.password; // Extrage valoarea proprietății 'password' din corpul cererii

    db.query(
        "INSERT INTO test (name, email, password) VALUES (?, ?, ?)", // Execută interogarea SQL pentru a insera valorile în baza de date
        [name, email, password], // Parametrii care vor înlocui semnele de întrebare în interogare
        (err, result) => {
            // Funcția de callback pentru gestionarea răspunsului de la baza de date
            if (err) {
                console.log(err); // În caz de eroare, afișează eroarea în consolă
            } else {
                res.send("Values Inserted"); // În caz de succes, trimite un răspuns de succes către client
            }
        }
    );
});

app.post("/auth", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    const email = req.body.email;
    const pass = req.body.password;

    db.query(
        "SELECT email from  conturi where email like ? and parola like ?",
        [email, pass],
        (err, result) => {
            if (err) {
                console.log(err, "erroare");
            } else {
                if (result.length > 0) {
                    console.log(result.length, "logat");
                    console.log(req.session.loggedIn);
                    req.session.loggedIn = true;
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }
        }
    );
});


app.get("/session", (req, res) => {


    console.log(req.session.loggedIn)
    if (req.session.loggedIn) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(201);
    }
});



app.post("/register2", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;
    const date = req.body.date;

    db.query(
        "SELECT email FROM conturi where email LIKE ?",
        [email],
        (err, result) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return;
            }

            if (result.length >= 1) {
                
                res.sendStatus(409)
                return;
            }

            // Continue with the rest of the code
            db.query(
                "INSERT INTO conturi (email, parola) VALUES (?, ?)",
                [email, pass],
                (err, result) => {
                    if (err) {
                        console.log(err, "eroare");
                        res.sendStatus(500);
                        return;
                    }

                    db.query(
                        "SELECT id from conturi WHERE conturi.email LIKE ?",
                        [email],
                        (err, result) => {
                            if (err) {
                                console.log(err, "eroare");
                                res.sendStatus(500);
                                return;
                            }

                            const sql = result[0].id;

                            db.query(
                                "INSERT INTO utilizatori (nume, data_inregistrare, id_cont) VALUES (?, ?, ?)",
                                [name, date, sql],
                                (err, result) => {
                                    if (err) {
                                        console.log(err, "eroare");
                                        res.sendStatus(500);
                                        return;
                                    }

                                    res.sendStatus(200);
                                }
                            );
                        }
                    );
                }
            );
        });
}

);


app.get("/logout", (req, res) => {
    req.session.loggedIn = false;
    res.sendStatus(200);

})

app.get("/obiective", (req, res) => {
    var dbcommand = "";
    if (req.query.tip) {
        dbcommand =
            "SELECT * FROM obiective JOIN " +
            req.query.tip +
            " ON obiective.id=" +
            req.query.tip +
            ".id";
        console.log(req.query);
    } else {
        dbcommand = "SELECT * FROM obiective";
    }
    db.query(dbcommand, (err, result) => {
        if (err) {
            console.log(err); // În caz de eroare, afișează eroarea în consolă
        } else {
            res.send(result); // În caz de succes, trimite rezultatul către client
        }
    });
});

app.get("/getFromDB", (req, res) => {
    // Definirea unui endpoint GET la ruta '/getFromDB'

    db.query("SELECT * FROM test", (err, result) => {
        // Execută interogarea SQL pentru a selecta toate înregistrările din tabela 'test'
        if (err) {
            console.log(err); // În caz de eroare, afișează eroarea în consolă
        } else {
            res.send(result); // În caz de succes, trimite rezultatul către client
        }
    });
});

app.get("/searchData", (req, res) => {
    // Definirea unui endpoint GET la ruta '/getFromDB'

    db.query("SELECT * FROM obiective", (err, result) => {
        // Execută interogarea SQL pentru a selecta toate înregistrările din tabela 'test'
        if (err) {
            console.log(err); // În caz de eroare, afișează eroarea în consolă
        } else {
            res.send(result); // În caz de succes, trimite rezultatul către client
        }
    });
});


app.post("/obiectiveC", (req, res) => {
    // Definirea unui endpoint GET la ruta '/getFromDB'
    console.log("Body",req.body)
    var tip = "";

    switch (req.body.tip) {
        case "munte":
            tip="Munti"
            break;
        case "lac":
            tip="Lacuri"
            break;
    
        case "peisaj":
            tip="Peisaje"
            break;

        case "pestera":
            tip="Pesteri"
            break;

        case "cascada":
            tip="Cascadele"
            break;

        case "salina":
            tip="Saline"
            break;
    
        default:
            break;
    }
    db.query(
        "SELECT * from obiective join " +tip+ " on obiective.id= " +tip+ ".id where obiective.id="+req.body.id,
        (err, result) => {
            // Execută interogarea SQL pentru a selecta toate înregistrările din tabela 'test'
            if (err) {
                console.log(err); // În caz de eroare, afișează eroarea în consolă
            } else {
                
                res.send(result); // În caz de succes, trimite rezultatul către client
            }
        }
    );
});


// Comentariile adăugate explică fiecare linie din codul dat.Sunt prezentate următoarele acțiuni:

// Importarea modulelor necesare, cum ar fi Express, MySQL și CORS.
// Inițializarea unei instanțe Express și a unei conexiuni la baza de date MySQL.
// Utilizarea middleware - urilor Express pentru gestionarea cererilor Cross - Origin(CORS) și procesarea datelor JSON.
// Definirea unor endpoint - uri HTTP pentru a gestiona cererile POST și GET.
// În funcția de callback pentru endpoint - ul POST, se extrag datele din corpul cererii și se execută o interogare de inserare în baza de date.Dacă există o eroare, se afișează în consolă, altfel se trimite un răspuns de succes către client.
// În funcția de callback pentru endpoint - ul GET, se execută o interogare de selecție din baza de date și se trimite rezultatul către client.Dacă există o eroare, se afișează în consolă.
