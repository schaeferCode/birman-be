import { CampaignFeed } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignFeedService extends Service {
    get(id: number | string): Promise<CampaignFeed>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_feed: CampaignFeed;
    }>>;
    create(campaign_feed: CampaignFeed | Array<CampaignFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_feed: CampaignFeed | Array<CampaignFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
