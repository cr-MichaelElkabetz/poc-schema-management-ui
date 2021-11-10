import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'schema-management-ui';
    isCreateRelease: boolean = false;

    setView(param: string) {
        if (param === 'get') {
            this.isCreateRelease = false;
        } else {
            this.isCreateRelease = true;
        }
    }
}
