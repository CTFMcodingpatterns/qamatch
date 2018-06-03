import { Survey } from "./Survey";

export interface ISurveyRepos {
    getSurveysAsync(): Promise<Survey[]>;
    getSurveyByIdAsync(id: number): Promise<Survey>;
}