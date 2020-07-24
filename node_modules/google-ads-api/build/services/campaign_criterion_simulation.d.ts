import { CampaignCriterionSimulation } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class CampaignCriterionSimulationService extends Service {
    get(id: number | string): Promise<CampaignCriterionSimulation>;
    list(options?: ServiceListOptions): Promise<Array<{
        campaign_criterion_simulation: CampaignCriterionSimulation;
    }>>;
}
