import { Question } from './Question';
import { IQuestionRepos } from './IQuestionRepos';
import { Children } from 'react';

export class QuestionsInMemory implements IQuestionRepos {

    private QuestionList: Question[];
    private static LastId: number = 0;

    constructor() {
        this.QuestionList = []
            .concat(QuestionsInMemory.createQuestions(1))
            .concat(QuestionsInMemory.createQuestions(2))
            .concat(QuestionsInMemory.createQuestions(3))
            .concat(QuestionsInMemory.createQuestions(4))
            ;
    }

    public static createQuestions(sid: number): Question[] {
        const questions: Question[] = [
            this.createMCQuestion(QuestionsInMemory.nextId(), sid, 1,
                "title01",
                "description1 bbb bbb bbb bbb bbb bbb bbb bbb bbb from memory class"),
            this.createMCQuestion(QuestionsInMemory.nextId(), sid, 2, "title02", "description2 from memory class"),
            this.createMCQuestion(QuestionsInMemory.nextId(), sid, 3, "title03", "description3 from memory class"),
            this.createMCQuestion(QuestionsInMemory.nextId(), sid, 4, "title04", "description4 from memory class"),
            this.createMCQuestion(QuestionsInMemory.nextId(), sid, 5, "title05", "description5 from memory class"),
        ];
        return questions;
    }

    public static createMCQuestion(id: number, sid: number, order: number, title: string, desc?: string, choices?: string[], weight?: number): Question {
        const question: Question = {
            kind: "multiplechoice",
            id: id,
            surveyId: sid,
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

    private static nextId(): number {
        //TODO
        QuestionsInMemory.LastId = QuestionsInMemory.LastId + 1;
        return QuestionsInMemory.LastId;
    }

    private findQuestionById(sid: number, id: number) {
        return this.QuestionList
            .filter(question => question.surveyId == sid)
            .filter(question => question.id == id)[0];
    }

    public getQuestionsAsync(sid: number): Promise<Question[]> {
        const questions: Question[] = this.QuestionList
            .filter(q => q.surveyId == sid);
        const promise = new Promise<Question[]>((resolve, reject) => resolve(questions));
        return promise;
    }

    public getQuestionByIdAsync(sid: number, id: number): Promise<Question> {
        const question: Question = this.findQuestionById(sid, id);  
        const promise = new Promise<Question>((resolve, reject) => {
            if (question != null) resolve(question)
            else reject("no data");
        });
        return promise;
    }

    createQuestionAsync(sid: number, question: Question): Promise<boolean> {
        //TODO
        let done: boolean = false;
        if (!this.findQuestionById(sid, question.id)) {
            const id = QuestionsInMemory.nextId();
            const questionNew = { ...question, surveyId: sid, id: id };
            this.QuestionList = this.QuestionList
                .concat(questionNew);
            done = true;
        }
        const promise = new Promise<boolean>((resolve, reject) => {
            if (done) resolve(done)
            else reject("not done");
        });
        return promise;
    }

    updateQuestionAsync(sid: number, question: Question): Promise<boolean> {
        let done: boolean = false;
        if (this.findQuestionById(sid, question.id)) {
            this.QuestionList = this.QuestionList
                .map(qil => (qil.surveyId == sid && qil.id == question.id) ? question : qil);
            done = true;
        }
        const promise = new Promise<boolean>((resolve, reject) => {
            if (done) resolve(done)
            else reject("not done");
        });
        return promise;
    }

    deleteQuestionAsync(sid: number, id: number): Promise<boolean> {
        //TODO
        let done: boolean = false;
        if (this.findQuestionById(sid, id)) {
            this.QuestionList = this.QuestionList
                .filter(q => !(q.surveyId == sid && q.id == id));
            done = true;
        }
        const promise = new Promise<boolean>((resolve, reject) => {
            if (done) resolve(done)
            else reject("not done");
        });
        return promise;
    }

}