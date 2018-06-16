import { Answer } from './Answer';

export interface IAnswerRepos {
    getAnswersAsync(uid: number, sid: number): Promise<Answer[]>;
    getAnswerById(id: number): Promise<Answer>;
    getAnswerByUSQIdAsync(uid: number, sid: number, qid: number): Promise<Answer>;

    createAnswerAsync(answer: Answer): Promise<number>;

    updateAnswerAsync(answer: Answer): Promise<boolean>;

    deleteAnswerByUSQIdAsync(uid: number, sid: number, qid: number): Promise<boolean>;
}