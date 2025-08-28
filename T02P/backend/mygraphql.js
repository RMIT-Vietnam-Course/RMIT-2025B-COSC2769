const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLNonNull,
} = require('graphql');

const { customers, orders, products } = require('./data');

const app = express();
const PORT = 3000;

app.use(cors());

const matchCustomersByName = (name) => {
    if (name === '*') return customers;
    const re = new RegExp(name, 'i');
    return customers.filter(c => re.test(c.name));
};

const quantitySoldFor = (productId) =>
    orders.filter(o => o.product_id === productId).reduce((s, o) => s + o.quantity, 0);

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
    },
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        sell_off: { type: GraphQLBoolean },
        percent: {
            type: GraphQLFloat,
            resolve: (p) => (p.sell_off ? p.percent : 0),
        },
        quantity_sold: {
            type: GraphQLInt,
            resolve: (p) => quantitySoldFor(p.id),
        },
    },
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        customers: {
            type: new GraphQLList(CustomerType),
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: (parent, args) => matchCustomersByName(args.name),
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve: () => products,
        },
    },
});

const schema = new GraphQLSchema({ query: QueryType });

app.all('/graphql', createHandler({ schema }));

app.listen(PORT, () => console.log(`GraphQL running at http://localhost:${PORT}/graphql`));