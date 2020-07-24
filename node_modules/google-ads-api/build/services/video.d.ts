import { Video } from 'google-ads-node/build/lib/resources';
import Service from './service';
import { ServiceListOptions } from '../types';
export default class VideoService extends Service {
    get(id: number | string): Promise<Video>;
    list(options?: ServiceListOptions): Promise<Array<{
        video: Video;
    }>>;
}
