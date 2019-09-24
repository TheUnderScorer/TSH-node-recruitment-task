import IPost from '../../types/models/IPost';
import * as faker from 'faker';
import PostsService from '../PostsService';
import { ErrorCodes } from '../../types/error/ErrorCodes';

let post: IPost;
let service: PostsService;

describe( 'PostsService', () =>
{
    beforeEach( () =>
    {
        service = new PostsService();
        post = {
            id:      faker.random.uuid(),
            title:   faker.random.word(),
            content: faker.random.words( 10 )
        }
    } );

    it( 'addPost and getPostById', async () =>
    {
        const result = await service.addPost( post );

        const foundPost = await service.getPostById( post.id );

        expect( result ).toEqual( post );
        expect( foundPost ).toEqual( post );
    } );

    it( 'removePost', async () =>
    {
        await service.addPost( post );
        await service.removePost( post.id );

        expect( await service.getPosts() ).toHaveLength( 0 );
    } );

    it( 'removeAllPosts', async () =>
    {
        await service.addPost( post );
        await service.removeAllPosts();

        expect( await service.getPosts() ).toHaveLength( 0 );
    } );

    it( 'getPosts', async () =>
    {
        await service.addPost( post );
        const posts = await service.getPosts();

        expect( posts ).toEqual( [ post ] );
    } );

    it( 'hasPost', async () =>
    {
        await service.addPost( post );

        expect( await service.hasPost( post.id ) ).toBeTruthy();
    } );

    it( 'removePost should throw exception if posts is not found in map', ( done ) =>
    {
        service.removePost( 'invalid id' )
            .then( () => fail( 'No exception thrown' ) )
            .catch( err =>
            {
                expect( err.name ).toEqual( ErrorCodes.UnableToFindPostById );

                done();
            } )
    } );

    it( 'getPostById should throw exception if posts is not found in map', ( done ) =>
    {
        service.getPostById( 'invalid id' )
            .then( () => fail( 'No exception thrown' ) )
            .catch( err =>
            {
                expect( err.name ).toEqual( ErrorCodes.UnableToFindPostById );

                done();
            } )
    } );

} );
