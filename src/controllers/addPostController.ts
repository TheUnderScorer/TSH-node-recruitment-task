import { NextFunction, Request, Response } from 'express';
import Post from '../models/Post';
import { BAD_REQUEST, CREATED } from 'http-status';
import PostsService from '../services/PostsService';
import { validationResult } from 'express-validator';
import RequestException from '../exceptions/RequestException';
import formatValidationForException from '../validation/formatValidationForException';
import { ErrorCodes } from '../types/error/ErrorCodes';

export default async ( req: Request, res: Response, next: NextFunction ) =>
{
    const validation = validationResult( req );

    if ( !validation.isEmpty() ) {
        return next(
            new RequestException(
                formatValidationForException( validation ),
                ErrorCodes.InvalidRequestFields,
                BAD_REQUEST
            )
        )
    }

    const postsService = req.app.get( 'postsService' ) as PostsService;

    const post = Post.fromObject( req.body );
    await postsService.addPost( post );

    return res.status( CREATED ).json( {
        message: 'Post created.',
        payload: post
    } );
}
