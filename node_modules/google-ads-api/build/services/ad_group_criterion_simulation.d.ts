import { AdGroupCriterionSimulation } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class AdGroupCriterionSimulationService extends Service {
    get(id: number | string): Promise<AdGroupCriterionSimulation>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_criterion_simulation: AdGroupCriterionSimulation;
    }>>;
}
