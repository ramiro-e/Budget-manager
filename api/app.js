const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const mainRouter = require('./src/routers/mainRouter');
const userRouter = require('./src/routers/userRouter');
const authMiddleware = require('./src/middlewares/auth');


const publicPath = path.resolve(__dirname, './public');
app.use(cors());

app.use(express.static(publicPath));
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', mainRouter);
app.use('/api/user', userRouter);


app.set('port', process.env.PORT || "3001");
app.listen(app.get('port'), () => {
    console.log(`[app] http://localhost:3001`);
} );

// app.use(session({
//     secret : 'topSecret',
//     resave: true,
//     saveUninitialized: true,
// }))

// app.use(cookieParser());

app.use(authMiddleware);

