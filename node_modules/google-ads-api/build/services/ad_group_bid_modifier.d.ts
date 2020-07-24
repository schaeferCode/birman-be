import { AdGroupBidModifier } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupBidModifierService extends Service {
    get(id: number | string): Promise<AdGroupBidModifier>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_bid_modifier: AdGroupBidModifier;
    }>>;
    create(ad_group_bid_modifier: AdGroupBidModifier | Array<AdGroupBidModifier>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_bid_modifier: AdGroupBidModifier | Array<AdGroupBidModifier>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
