import { AdGroup } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupService extends Service {
    get(id: number | string): Promise<AdGroup>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group: AdGroup;
    }>>;
    create(ad_group: AdGroup | Array<AdGroup>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group: AdGroup | Array<AdGroup>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
