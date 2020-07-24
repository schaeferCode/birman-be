import { SharedSet } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class SharedSetService extends Service {
    get(id: number | string): Promise<SharedSet>;
    list(options?: ServiceListOptions): Promise<Array<{
        shared_set: SharedSet;
    }>>;
    create(shared_set: SharedSet | Array<SharedSet>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(shared_set: SharedSet | Array<SharedSet>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
