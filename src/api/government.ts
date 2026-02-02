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

export interface AIGuideResponse {
    success: boolean;
    data: {
        response: string;
        language: string;
        question: string;
    };
    message?: string;
}

export const fetchAIGuide = (question: string, language: string = "english") =>
    api.post<AIGuideResponse>("/ai/guide/", {
        question,
        language
    });
