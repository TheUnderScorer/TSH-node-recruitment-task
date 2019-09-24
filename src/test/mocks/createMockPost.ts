import Post from '../../models/Post';
import * as faker from 'faker';

export default (): Post => new Post( faker.random.uuid(), faker.random.word(), faker.random.words() )
