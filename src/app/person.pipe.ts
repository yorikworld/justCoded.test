import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
    name: 'personFilter',
    pure: false
})
@Injectable()
export class PersonFilterPipe implements PipeTransform {
    transform(value: any, routeUrl: any) {
        if (routeUrl !== '') {
            return value.filter(rows => rows[routeUrl] === true);
        }else
            return value;
    }
}