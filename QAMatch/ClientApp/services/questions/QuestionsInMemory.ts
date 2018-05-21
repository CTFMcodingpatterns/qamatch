import { Question } from './Question';
import { IQuestionRepos } from './IQuestionRepos';
import { Children } from 'react';

export class QuestionsInMemory implements IQuestionRepos {
    QuestionList: Question[];

    constructor() {
        this.QuestionList = QuestionsInMemory.createQuestions();
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

    private FindQuestionById(id: number) {
        return this.QuestionList
            .filter(question => question.id == id)[0];
    }

    public getQuestionsAsync(): Promise<Question[]> {
        const questions = this.QuestionList;
        const promise = new Promise<Question[]>((resolve, reject) => resolve(questions));
        return promise;
    }

    public getQuestionByIdAsync(id: number): Promise<Question> {
        const question: Question = this.FindQuestionById(id);  
        const promise = new Promise<Question>((resolve, reject) => {
            if (question != null) resolve(question)
            else reject("no data");
        });
        return promise;
    }

    updateQuestionAsync(question: Question): Promise<boolean> {
        let done: boolean = false;
        if (this.FindQuestionById(question.id)) {
            this.QuestionList = this.QuestionList
                .map(qil => (qil.id == question.id) ? question : qil);
            done = true;
        }
        const promise = new Promise<boolean>((resolve, reject) => {
            if (done) resolve(done)
            else reject("not ok");
        });
        return promise;
    }
}