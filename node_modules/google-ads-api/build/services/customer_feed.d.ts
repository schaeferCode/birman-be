import { CustomerFeed } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerFeedService extends Service {
    get(id: number | string): Promise<CustomerFeed>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_feed: CustomerFeed;
    }>>;
    create(customer_feed: CustomerFeed | Array<CustomerFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_feed: CustomerFeed | Array<CustomerFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
