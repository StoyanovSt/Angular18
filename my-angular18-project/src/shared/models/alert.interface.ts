import { AlertTypeEnum } from "../enums/alert.enum";

export interface AlertInterface {
    type: AlertTypeEnum,
    text: string
}