import { ObjectId } from "mongodb";
export type Ref<T> = T | ObjectId;
export type verificationTarget = "PHONE" | "EMAIL";
export type rideStatus = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";