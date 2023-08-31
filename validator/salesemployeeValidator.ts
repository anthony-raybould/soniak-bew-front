import type { SalesEmployee } from "../model/salesemployee";



export const validateSalesEmployee = function (salesemployee: SalesEmployee): string {
    if (salesemployee.name.length > 50) {
        return "Name greater than 50 characters";
    }

    if (!(salesemployee.bankAccountNumber.length == 8)) {
        return "bank number is not the right length"
    }

    if (!(salesemployee.niNumber.length == 9)) {
        return "national insurance number is not the right length"
    }

    return null
}