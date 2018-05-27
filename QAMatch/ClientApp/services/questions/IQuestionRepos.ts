import { Question } from './Question';

export interface IQuestionRepos {
    getQuestionsAsync(): Promise<Question[]>;
    getQuestionByIdAsync(id: number): Promise<Question>;
    updateQuestionAsync(question: Question): Promise<boolean>;
    deleteQuestionAsync(id: number): Promise<boolean>;
}