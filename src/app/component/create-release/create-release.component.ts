import {Component, OnInit} from '@angular/core';
import '@cds/core/file/register.js';
import {DataService} from "../../service/data/data.service";
import * as JSZip from "jszip";
import {ReleaseInfo} from "../../model/ReleaseInfo";

@Component({
    selector: 'app-create-release',
    templateUrl: './create-release.component.html',
    styleUrls: ['./create-release.component.sass']
})
export class CreateReleaseComponent implements OnInit {
    input: any;
    selectedFiles: any;
    showDownloadSpinner: boolean = false;
    selectedReleaseInfo: ReleaseInfo = {} as ReleaseInfo;
    presentCard: boolean = false;
    btnText = "Create Pull Request";
    autoMergeOn = false;
    showModal = false;
    modalMessage = "Pull request created successfully";

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    processRelease() {
        this.showDownloadSpinner = true;
        if (this.selectedFiles != null) {
            if (this.autoMergeOn) {
                this.dataService.createRelease("cyber-schema", this.selectedFiles.item(0)).subscribe((releases: any) => {
                    if (releases !== undefined) {
                        this.showDownloadSpinner = false;
                        this.showModal = true;
                    }
                });
            } else {
                this.dataService.createPullRequest("cyber-schema", this.selectedFiles.item(0)).subscribe((releases: any) => {
                    if (releases !== undefined) {
                        this.showDownloadSpinner = false;
                        this.showModal = true;
                    }
                });
            }
        }
    }

    fileSelected(event: any): void {
        this.presentCard = false;
        this.selectedFiles = event.target.files;
        JSZip.loadAsync(this.selectedFiles.item(0)).then((zip) => { // <----- HERE
            Object.keys(zip.files).forEach((filename) => { // <----- HERE
                zip.files[filename].async('string').then((fileData) => {
                    this.selectedReleaseInfo = JSON.parse(fileData);
                    this.presentCard = true;
                });
            });
        });
    }

    toggleChanged() {
        this.autoMergeOn = !this.autoMergeOn;
        if (this.autoMergeOn) {
            this.btnText = "Create Release";
            this.modalMessage = "Release created successfully"
        } else {
            this.btnText = "Create Pull Request";
            this.modalMessage = "Pull request created successfully"
        }
    }

    closeModal() {
        this.showModal = false;
    }
}
