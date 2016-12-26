import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

    @Input() personsData: Array<any>;
    @Input() routeUrl: string;
    @Input() columns: Array<any>;

    @Output() deleteEvent: EventEmitter<any>;
    @Output() toggleEvent: EventEmitter<any>;
    sortField: {} = {};
    @Input() deleteOption: {} = {};

    constructor() {
        this.deleteEvent = new EventEmitter<any>();
        this.toggleEvent = new EventEmitter<any>();
        this.sortField['sort'] = '+name';
        this.sortField['class'] = 'fa-sort';
    }

    public ngOnInit() {
    }

    deleteQuestion(rows): void {
        for (let row in this.deleteOption) {
            this.deleteOption[row] = false;
        }
        this.deleteOption[this.personsData.indexOf(rows)] = true;
    }

    onDelete(row): void {
        delete this.deleteOption[this.personsData.indexOf(row)];
        this.deleteEvent.emit(row);
    }

    onDontDelete(column): void {
        this.deleteOption[this.personsData.indexOf(column)] = false;
    }

    onToggleClick(event): void {
        this.toggleEvent.emit(event);
    }

    onSort(column): void {
        let char = this.sortField['sort'][0];
        if (char === '+') {
            this.sortField['sort'] = '-' + column;
            this.sortField['class'] = 'fa-sort-desc';
        }
        if (char === '-') {
            this.sortField['sort'] = column;
            this.sortField['class'] = 'fa-sort-asc';
        }
        if (char !== '-' && char !== '+') {
            this.sortField['sort'] = '+';
            this.sortField['class'] = 'fa-sort';
        }
    }
}
