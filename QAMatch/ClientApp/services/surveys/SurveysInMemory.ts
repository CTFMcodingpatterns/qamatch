import { Survey } from './Survey';
import { ISurveyRepos } from './ISurveyRepos';

export class SurveysInMemory implements ISurveyRepos {
    private SurveyList: Survey[];
    private static LastId: number = 0;

    constructor() {
        this.SurveyList = SurveysInMemory.createSurveys();
    }

    static createSurveys(): Survey[] {
        //TODO
        const surveys: Survey[] = [
            { id: 1, order: 1, title: "survey01", description: "description 01" },
            { id: 2, order: 2, title: "survey02", description: "description 02" },
            { id: 3, order: 3, title: "survey03", description: "description 03" },
            { id: 4, order: 4, title: "survey04", description: "description 04" },
        ];
        return surveys;
    }

    getSurveysAsync(): Promise<Survey[]> {
        //TODO
        const surveys: Survey[] = this.SurveyList;
        const promise = new Promise<Survey[]>((resolve, reject) => resolve(surveys));
        return promise;
    }

    getSurveyByIdAsync(id: number): Promise<Survey> {
        //TODO
        return null;
    }

}