import { Router } from 'express';
import { compareHash, generateHash } from '../../../utilities/passwords';
import db from '../../db';
import { Request } from 'express';
import * as passport from 'passport';
import { authenticate } from 'passport';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const router = Router();


//
router.post('/', async (req, res) => {
    const newAuthor = req.body;
    console.log(newAuthor)
    try {
        newAuthor.password = generateHash(newAuthor.password)
            let thisAuthor = await db.authors.CreateAuthor(newAuthor.name, newAuthor.email, newAuthor.password, newAuthor.description)
            const token = jwt.sign({ id: thisAuthor.insertid, email: thisAuthor.email, role: 1},
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