import { FeedItemTarget } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class FeedItemTargetService extends Service {
    get(id: number | string): Promise<FeedItemTarget>;
    list(options?: ServiceListOptions): Promise<Array<{
        feed_item_target: FeedItemTarget;
    }>>;
    create(feed_item_target: FeedItemTarget | Array<FeedItemTarget>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(feed_item_target: FeedItemTarget | Array<FeedItemTarget>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
