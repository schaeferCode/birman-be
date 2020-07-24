import { CustomerLabel } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerLabelService extends Service {
    get(id: number | string): Promise<CustomerLabel>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_label: CustomerLabel;
    }>>;
    create(customer_label: CustomerLabel | Array<CustomerLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_label: CustomerLabel | Array<CustomerLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
