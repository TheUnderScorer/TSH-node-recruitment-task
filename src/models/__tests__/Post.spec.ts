import IPost from '../../types/models/IPost';
import Post from '../Post';
import * as faker from 'faker';

describe( 'Post model', () =>
{
    it( 'creates post from object', () =>
    {
        const requestBody: Partial<IPost> = {
            title:   faker.random.word(),
            content: faker.random.words( 10 )
        };

        expect( Post.fromObject( requestBody ) ).toEqual( {
            id:      '',
            title:   requestBody.title,
            content: requestBody.content
        } )
    } )
} );
