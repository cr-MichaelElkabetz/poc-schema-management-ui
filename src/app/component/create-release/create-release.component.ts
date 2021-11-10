import {Component, OnInit} from '@angular/core';
import '@cds/core/file/register.js';
import {DataService} from "../../service/data/data.service";
import * as JSZip from "jszip";

@Component({
    selector: 'app-create-release',
    templateUrl: './create-release.component.html',
    styleUrls: ['./create-release.component.sass']
})
export class CreateReleaseComponent implements OnInit {
    input: any;
    selectedFiles: any;
    showDownloadSpinner: boolean = false;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    createPR() {
        this.showDownloadSpinner = true;
        if (this.selectedFiles != null) {
            this.dataService.createRelease("cyber-schema", this.selectedFiles.item(0)).subscribe((releases: any) => {
                if (releases !== undefined) {
                    this.showDownloadSpinner = false;
                }
            });
        }
    }

    fileSelected(event: any): void {
        this.selectedFiles = event.target.files;
        // JSZip.loadAsync(this.selectedFiles.item(0)).then((zip) => { // <----- HERE
        //     Object.keys(zip.files).forEach((filename) => { // <----- HERE
        //         zip.files[filename].async('string').then((fileData) => { // <----- HERE
        //             console.log("file data: " + fileData);
        //         });
        //     });
        // });
    }
}
