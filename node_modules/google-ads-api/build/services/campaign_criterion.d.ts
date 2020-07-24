import { CampaignCriterion } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignCriterionService extends Service {
    get(id: number | string): Promise<CampaignCriterion>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_criterion: CampaignCriterion;
    }>>;
    create(campaign_criterion: CampaignCriterion | Array<CampaignCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_criterion: CampaignCriterion | Array<CampaignCriterion>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
