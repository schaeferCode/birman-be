import { BiddingStrategy } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class BiddingStrategyService extends Service {
    get(id: number | string): Promise<BiddingStrategy>;
    list(options?: ServiceListOptions): Promise<Array<{
        bidding_strategy: BiddingStrategy;
    }>>;
    create(bidding_strategy: BiddingStrategy | Array<BiddingStrategy>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(bidding_strategy: BiddingStrategy | Array<BiddingStrategy>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
