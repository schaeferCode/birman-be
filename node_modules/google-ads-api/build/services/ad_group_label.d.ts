import { AdGroupLabel } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupLabelService extends Service {
    get(id: number | string): Promise<AdGroupLabel>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_label: AdGroupLabel;
    }>>;
    create(ad_group_label: AdGroupLabel | Array<AdGroupLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_label: AdGroupLabel | Array<AdGroupLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
