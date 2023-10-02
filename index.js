const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRoute.js');
const PengajuanRouter = require('./routes/PengajuanRoute.js');
const StatusRouter = require('./routes/StatusRoute.js');
const TypePengajuanRouter = require('./routes/TypePengajuanRoute.js');
const AuthRouter = require('./routes/AuthRoute.js');
const CoaRouter = require('./routes/CoaRoute.js');
const CostCenterRouter = require('./routes/CostCenterRoute.js');
const AnnaliticAccount = require('./routes/AnnaliticAccountRoute.js');
const Ptjb = require('./routes/PtjbRoute.js');
const Export = require('./routes/ExportRoute.js');
const Reset = require('./routes/ResetRoute.js');

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


// buat database
// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    // proxy: false,
    saveUninitialized: true,
    store:store,
    cookie: {
        // httpOnly: true,
        secure: 'auto',
        maxAge: 1000 * 60 * 60
    }
}));

app.use(cors({
    credentials: true,
    origin: [process.env.URL_ORIGIN, process.env.URL_ORIGIN_PUBLIC],
    // methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"]
}));

app.use(express.json());
app.use(UserRouter);
app.use(PengajuanRouter);
app.use(StatusRouter);
app.use(TypePengajuanRouter);
app.use(AuthRouter);
app.use(CoaRouter);
app.use(CostCenterRouter);
app.use(AnnaliticAccount);
app.use(Ptjb);
app.use(Export);
app.use(Reset);

// store.sync();

//menentukan port aplikasi
app.listen(process.env.PORT, ()=>{
    console.log(`server running at port ${process.env.PORT}`);
})
