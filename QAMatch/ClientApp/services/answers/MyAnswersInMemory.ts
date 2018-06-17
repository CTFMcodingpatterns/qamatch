import { Answer } from './Answer';
import { IAnswerRepos } from './IAnswerRepos';

export class MyAnswersInMemory implements IAnswerRepos {

    public getAnswersAsync(uid: number, sid: number): Promise<Answer[]> {
        const answers = this.AnswerList
            .filter(answer => answer.userId == uid)
            .filter(answer => answer.surveyId == sid);
        const promise = new Promise<Answer[]>((resolve, reject) => resolve(answers));
        return promise;
    }

    public getAnswerById(id: number): Promise<Answer> {
        throw new Error("Method not implemented.");
    }

    public getAnswerByUSQIdAsync(uid: number, sid: number, qid: number): Promise<Answer> {
        const answer: Answer = this.AnswerList
            .filter(answer => answer.userId == uid)
            .filter(answer => answer.surveyId == sid)
            .filter(answer => answer.questionId == qid)[0];
        const promise = new Promise<Answer>((res, rej) => res(answer));
        return promise
    }

    public createAnswerAsync(answer: Answer): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public updateAnswerAsync(answer: Answer): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public deleteAnswerByUSQIdAsync(uid: number, sid: number, qid: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


    private AnswerList: Answer[];

    constructor() {
        //TODO
        this.AnswerList = []
            .concat(this.createAnswers(0, 1));
    }

    private createAnswers(uid: number, sid: number): Answer[] {
        const answers: Answer[] = [
            { id: 1, userId: uid, surveyId: sid, questionId: 1, choices: {}, scale: 0, weight: 0 },
            { id: 2, userId: uid, surveyId: sid, questionId: 2, choices: {}, scale: 0, weight: 0 },
            { id: 3, userId: uid, surveyId: sid, questionId: 3, choices: {}, scale: 0, weight: 0 },
            { id: 4, userId: uid, surveyId: sid, questionId: 4, choices: {}, scale: 0, weight: 0 },
            //{ id: 5, userId: uid, surveyId: sid, questionId: 5, choices: {}, scale: 0, weight: 0 },
        ];
        return answers;
    }

}