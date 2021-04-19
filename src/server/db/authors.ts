import { Query } from './index';
import { Author, db } from '../../utilities'

//find for authentication purposes
const find = async (email: Author['email']) => Query(`SELECT * FROM Authors WHERE email = ?`, [email])
//Get one author and the titles of their posts
const GetAuthor = async (id: Author['id']) => Query(`SELECT a.id, a.name, a.email, a.description, a._created, p.title, p.id AS postid
FROM Authors a
JOIN Posts p
ON a.id = p.authorid
WHERE a.id = ?`, [id]);
//Get all authors
const GetAuthors = async () => Query('SELECT * FROM Authors');
//Create an author
const CreateAuthor = async (name: Author['name'], email: Author['email'], password: Author['password'], description: Author['description']) => Query(`INSERT INTO Authors ( name, email, password, description ) VALUES (?, ?, ?, ?)`, [name, email, password, description]);
//Update an author
const UpdateAuthor = async (id: Author['id'], name: Author['name'], email: Author['email'], description: Author['description']) => Query(`UPDATE Authors SET name = ?, email = ?, description = ? WHERE id = ?`, [name, email, description, id]);
//Delete an author
const DeleteAuthor = async (id: Author['id']) => Query('DELETE FROM Authors WHERE id = ?', [id]);

//exporting functions to be used by routes
export default {
    find,
    GetAuthor,
    GetAuthors,
    CreateAuthor,
    UpdateAuthor,
    DeleteAuthor
}