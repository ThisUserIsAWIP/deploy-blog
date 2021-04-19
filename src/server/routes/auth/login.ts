import { Router } from 'express';
import { compareHash } from '../../../utilities/passwords';
import { ReqUser, Payload } from '../../../utilities';
import db from '../../db';
import { Request } from 'express';
import * as passport from 'passport';
import { authenticate } from 'passport';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const router = Router();


//
router.post('/', authenticate('local'), async (req: ReqUser, res) => {
    const authorLogin = req.user
    console.log(authorLogin)
    try {
            const token = jwt.sign({ id: authorLogin.id, email: authorLogin.email, role: 1},
                 config.jwt.secret,
                 { expiresIn: '30d'}
                 );
                 res.json(token);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'my code sucks'});
    }
})

export default router;