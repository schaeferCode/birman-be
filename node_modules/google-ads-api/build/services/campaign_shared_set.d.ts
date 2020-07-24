import { CampaignSharedSet } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignSharedSetService extends Service {
    get(id: number | string): Promise<CampaignSharedSet>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_shared_set: CampaignSharedSet;
    }>>;
    create(campaign_shared_set: CampaignSharedSet | Array<CampaignSharedSet>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_shared_set: CampaignSharedSet | Array<CampaignSharedSet>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
