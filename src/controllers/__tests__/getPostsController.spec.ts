import createMockPost from '../../test/mocks/createMockPost';
import { bootstrap } from '../../app';
import PostsService from '../../services/PostsService';
import { OK } from 'http-status';
import { Server } from 'http';
import { Application } from 'express';

let app: Application;
let postsService: PostsService;
const request = require( 'supertest' );

describe( 'getPostsController', () =>
{
    beforeAll( async () =>
    {
        app = await bootstrap();
        postsService = app.get( 'postsService' ) as PostsService;
    } );

    afterAll( ( done ) =>
    {
        const server = app.get( 'server' ) as Server;
        server.close( done );
    } );

    it( 'Returns all posts', async () =>
    {
        const post = createMockPost();
        await postsService.addPost( post );

        return request( app )
            .get( '/posts' )
            .expect( OK )
            .then( response =>
            {
                expect( response.body.payload ).toEqual( [
                    post
                ] );
            } )
    } );
} );
