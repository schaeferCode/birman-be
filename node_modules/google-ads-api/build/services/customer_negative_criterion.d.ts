import { CustomerNegativeCriterion } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CustomerNegativeCriterionService extends Service {
    get(id: number | string): Promise<CustomerNegativeCriterion>;
    list(options?: ServiceListOptions): Promise<Array<{
        customer_negative_criterion: CustomerNegativeCriterion;
    }>>;
    create(customer_negative_criterion: CustomerNegativeCriterion | Array<CustomerNegativeCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(customer_negative_criterion: CustomerNegativeCriterion | Array<CustomerNegativeCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
