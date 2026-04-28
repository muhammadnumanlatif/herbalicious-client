import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://cms.herbalicious-shop.com/graphql', // Keep static or remove entirely if not needed
    documents: ['lib/graphql/**/*.graphql'],
    generates: {
        './lib/gql/': {
            preset: 'client',
            plugins: []
        }
    },
    ignoreNoDocuments: true,
};

export default config;
