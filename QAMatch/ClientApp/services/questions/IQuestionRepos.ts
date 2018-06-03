import { Question } from './Question';

export interface IQuestionRepos {
    getQuestionsAsync(sid: number): Promise<Question[]>;
    getQuestionByIdAsync(sid: number, id: number): Promise<Question>;
    createQuestionAsync(sid: number, question: Question): Promise<boolean>;
    updateQuestionAsync(sid: number, question: Question): Promise<boolean>;
    deleteQuestionAsync(sid: number, id: number): Promise<boolean>;
}