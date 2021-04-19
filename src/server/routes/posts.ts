import * as express from 'express';
import db from '../db';
import { MySQL_Res, ReqUser } from '../../utilities';
import { tokenCheck } from '../middlewares/auth.mw';

let router = express.Router()

//routes get requests for one or all posts
router.get('/:id?', async (req, res) => {
    console.log(req.params.id)
    let id = Number(req.params.id);
    console.log(id)
    
    if (!isNaN(id)) {
        let thisPost = await db.posts.GetPost(id)
        res.json(thisPost);
        console.log(thisPost)
        console.log('GetPost hit')
    } else {
        let allPosts = await db.posts.GetPosts()
        res.json(allPosts);
        console.log('GetPosts hit')
    }
});

//routes post request for new post
router.post('/', tokenCheck, async (req: ReqUser, res) => {
    let body = req.body
    let thisPost = await db.posts.CreatePost(req.user.id, body.title, body.content)
    
    console.log(thisPost);
    
    
    if (thisPost.sqlMessage) {
        res.json(thisPost.sqlMessage)
      } else {
        if (body.tagid) {
            await db.posttags.CreatePostTag(
                body.tagid,
                thisPost.insertId
            ) 
        }
        res.json(thisPost);
      }
})

//routes put requests to update an existing post
router.put('/:id', tokenCheck, async (req, res) => {
    let id = Number(req.params.id);
    let body = req.body
    let post = await db.posts.GetPost(id)

    if (Object.keys(post).length === 0) {
        res.sendStatus(404);
        return;
    }
    await db.posts.UpdatePost(id, body.title, body.content)

    res.sendStatus(200);
})

//routes delete requests to delete a post
router.delete('/:id', tokenCheck, async (req, res) => {
    let id = Number(req.params.id);
    await db.posts.DeletePost(id)
    res.sendStatus(200);
});

export default router;

