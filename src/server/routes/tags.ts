import * as express from 'express';
import db from '../db';
import { tokenCheck } from '../middlewares/auth.mw';
let router = express.Router()

//routes get requests for one or all tags
router.get('/:id?', async (req, res) => {
    let id = Number(req.params.id);
    if (!isNaN(id)) {
        let thisTag = await db.tags.GetTag(id)
        res.json(thisTag);
    } else {
        let alltags = await db.tags.GetTags()
        res.json(alltags);
    }
});

//routes post request for new tags
router.post('/', tokenCheck, async (req, res) => {
    let body = req.body
    let myTag = await db.tags.CreateTag(body.name)
    res.json(myTag);
})

//routes update requests to edit an existing tag
router.put('/:id', tokenCheck, async (req, res) => {
    let id = Number(req.params.id);
    let body = req.body
    let tag = await db.tags.GetTag(id)

    if (Object.keys(tag).length === 0) {
        res.sendStatus(404);
        return;
    }
    await db.tags.UpdateTag(id, body.name)

    res.sendStatus(200);
})

//delete a tag
router.delete('/:id', tokenCheck, async (req, res) => {
    let id = Number(req.params.id);
    await db.tags.DeleteTag(id)
    res.sendStatus(200);
});

export default router;