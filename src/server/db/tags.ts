import { Query } from './index';
import { Tag, PostTags } from '../../utilities';

//Get all tags
const GetTags = async () => Query('SELECT * FROM Tags');
//Get one tag
const GetTag = async (id: Tag['id']) => Query(`SELECT * FROM Tags WHERE id = ?`, [id]);
//create a tag
const CreateTag = async (name: Tag['name']) => Query(`INSERT INTO Tags ( name ) VALUES (?)`, [name]);
//update a tag
const UpdateTag = async (id: Tag['id'], name: Tag['id']) => Query(`UPDATE Tags SET name = ? WHERE id = ?`, [name, id])
//delete a tag
const DeleteTag = async (id: Tag['id']) => Query('DELETE FROM Tags WHERE id = ?', [id])

export default {
    GetTags,
    GetTag,
    CreateTag,
    UpdateTag,
    DeleteTag
}