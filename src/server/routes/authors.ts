import * as express from 'express';
import { authenticate } from 'passport';
import { ReqUser } from '../../utilities';
import db from '../db';
import { tokenCheck } from '../middlewares/auth.mw';
let router = express.Router()

//routes get requests for one or all authors
router.get('/:id?', async (req: ReqUser, res) => {
    let id = Number(req.params.id);
    console.log(id)
    if (!isNaN(id)) {
        let authors = await db.authors.GetAuthor(id)
        res.json(authors);
        console.log(authors)
    } else {
        let allauthors = await db.authors.GetAuthors()
        res.json(allauthors);
        console.log(allauthors)
    }
});

//routes post request for new authors
router.post('/', async (req, res) => {
    let body = req.body
    let thisAuthor = await db.authors.CreateAuthor(body.name, body.email, body.password, body.description)
    res.json(thisAuthor);
})

//updates an existing authors information
router.put('/:id',  tokenCheck, async (req, res) => {
    console.log("put router hit")
    let id = Number(req.params.id);
    let body = req.body
    console.log(id)
    console.log(body)

    let myAuthor = await db.authors.UpdateAuthor(id, body.name, body.email, body.description)

    res.json(myAuthor);
});

//delete an author
router.delete('/:id',  tokenCheck, async (req, res) => {
    let id = Number(req.params.id);
    let deleteAuthor = await db.authors.DeleteAuthor(id)
    res.json(deleteAuthor)
});


export default router;