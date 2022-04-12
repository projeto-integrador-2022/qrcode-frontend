import { City } from "./city.model";

export interface StateDistrict {
    
    acronym: string;
    name: string;
    cities: City[];
}