import { SharedCriterion } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class SharedCriterionService extends Service {
    get(id: number | string): Promise<SharedCriterion>;
    list(options?: ServiceListOptions): Promise<Array<{
        shared_criterion: SharedCriterion;
    }>>;
    create(shared_criterion: SharedCriterion | Array<SharedCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(shared_criterion: SharedCriterion | Array<SharedCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
