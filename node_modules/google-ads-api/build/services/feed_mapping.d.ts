import { FeedMapping } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class FeedMappingService extends Service {
    get(id: number | string): Promise<FeedMapping>;
    list(options?: ServiceListOptions): Promise<Array<{
        feed_mapping: FeedMapping;
    }>>;
    create(feed_mapping: FeedMapping | Array<FeedMapping>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(feed_mapping: FeedMapping | Array<FeedMapping>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
