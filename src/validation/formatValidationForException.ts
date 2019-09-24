import { Result, ValidationError } from 'express-validator';

export default ( validation: Result<ValidationError> ): string =>
{
    return validation.array().map( err => err.msg ).join( ', ' );
}
