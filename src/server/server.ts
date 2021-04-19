import * as express from 'express';
import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import apiRouter from './routes/index';
import * as path from 'path';
import db from './db';
import { compareHash } from '../utilities/passwords'
const app = express();

app.use(express.json());

import { configurePassport } from './middlewares/passport-strategies.mw';

configurePassport(app);
app.use(express.static('public'));
app.use(apiRouter);
app.get(`*`, (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

