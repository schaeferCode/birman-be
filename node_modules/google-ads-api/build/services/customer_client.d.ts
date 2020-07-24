import { CustomerClient } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class CustomerClientService extends Service {
    get(id: number | string): Promise<CustomerClient>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_client: CustomerClient;
    }>>;
}
