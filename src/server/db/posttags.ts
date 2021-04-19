import { Query } from './index';
import { Tag, PostTags } from '../../utilities';

//Get all tags
const GetPostTags = async () => Query('SELECT * FROM PostTags');
//Get one tag
const GetPostTag = async (id: PostTags['tagid']) => Query(`SELECT p.id, p.title, p.content, p.authorid, p._created, t.tagid as tagid, a.name, ts.name as tagname
FROM Posts p
INNER JOIN PostTags t
ON p.id = t.postid
INNER JOIN Authors a
on p.authorid = a.id
INNER JOIN Tags ts
on ts.id = t.tagid
WHERE t.tagid = ?`, [id]);
//create a tag
const CreatePostTag = async (tagid: PostTags['tagid'], postid: PostTags['postid']) => Query(`INSERT INTO PostTags ( tagid, postid ) VALUES (?, ?)`, [tagid, postid]);
//update a tag
const UpdatePostTag = async (tagid: PostTags['tagid'], postid: PostTags['postid']) => Query(`UPDATE PostTags SET postid = ? WHERE tagid = ?`, [postid, tagid])
//delete a tag
const DeletePostTag = async (id: PostTags['postid']) => Query('DELETE FROM PostTags WHERE id = ?', [id])

export default {
    GetPostTags,
    GetPostTag,
    CreatePostTag,
    UpdatePostTag,
    DeletePostTag
}