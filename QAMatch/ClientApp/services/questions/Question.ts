export class Question {
    id: number;
    surveyId: number;
    order: number;
    kind: string;
    title: string;
    description: string;
    choices: string[] | null;
    scale: number | null;
    weight: number | null;
}