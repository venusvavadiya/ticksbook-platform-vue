import ApolloClient from 'apollo-client';
import {
  GQL_ARCHIVE_ORDER_BOOK,
  GQL_CREATE_ORDER,
  GQL_CREATE_ORDER_BOOK,
  GQL_RENAME_ORDER_BOOK,
  GQL_UNARCHIVE_ORDER_BOOK,
} from '@/graphql/mutations';

export class GraphQLPlatformMutationService {
  private readonly client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async createOrder(
    orderBookId: string,
    tickerId: string,
    orderQuantity: number,
    unitPrice: number,
  ): Promise<string> {
    const variables = {
      orderBookId, tickerId, orderQuantity, unitPrice,
    };
    const response = await this.client.mutate({ mutation: GQL_CREATE_ORDER, variables });
    return response.data.createOrder;
  }

  async archiveOrderBook(orderBookId: string): Promise<string> {
    const variables = { orderBookId };
    const reponse = await this.client.mutate({ mutation: GQL_ARCHIVE_ORDER_BOOK, variables });
    return reponse.data.archiveOrderBook;
  }

  async createOrderBook(orderBookName: string): Promise<string> {
    const variables = { orderBookName };
    const response = await this.client.mutate({ mutation: GQL_CREATE_ORDER_BOOK, variables });
    return response.data.createOrderBook;
  }

  async renameOrderBook(orderBookId: string, orderBookName: string): Promise<string> {
    const variables = { orderBookId, orderBookName };
    const response = await this.client.mutate({ mutation: GQL_RENAME_ORDER_BOOK, variables });
    return response.data.renameOrderBook;
  }

  async unarchiveOrderBook(orderBookId: string): Promise<string> {
    const variables = { orderBookId };
    const response = await this.client.mutate({ mutation: GQL_UNARCHIVE_ORDER_BOOK, variables });
    return response.data.unarchiveOrderBook;
  }
}
