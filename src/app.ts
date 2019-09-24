import * as Express from 'express';
import { Application } from 'express';
import PostsService from './services/PostsService';
import addPostController from './controllers/addPostController';
import getPostsController from './controllers/getPostsController';
import getPostController from './controllers/getPostController';
import deletePostController from './controllers/deletePostController';
import errorHandler from './middlewares/errorHandler';
import notFoundController from './controllers/notFoundController';
import { body } from 'express-validator'

export const bootstrap = (): Promise<Application> =>
{
    return new Promise( ( ( resolve ) =>
    {
        const app = Express();
        const port = process.env.PORT || 8000;

        app.use( Express.json() );
        app.use( Express.urlencoded( {
            extended: true
        } ) );

        app.set( 'postsService', new PostsService() );

        app.post( '/posts', [
            body( 'title' )
                .not()
                .isEmpty()
                .withMessage( 'Title is required' )
                .isLength( { max: 100 } )
                .withMessage( 'Title cannot contain more than 100 characters' ),
            body( 'content' )
                .not()
                .isEmpty()
                .withMessage( 'Content is required' )
                .isLength( { max: 1000 } )
                .withMessage( 'Content cannot contain more than 1000 characters' )
        ], addPostController );
        app.get( '/posts', getPostsController );
        app.get( '/posts/:postId', getPostController );
        app.delete( '/posts/:postId', deletePostController );
        app.all( '*', notFoundController );

        app.use( errorHandler );

        const server = app.listen( port, () =>
        {
            console.log( `Server started on port ${ port }` );

            app.set( 'server', server );
            resolve( app );
        } );
    } ) )
};
