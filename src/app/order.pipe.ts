import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
    name: 'orderby',
    pure: false
})
@Injectable()
export class OrderByPipe implements PipeTransform {
    value: string[] = [];

    static _orderByComparator(a: any, b: any): number {

        if (a === null || typeof a === "undefined") {
            a = 0;
        }
        if (b === null || typeof b === "undefined") {
            b = 0;
        }

        if (
            (isNaN(parseFloat(a)) || !isFinite(a)) ||
            (isNaN(parseFloat(b)) || !isFinite(b))
        ) {
            a = a.toString();
            b = b.toString();
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            }
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        } else {
            if (parseFloat(a) < parseFloat(b)) {
                return -1;
            }
            if (parseFloat(a) > parseFloat(b)) {
                return 1;
            }
        }

        return 0;
    }

    public transform(input: any, config = "+"): any {
        if (!input) {
            return input;
        }

        this.value = [...input];
        let value = this.value;
        if (!Array.isArray(value)) {
            return value;
        }

        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            let propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            let desc = propertyToCheck.substr(0, 1) === "-";

            if (!propertyToCheck || propertyToCheck === "-" || propertyToCheck === "+") {
                return !desc ? value.sort() : value.sort().reverse();
            } else {
                let property: string = propertyToCheck.substr(0, 1) === "+" || propertyToCheck.substr(0, 1) === "-"
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function (a: any, b: any) {
                    let aValue = a[property];
                    let bValue = b[property];

                    let propertySplit = property.split(".");

                    if (typeof aValue === "undefined" && typeof bValue === "undefined" && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    return !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);
                });
            }
        } else {
            return value.sort(function (a: any, b: any) {
                for (let i = 0; i < config.length; i++) {
                    let desc = config[i].substr(0, 1) === "-";
                    let property = config[i].substr(0, 1) === "+" || config[i].substr(0, 1) === "-"
                        ? config[i].substr(1)
                        : config[i];

                    let aValue = a[property];
                    let bValue = b[property];

                    let propertySplit = property.split(".");

                    if (typeof aValue === "undefined" && typeof bValue === "undefined" && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    let comparison = !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);

                    if (comparison !== 0) {
                        return comparison;
                    }
                }

                return 0;
            });
        }
    }
}