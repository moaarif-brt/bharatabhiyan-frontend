import { api } from "@/lib/api";

export interface CaptainVerificationPayload {
    phone: string;
    aadhaar_front: File;
    aadhaar_back: File;
    captain_code: string;
}

export const submitCaptainVerification = async (payload: CaptainVerificationPayload) => {
    const formData = new FormData();
    formData.append("phone", payload.phone);
    formData.append("aadhaar_front", payload.aadhaar_front);
    formData.append("aadhaar_back", payload.aadhaar_back);
    formData.append("captain_code", payload.captain_code);

    const res = await api.post("/captain/submit-verification/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
