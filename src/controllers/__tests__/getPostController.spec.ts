import { bootstrap } from '../../app';
import PostsService from '../../services/PostsService';
import { OK } from 'http-status';
import createMockPost from '../../test/mocks/createMockPost';
import { Server } from 'http';
import { Application } from 'express';

let app: Application;
let postsService: PostsService;
const request = require( 'supertest' );

describe( 'getPostController', () =>
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

    it( 'Should return post by ID', async () =>
    {
        const post = createMockPost();
        await postsService.addPost( post );

        return request( app )
            .get( `/posts/${ post.id }` )
            .expect( OK )
            .then( response =>
            {
                expect( response.body.payload ).toEqual( post );
            } );
    } );
} );
