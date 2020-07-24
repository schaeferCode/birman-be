import { AdGroupAd } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupAdService extends Service {
    get(id: number | string): Promise<AdGroupAd>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_ad: AdGroupAd;
    }>>;
    create(ad_group_ad: AdGroupAd | Array<AdGroupAd>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_ad: AdGroupAd | Array<AdGroupAd>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
