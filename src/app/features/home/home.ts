import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PropertyService } from '../../core/services/property';
import { Property } from '../../core/models/property';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
   private propertyService = inject(PropertyService);
  private cdr = inject(ChangeDetectorRef);

  properties: Property[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    console.log('Home component initialized');
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.errorMessage = '';

    this.propertyService.getAllProperties()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.properties = data;
          this.cdr.detectChanges();
          console.log('Properties displayed:', this.properties);
        },
        error: (error) => {
          console.error('PROPERTY API ERROR:', error);
          this.errorMessage = 'Unable to load properties. Please try again.';
          this.cdr.detectChanges();
        }
      });
  }
}
