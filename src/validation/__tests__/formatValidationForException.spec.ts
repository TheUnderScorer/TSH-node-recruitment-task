import * as faker from 'faker';
import formatValidationForException from '../formatValidationForException';

let validation: any;

describe( 'formatValidationForException', () =>
{
    beforeEach( () =>
    {
        validation = {
            errors: [
                {
                    msg: faker.random.words( 15 )
                },
                {
                    msg: faker.random.words( 20 )
                }
            ],
            array()
            {
                return this.errors;
            }
        }
    } );

    it( 'Should return formatted string', () =>
    {
        const expected = validation.array().map( item => item.msg ).join( ', ' );
        const actual = formatValidationForException( validation );

        expect( actual ).toEqual( expected );
    } )
} );
