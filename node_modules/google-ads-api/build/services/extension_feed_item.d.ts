import { ExtensionFeedItem } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class ExtensionFeedItemService extends Service {
    get(id: number | string): Promise<ExtensionFeedItem>;
    list(options?: ServiceListOptions): Promise<Array<{
        extension_feed_item: ExtensionFeedItem;
    }>>;
    create(extension_feed_item: ExtensionFeedItem | Array<ExtensionFeedItem>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(extension_feed_item: ExtensionFeedItem | Array<ExtensionFeedItem>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
