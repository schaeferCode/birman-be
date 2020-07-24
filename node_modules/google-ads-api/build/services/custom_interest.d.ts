import { CustomInterest } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomInterestService extends Service {
    get(id: number | string): Promise<CustomInterest>;
    list(options?: ServiceListOptions): Promise<Array<{
        custom_interest: CustomInterest;
    }>>;
    create(custom_interest: CustomInterest | Array<CustomInterest>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(custom_interest: CustomInterest | Array<CustomInterest>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
