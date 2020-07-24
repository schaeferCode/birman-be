import { CustomerManagerLink } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerManagerLinkService extends Service {
    get(id: number | string): Promise<CustomerManagerLink>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_manager_link: CustomerManagerLink;
    }>>;
    create(customer_manager_link: CustomerManagerLink | Array<CustomerManagerLink>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_manager_link: CustomerManagerLink | Array<CustomerManagerLink>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
