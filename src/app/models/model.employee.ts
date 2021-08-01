import { ID } from "@datorama/akita";

export interface ModelEmployee {
    id: ID;
    name: string;
    email: string;
    updated_date: number;
}