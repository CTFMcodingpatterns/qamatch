export class Answer {
    id: number;
    questionId: number;
    surveyId: number;
    userId: number;
    choices: {} | null;
    weight: number | null;
}