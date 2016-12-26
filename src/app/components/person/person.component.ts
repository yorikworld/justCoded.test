import {Component, OnInit, DoCheck, KeyValueDiffers, Input} from '@angular/core';
import {PersonService} from "../../service/person.service";
import {Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HomeComponent} from "../../routes/home/home.component";

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css'],
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class PersonComponent implements OnInit, DoCheck {

    @Input() personsData: Array<any>;
    routeUrl: string;
    differ: any;
    roles: Array<any>;
    columns: Array<any>;
    deleteOption: {} = {};

    constructor(private _router: Router,
                private differs: KeyValueDiffers,
                private location: Location,
                private personService: PersonService) {
        this.roles = this.personService.getRoles();
        this.differ = differs.find({}).create(null);
        this.columns = this.personService.getColumns();
        this.routeUrl = this._router.url.replace('/', '');
    }

    ngOnInit() {
        let config: Array<any> = [];
        this.roles.forEach(role => {
            config.push({path: role.key, component: HomeComponent});
        });
        this._router.resetConfig(config);

        for (let person of this.personsData) {
            this.deleteOption[this.personsData.indexOf(person)] = false;
        }
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.personsData);
        if (changes) {
            this.saveData();
        }
    }

    saveData(): void {
        this.personService.save(this.personsData);
    }

    onAddEvent(person): void {
        for (let person of this.personsData) {
            this.deleteOption[this.personsData.indexOf(person)] = false;
        }
        this.personsData.push(JSON.parse(JSON.stringify(person)));
        this.redirect(person);
    }

    onDeleteEvent(column): void {
        this.personsData.splice(this.personsData.indexOf(column), 1);
    }

    onToggleEvent(): void {
        this.saveData();
    }

    redirect(person): void {
        if (!person[this.routeUrl]) {
            this.routeUrl = '';
            this.location.go('/');
        }
    }

}
