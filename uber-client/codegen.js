module.exports = {
    schema: [
        {
            'http://localhost:4000/graphql': {
                headers: {
                    "X-JWT": process.env.X_JWT
                }
             },
        },
    ],
    documents: ['./src/**/*graphql.ts'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};