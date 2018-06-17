export class Answer {
    id: number;
    questionId: number;
    surveyId: number;
    userId: number;
    choices: {} | null;
    scale: number | null;
    weight: number | null;
}