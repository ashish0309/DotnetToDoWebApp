import { Component } from '@angular/core';
import { ErrorService } from './error-service';

@Component({
    selector: 'app-error-banner',
    template: `
    <div *ngIf="errorService.errorMessage$ | async as errorMessage" class="container">
        <div class="flex-container">
            <div class="alert alert-danger" role="alert">
                {{ errorMessage }}
                <button (click)="errorService.clearError()">Close</button>
            </div>
        </div>
    </div>
  `
})
export class ErrorBannerComponent {
    constructor(public errorService: ErrorService) { }
}