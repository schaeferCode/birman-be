import { AdGroupAdLabel } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupAdLabelService extends Service {
    get(id: number | string): Promise<AdGroupAdLabel>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_ad_label: AdGroupAdLabel;
    }>>;
    create(ad_group_ad_label: AdGroupAdLabel | Array<AdGroupAdLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_ad_label: AdGroupAdLabel | Array<AdGroupAdLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
