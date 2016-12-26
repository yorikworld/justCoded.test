import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../service/person.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [PersonService]
})
export class HomeComponent implements OnInit {
    personsData: Array<any>;

    constructor(private personService: PersonService) {
        this.personsData = this.personService.getTableData();
    }

    ngOnInit() {
    }
}
