export class Answer {
    id: number;
    order: number;
    kind: string;
    title: string;
    choices: {} | null;
    weight: number | null;
}