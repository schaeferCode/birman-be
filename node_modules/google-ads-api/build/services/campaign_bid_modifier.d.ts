import { CampaignBidModifier } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignBidModifierService extends Service {
    get(id: number | string): Promise<CampaignBidModifier>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_bid_modifier: CampaignBidModifier;
    }>>;
    create(campaign_bid_modifier: CampaignBidModifier | Array<CampaignBidModifier>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_bid_modifier: CampaignBidModifier | Array<CampaignBidModifier>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
