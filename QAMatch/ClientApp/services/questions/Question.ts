export interface Question {
    kind: string;
    id: number;
    order: number;
    title: string;
    description: string;
    choices: string[] | null;
    weight: number | null;
}