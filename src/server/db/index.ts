import * as mysql from 'mysql';
import authors from './authors';
import posts from './posts';
import tags from './tags';
import posttags from './posttags';
import { MySQL_Res, db } from '../../utilities';
import config from '../config';
//connect to mysql
export const Connection = mysql.createPool(config.db);

//Query function to interact w/ database
export const Query = <T = any>(query: string, values?:Array<string | number>) => {
    const SQLstring = mysql.format(query, values)
    return new Promise<T>((resolve, reject) => {
        Connection.query(SQLstring, (err, results) => {
        if(err) return reject(err);
        return resolve(results);
        });
    });
}

export default {
    authors,
    posts,
    tags,
    posttags
}