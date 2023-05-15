import { DatePipe } from "@angular/common";
import { Data } from "@angular/router";

export interface servico {
    id: number;
    Prestador: string;
    userName: string;
    email: string,
    data: Date
}