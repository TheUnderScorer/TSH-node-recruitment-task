import { NextFunction, Request, Response } from 'express';
import PostsService from '../services/PostsService';

export default async ( req: Request, res: Response, next: NextFunction ) =>
{
    try {
        const postsService = req.app.get( 'postsService' ) as PostsService;
        const posts = await postsService.getPosts();

        return res.json( {
            payload: posts
        } );
    } catch ( e ) {
        return next( e );
    }
}
