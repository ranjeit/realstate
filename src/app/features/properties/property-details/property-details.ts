import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property';
import { Property } from '../../../core/models/property';
import id from '@angular/common/locales/id';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-property-details',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './property-details.html',
  styleUrl: './property-details.scss',
})
export class PropertyDetails implements OnInit {

  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  property: Property | null = null;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
  if (!id || isNaN(id)) {
    this.errorMessage = 'Invalid property ID.';
    return;
    
  }
  this.loadProperty(id);

}
loadProperty(id: number): void {
  this.loading = true;
  this.errorMessage = '';

  this.propertyService.getPropertyById(id)
     .pipe(
      finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
     })
    )
    .subscribe({
      next: (data) => {
        console.log('PROPERTY DETAILS API RESPONSE:', data);
        console.log('LISTING TYPE:', data.listingType);
        
        this.property = data;
      },
      error: (error) => {
        console.error('Property details error: ',error);
        this.errorMessage = 'Unable to load property details';
      }
    });
}
}
