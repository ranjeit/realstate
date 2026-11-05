import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property';
import { Property } from '../../../core/models/property';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.scss',
})
export class PropertyList implements OnInit{

  private propertyService = inject(PropertyService);
  private cdr = inject(ChangeDetectorRef);


  properties: Property[] = [];
  filteredProperties: Property[] = [];

  loading = false;
  errorMessage = '';

  // Filter fields
  selectedListingType = 'ALL';
  selectedCity = '';
  selectedPropertyType = 'ALL';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedBedrooms: number | null = null;

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.errorMessage = '';

    this.propertyService.getAllProperties()
      .pipe(
        finalize(() => {
          this.loading = false;
          //here is changed
          this.cdr.detectChanges();
          console.log("property loading completed");
        })
      )
      .subscribe({
        next: (data) => {
          this.properties = data;
          this.applyFilters();

          console.log('Properties loaded:', data);
        },
        error: (error) => {
          console.error('Property loading error:', error);
          this.errorMessage = 'Unable to load properties. Please try again.';
        }
      });
  }

  applyFilters(): void {
    this.filteredProperties = this.properties.filter(property => {
      const matchesListingType = 
            this.selectedListingType === 'ALL' ||
            property.listingType === this.selectedListingType;

            const matchesCity =
            !this.selectedCity.trim() ||
           (property.city || '').toLowerCase().includes(this.selectedCity.trim().toLowerCase());

            const  matchesPropertyType = 
                 this.selectedPropertyType === 'ALL' ||
                 property.propertyType === this.selectedPropertyType;

                 const matchesMinPrice = 
                 this.minPrice== null ||
                 property.price >= this.minPrice;

                 const matchesMaxPrice =
                 this.maxPrice === null ||
                 property.price <= this.maxPrice;

                 const matchesBedrooms = 
                 this.selectedBedrooms === null ||
                 property.bedrooms >= this.selectedBedrooms;
                 return matchesListingType &&
                 matchesCity && 
                 matchesPropertyType &&
                 matchesMinPrice &&
                 matchesMaxPrice &&
                 matchesBedrooms;
    });
  }

  resetFilters(): void {
    this.selectedListingType = 'ALL';
    this.selectedCity = '';
    this.selectedPropertyType = 'ALL';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedBedrooms = null;

    this.applyFilters();
  }
}
