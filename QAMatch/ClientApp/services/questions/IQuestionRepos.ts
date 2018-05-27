import { Question } from './Question';

export interface IQuestionRepos {
    getQuestionsAsync(): Promise<Question[]>;
    getQuestionByIdAsync(id: number): Promise<Question>;
    createQuestionAsync(question: Question): Promise<boolean>;
    updateQuestionAsync(question: Question): Promise<boolean>;
    deleteQuestionAsync(id: number): Promise<boolean>;
}