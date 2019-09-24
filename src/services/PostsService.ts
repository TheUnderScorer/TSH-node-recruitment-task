import IPost from '../types/models/IPost';
import { v4 as uuid } from 'uuid';
import Exception from '../exceptions/Exception';
import { ErrorCodes } from '../types/error/ErrorCodes';

export default class PostsService
{
    protected posts: Map<string, IPost> = new Map<string, IPost>();

    public async addPost( post: IPost ): Promise<IPost>
    {
        if ( !post.id ) {
            post.id = uuid();
        }

        this.posts.set( post.id, post );

        return post;
    }

    public async getPostById( id: string ): Promise<IPost>
    {
        this.checkPostPresence( id );

        return this.posts.get( id );
    }

    public async removePost( id: string ): Promise<IPost>
    {
        this.checkPostPresence( id );

        const post = this.posts.get( id );
        this.posts.delete( id );

        return post;
    }

    public async getPosts(): Promise<IPost[]>
    {
        return Array.from( this.posts.values() );
    }

    public async removeAllPosts(): Promise<boolean>
    {
        this.posts.clear();

        return true;
    }

    public async hasPost( postId: string ): Promise<boolean>
    {
        return this.posts.has( postId );
    }

    protected checkPostPresence( id: string ): void
    {
        if ( !this.posts.has( id ) ) {
            throw new Exception( `Unable to find post with id ${ id }`, ErrorCodes.UnableToFindPostById )
        }
    }
}
