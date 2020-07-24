import { FeedItem } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class FeedItemService extends Service {
    get(id: number | string): Promise<FeedItem>;
    list(options?: ServiceListOptions): Promise<Array<{
        feed_item: FeedItem;
    }>>;
    create(feed_item: FeedItem | Array<FeedItem>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(feed_item: FeedItem | Array<FeedItem>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
