import { AdGroupSimulation } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class AdGroupSimulationService extends Service {
    get(id: number | string): Promise<AdGroupSimulation>;
    list(options?: ServiceListOptions): Promise<Array<{
        ad_group_simulation: AdGroupSimulation;
    }>>;
}
