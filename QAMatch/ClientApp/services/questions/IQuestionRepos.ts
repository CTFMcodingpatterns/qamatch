import { Question } from './Question';

export interface IQuestionRepos {
    getQuestionsAsync(): Promise<Question[]>;
}