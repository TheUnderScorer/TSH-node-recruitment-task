import IPost from '../types/models/IPost';

export default class Post implements IPost
{
    public constructor(
        public id: string,
        public title: string,
        public content: string )
    {
    }

    public static fromObject( { content, title }: Partial<IPost> )
    {
        return new this( '', title, content );
    }
}
