//universally defined types
import { Request } from 'express'
//a post
export interface Post {
    id: number,
    title: string,
    name?: Author['name'],
    content: string,
    authorid: Author['id'],
    _created: string,
    tagid: PostTags['tagid'],
    tagname: Tag['name']
};
//an author
export interface Author {
    id?: number,
    name?: string,
    email?: string,
    description?: string,
    password?: string,
    title?: string,
    _created?: string,
    postid?: Post['id']
};
//a tag
export interface Tag {
    id: number,
    name: string,
    _created: string
};
//the id of a post and then its respective tag id
export interface PostTags {
    postid: Post['id'],
    tagid: Tag['id']
};
//all posts posted with a tag
export interface PostsOfATag {
    name: Author['name'],
    id: Post['id'],
    tagid: Tag['id'],
    title: Post['title'],
    content: Post['content'],
    _created: Post['_created'],
    authorid: Post['authorid'],
    tagname: Tag['name']
};
//types errors from mysql
export interface MySQL_Err {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
    index?: number;
    sql?: string;
}
//types success messages from mysql
export interface MySQL_Success {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
}
//interface for SQL login credentials
export interface db {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

//backend authentication of an author
export interface ReqUser extends Request {
    user?: Payload
    // user?: {
    //     id?: Author['id'];
    //     name?: Author['name'];
    //     email?: Author['email'];
    //     description?: Author['description'];
    //     password?: Author['password'];
    //     title?: string;
    //     _created?: string;
    //     postid?: Post['id'];
    // } | Payload
}
//the typings for our JWT payload
export interface Payload extends Author { 
    role?: number
 }
//A combo typing that way I can just import one with an if/else statement
export type MySQL_Res = MySQL_Success & MySQL_Err;