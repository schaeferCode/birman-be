import { OperatingSystemVersionConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class OperatingSystemVersionConstantService extends Service {
    get(id: number | string): Promise<OperatingSystemVersionConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        operating_system_version_constant: OperatingSystemVersionConstant;
    }>>;
}
