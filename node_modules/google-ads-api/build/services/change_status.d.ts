import { ChangeStatus } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class ChangeStatusService extends Service {
    get(id: number | string): Promise<ChangeStatus>;
    list(options?: ServiceListOptions): Promise<Array<{
        change_status: ChangeStatus;
    }>>;
}
