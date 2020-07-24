import { Feed } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class FeedService extends Service {
    get(id: number | string): Promise<Feed>;
    list(options?: ServiceListOptions): Promise<Array<{
        feed: Feed;
    }>>;
    create(feed: Feed | Array<Feed>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(feed: Feed | Array<Feed>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
