import * as express from 'express';
import authorsRouter from './authors';
import postsRouter from './posts';
import tagsRouter from './tags';
import posttagsRouter from './posttags';
import authRouter from './auth';
import vipRouter from './vip';
import contactRouter from './contact';
let router = express.Router();

//directing site traffic to correct router
router.use('/api/authors', authorsRouter);
router.use('/api/contact', contactRouter)
router.use('/api/posts', postsRouter);
router.use('/api/tags', tagsRouter);
router.use('/api/posttags', posttagsRouter);
router.use('/auth', authRouter);
router.use('/api/vip', vipRouter);
export default router;