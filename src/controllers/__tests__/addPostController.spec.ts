import { bootstrap } from '../../app';
import PostsService from '../../services/PostsService';
import { BAD_REQUEST, CREATED } from 'http-status';
import * as faker from 'faker';
import IPost from '../../types/models/IPost';
import { ErrorCodes } from '../../types/error/ErrorCodes';
import { Server } from 'http';
import { Application } from 'express';

let app: Application;
let postsService: PostsService;

const mockId = '81d18e4a-45dd-4bcf-b79b-2abd8b932663';
const request = require( 'supertest' );

jest.mock( 'uuid', () => ( {
    v4: () => mockId
} ) );

describe( 'addPostController', () =>
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

    it( 'Should create and return post', async () =>
    {
        const requestBody: Partial<IPost> = {
            title:   faker.random.word(),
            content: faker.random.words( 10 )
        };

        return request( app )
            .post( '/posts' )
            .send( requestBody )
            .expect( CREATED )
            .then( async response =>
            {
                expect( response.body.message ).toEqual( 'Post created.' );
                expect( response.body.payload ).toEqual( {
                    ...requestBody,
                    id: mockId
                } );
                expect( await postsService.getPostById( response.body.payload.id ) ).toEqual( {
                    ...requestBody,
                    id: mockId
                } );
            } )
    } );

    it.each( [
        [ 'Title is required', { content: faker.random.words( 10 ) } ],
        [ 'Content is required', { title: faker.random.word() } ],
        [ 'Title cannot contain more than 100 characters', {
            title:   faker.random.words( 100 ),
            content: faker.random.words( 10 )
        } ],
        [ 'Content cannot contain more than 1000 characters', {
            title:   faker.random.word(),
            content: faker.random.words( 1000 )
        } ]
    ] )( 'Validates posts fields', ( expectedError: string, requestBody: any ) =>
    {
        return request( app )
            .post( '/posts' )
            .send( requestBody )
            .expect( BAD_REQUEST )
            .then( response =>
            {
                expect( response.body.error ).toEqual( {
                    code:    ErrorCodes.InvalidRequestFields,
                    message: expectedError
                } );
            } );
    } )
} );
