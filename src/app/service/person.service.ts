import {Injectable} from '@angular/core';
import {isNull} from "util";

@Injectable()
export class PersonService {
    constructor() {
    }

    getRoles(): Array<any> {
        const ROLES: Array<any> = [
            {key: "rich", title: "Rich"},
            {key: "genius", title: "Genius"},
            {key: "superpower", title: "Superpower"},
        ];
        return ROLES;
    }

    getColumns(): Array<any> {
        let arr = [
            {title: 'Name', type: 'string', name: 'name'},
        ];
        for (let role of this.getRoles()) {
            arr.push({title: role.title, name: role.key, type: 'checkbox'})
        }
        arr.push({title: 'Delete', type: 'link', name: 'deleteoption'});
        return arr;
    }

    getTableData(): Array<any> {
        let items = [];
        let itemsStr = window.localStorage['personsItems'];
        if (itemsStr) {
            JSON.parse(itemsStr).forEach((e) => {
                items.push(e);
            });
        }
        return items;
    }

    save(data): void {
        this.deleteOption('del', data);
        localStorage['personsItems'] = JSON.stringify(data);
    }

    getFormTemplate(): void {
        return this.deleteOption('get', null);
    }

    deleteOption(param, data) {
        if (param === 'get' && isNull(data)) {
            let obj = {name: '', deleteoption: false};
            for (let role of this.getRoles()) {
                obj[role.key] = false;
            }
            return obj;
        }
        if (param === 'del' && !isNull(data)) {
            for (let row of data) {
                delete(row['deleteoption']);
            }
            return data;
        }
    }

    eachRolesCount(personsData): {} {
        let eachRolesCount: {} = {};
        for (let role of this.getRoles()) {
            let count: number = 0;
            for (let person of personsData) {
                if (person[role.key]) {
                    ++count;
                }
            }
            eachRolesCount[role.key] = count;
        }
        return eachRolesCount;
    }
}
