import ApolloClient from 'apollo-client';
import {
  GQL_ORDER_BOOK,
  GQL_ORDER_BOOKS,
} from '@/graphql/queries';

export class GraphQLPlatformQueryService {
  private readonly client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async getOrderBookById(id: string): Promise<unknown> {
    const variables = { id };
    const response = await this.client.query({ query: GQL_ORDER_BOOK, variables });
    return response.data.orderBook;
  }

  async getOrderBooks(): Promise<unknown> {
    const response = await this.client.query({ query: GQL_ORDER_BOOKS });
    return response.data.orderBooks;
  }
}
