import { CampaignLabel } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignLabelService extends Service {
    get(id: number | string): Promise<CampaignLabel>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_label: CampaignLabel;
    }>>;
    create(campaign_label: CampaignLabel | Array<CampaignLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_label: CampaignLabel | Array<CampaignLabel>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
