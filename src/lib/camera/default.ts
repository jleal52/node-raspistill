import {ICamera, ICameraOptions} from './interfaces';
import {AbstractCamera} from "./abstract";
import options from "./options/default";
import {execFile} from 'child_process';

const CMD = 'raspistill';

export class DefaultCamera extends AbstractCamera implements ICamera {
    static readonly DEFAULT_OPTIONS: ICameraOptions = options;

    public takePhoto = (fileName?: string): Promise<Buffer> => {
        return Promise.all([
            new Promise((resolve, reject) => {
                execFile(CMD, [], (error: any, stdout: string, stderr: string) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(stdout)
                });
            }),
            this.watcher.watch(this.getOption('outputDir') + fileName || this.getOption('fileName'))
        ])
            .then((arr) => {
                return arr[1];
            });
    }
}