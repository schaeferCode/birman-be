import { CampaignBudget } from 'google-ads-node/build/lib/resources';
import Service, { Mutation } from './service';
import { ServiceListOptions, ServiceCreateOptions } from '../types';
export default class CampaignBudgetService extends Service {
    get(id: number | string): Promise<CampaignBudget>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_budget: CampaignBudget;
    }>>;
    create(campaign_budget: CampaignBudget | Array<CampaignBudget>, options?: ServiceCreateOptions): Promise<Mutation>;
    update(campaign_budget: CampaignBudget | Array<CampaignBudget>, options?: ServiceCreateOptions): Promise<Mutation>;
    delete(id: number | string, options?: ServiceCreateOptions): Promise<Mutation>;
}
