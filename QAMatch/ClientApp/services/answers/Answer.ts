export class Answer {
    id: number;
    order: number;
    kind: string;
    title: string;
    choices: string[] | null;
    weight: number | null;
}