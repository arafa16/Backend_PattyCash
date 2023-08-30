const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRoute.js');
const PengajuanRouter = require('./routes/PengajuanRoute.js');
const StatusRouter = require('./routes/StatusRoute.js');
const TypePengajuanRouter = require('./routes/TypePengajuanRoute.js');
const AuthRouter = require('./routes/AuthRoute.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize');
const dotenv = require('dotenv');

const app = express();

const db = require('./config/Database.js');

dotenv.config();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

(async()=>{
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    proxy: false,
    saveUninitialized: false,
    store:store,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

//memberi akses frontend
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"]
}));


app.use(express.json());
app.use(UserRouter);
app.use(PengajuanRouter);
app.use(StatusRouter);
app.use(TypePengajuanRouter);
app.use(AuthRouter);

store.sync();

//menentukan port aplikasi
app.listen(process.env.PORT, ()=>{
    console.log(`server running at port ${process.env.PORT}`);
})
