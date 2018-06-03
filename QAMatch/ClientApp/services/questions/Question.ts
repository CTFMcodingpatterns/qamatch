export class Question {
    id: number;
    surveyId: number;
    order: number;
    kind: string;
    title: string;
    description: string;
    choices: string[] | null;
    weight: number | null;
}