﻿import { Question } from './Question';
import { IQuestionRepos } from './IQuestionRepos';
import { Children } from 'react';

export class QuestionInMemory implements IQuestionRepos {

    QuestionList: Question[];

    constructor() {
        this.QuestionList = QuestionInMemory.createQuestions();
    }

    public static createQuestions(): Question[] {
        const questions: Question[] = [
            this.createMCQuestion(1, 1,
                "title01",
                "description1 bbb bbb bbb bbb bbb bbb bbb bbb bbb from memory class"),
            this.createMCQuestion(2, 2, "title02", "description2 from memory class"),
            this.createMCQuestion(3, 3, "title03", "description3 from memory class"),
            this.createMCQuestion(4, 4, "title04", "description4 from memory class"),
            this.createMCQuestion(5, 5, "title05", "description5 from memory class"),
        ];
        return questions;
    }

    public static createMCQuestion(id: number, order: number, title: string, desc?: string, choices?: string[], weight?: number): Question {
        const question: Question = {
            kind: "multiplechoice",
            id: id,
            order: order,
            title: title,
            description: desc || null,
            choices: choices || this.createConsensChoices(),
            weight: weight || 0
        };
        return question;
    }

    //TODO: create separate Question Type
    public static createConsensChoices(): string[] {
        const choices: string[] = [
            "agree 100%",
            "agree 50%",
            "agree 0%",
            "disagree 50%",
            "disagree 100%"
        ];
        return choices;
    }

    public static createColorChoices(num: number): string[] {
        const choices: string[] = [
            "red",
            "green",
            "blue",
            "yellow",
            "magenta"
        ];
        return choices.slice(0, num);
    }

    public getQuestionsAsync(): Promise<Question[]> {
        const statements = this.QuestionList;
        const promise = new Promise<Question[]>((resolve, reject) => resolve(statements));
        return promise;
    }
}