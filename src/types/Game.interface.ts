import {Tool} from './Tool.interface';

export interface Game {
    id?: number;
    name: string;
    description: string;
    tools: Array<Tool>;
}
