import { Campaign } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignService extends Service {
    get(id: number | string): Promise<Campaign>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign: Campaign;
    }>>;
    create(campaign: Campaign | Array<Campaign>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign: Campaign | Array<Campaign>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
