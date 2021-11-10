import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data/data.service";
import {Release} from "../../model/Release";
import {ReleaseInfo} from "../../model/ReleaseInfo";


@Component({
    selector: 'app-get-release',
    templateUrl: './get-release.component.html',
    styleUrls: ['./get-release.component.sass']
})
export class GetReleaseComponent implements OnInit {
    selectedRelease: Release = {} as Release;
    selectedReleaseInfo: ReleaseInfo = {} as ReleaseInfo;
    releases: any;
    showDownloadSpinner: boolean = false;
    showDownloadAlert: boolean = false;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.showDownloadSpinner = true;
        this.dataService.getReleases("cyber-schema").subscribe((releases: any) => {
            if (releases !== undefined) {
                this.releases = releases;
                this.releases[0].tag = this.releases[0].tag + "-latest";
                this.selectedRelease = this.releases[0];
                this.dataService.getReleaseInfo("cyber-schema", this.selectedRelease.id).subscribe((releaseInfo: any) => {
                    if (releaseInfo !== undefined) {
                        this.selectedReleaseInfo = releaseInfo;
                        this.showDownloadSpinner = false;
                    }
                });
            }
        });
    }

    downloadRelease(release: Release) {
        this.showDownloadAlert = true;
        this.dataService
            .getRelease("cyber-schema", release.tag, release.id).subscribe(blob => {
            let a = document.createElement("a")
            let blobURL = URL.createObjectURL(blob)
            a.download = "schema-release-" + release.tag + ".zip"
            a.href = blobURL
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            this.showDownloadAlert = false;
        });
    }

    releaseSelected(event: Release) {
        this.showDownloadSpinner = true;
        this.selectedReleaseInfo = {} as ReleaseInfo;
        this.selectedRelease = event;
        this.dataService.getReleaseInfo("cyber-schema", event.id).subscribe((releaseInfo: any) => {
            if (releaseInfo !== undefined) {
                this.selectedReleaseInfo = releaseInfo;
                this.showDownloadSpinner = false;
            }
        });
    }
}
