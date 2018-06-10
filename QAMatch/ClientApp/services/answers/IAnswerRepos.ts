import { Answer } from './Answer';

export interface IAnswerRepos {
    getAnswersAsync(sid: number): Promise<Answer[]>;
    getAnswerByIdAsync(sid: number, id: number): Promise<Answer>;
    createAnswerAsync(sid: number, answer: Answer): Promise<boolean>;
    updateAnswerAsync(sid: number, answer: Answer): Promise<boolean>;
    deleteAnswerAsync(sid: number, id: number): Promise<boolean>;
}