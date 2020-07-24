import { AdGroupFeed } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class AdGroupFeedService extends Service {
    get(id: number | string): Promise<AdGroupFeed>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_feed: AdGroupFeed;
    }>>;
    create(ad_group_feed: AdGroupFeed | Array<AdGroupFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(ad_group_feed: AdGroupFeed | Array<AdGroupFeed>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
