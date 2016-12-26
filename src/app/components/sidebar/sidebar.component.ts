import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {PersonService} from "../../service/person.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {
    @Input() personsData: Array<any>;
    roles: Array<any>;
    eachRolesCount: {} = {};

    constructor(private personService: PersonService) {
        this.roles = personService.getRoles();
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.eachRolesCount = this.personService.eachRolesCount(this.personsData);
    }

}
