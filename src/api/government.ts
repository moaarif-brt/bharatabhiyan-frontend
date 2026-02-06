import { api } from "@/lib/api";

export interface GovernmentServiceCategory {
    id: number;
    name: string;
    description: string;
}

export const fetchGovernmentServices = () =>
    api.get<GovernmentServiceCategory[]>("/government-services/");

export interface GovernmentServiceDetails {
    service_id: number;
    questions: {
        id: number;
        question: string;
    }[];
}

export const fetchGovernmentServiceDetails = (serviceId: number | string) =>
    api.post<GovernmentServiceDetails>("/government-services/", {
        service_id: serviceId
    });

export interface ServiceAnswerResponse {
    question_id: string;
    question: string;
    service_name: string;
    answer: string;
}

export const fetchServiceAnswer = (questionId: number | string, language: string = "english") =>
    api.get<ServiceAnswerResponse>(`/service-answer/`, {
        params: {
            question_id: questionId,
            language
        }
    });
