import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: process.env.WORDPRESS_API_URL || 'https://cms.herbalicious-shop.com/graphql',
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
