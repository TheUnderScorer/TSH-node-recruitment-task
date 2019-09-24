import { bootstrap } from './app';

bootstrap().catch( err =>
{
    console.error( err );
    process.exit( 1 );
} );
