import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {PersonService} from "../../service/person.service";


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
    roles: Array<any>;
    formValid: boolean;
    formData: any;
    @Output() addEvent: EventEmitter<any>;
    @Input() routeUrl: string;

    constructor(private personService: PersonService) {
        this.roles = this.personService.getRoles();
        this.formValid = false;
        this.addEvent = new EventEmitter();
        this.formData = this.personService.getFormTemplate();
    }

    ngOnInit() {
        if (this.routeUrl !== '')
            this.formData[this.routeUrl] = true;
    }

    onKeyUp(personInputValue): void {
        if (personInputValue.length > 0) {
            // this.formData.id = ++this.formData.id;
            this.formData.name = personInputValue;
            this.formValid = true;
        } else {
            this.formValid = false;
        }
    }

    onSubmit(): void {
        this.addEvent.emit(this.formData);
        this.formValid = false;
    }

    onCheckboxChange(role): void {
        this.formData[role.key] = !this.formData[role.key];
    }
}
