import { CustomerClientLink } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerClientLinkService extends Service {
    get(id: number | string): Promise<CustomerClientLink>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_client_link: CustomerClientLink;
    }>>;
    create(customer_client_link: CustomerClientLink | Array<CustomerClientLink>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_client_link: CustomerClientLink | Array<CustomerClientLink>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
