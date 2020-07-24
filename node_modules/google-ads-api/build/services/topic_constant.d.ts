import { TopicConstant } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class TopicConstantService extends Service {
    get(id: number | string): Promise<TopicConstant>;
    list(options?: ServiceListOptions): Promise<Array<{
        topic_constant: TopicConstant;
    }>>;
}
