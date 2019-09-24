import { NextFunction, Request, Response } from 'express';
import PostsService from '../services/PostsService';

export default async ( req: Request, res: Response, next: NextFunction ) =>
{
    try {
        const { postId } = req.params;
        const postsService = req.app.get( 'postsService' ) as PostsService;
        const post = await postsService.getPostById( postId );

        return res.json( {
            payload: post
        } );
    } catch ( e ) {
        return next( e );
    }
}
