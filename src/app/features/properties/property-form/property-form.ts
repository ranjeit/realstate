// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { PropertyService } from '../../../core/services/property';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { Property } from '../../../core/models/property';
// @Component({
//   selector: 'app-property-form',
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './property-form.html',
//   styleUrl: './property-form.scss',
// })
// export class PropertyForm  implements OnInit{

//   private fb = inject(FormBuilder);
//   private propertyService = inject(PropertyService);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);

//   propertyId: number | null = null;
//   isEditMode =  false;
//   loading = false;
//   submitting = false;
//   errorMessage = '';

//   propertyForm = this.fb.group({
//     title: ['', [Validators.required, Validators.minLength(3)]],
//     description: ['', Validators.required],
//     price: [null as number | null, [Validators.required, Validators.min(1)]],
//     location: ['', Validators.required],
//     city: ['',Validators.required],
//     propertyType: ['', Validators.required],
//     bedrooms: [0, [Validators.required, Validators.min(0)]],
//     bathrooms: [0, [Validators.required, Validators.min(0)]],
//     areaSqft: [null as number | null, [Validators.required, Validators.min(1)]],
//     status: ['AVAILABLE', Validators.required]
//   });
//    ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');

//     if (id) {
//       this.propertyId = Number(id);
//       this.isEditMode = true;
//       this.loadProperty(this.propertyId);
//     }
//   }

//   loadProperty(id: number): void {
//     this.loading = true;

//     this.propertyService.getPropertyById(id).subscribe({
//       next: (property) => {
//         this.propertyForm.patchValue(property);
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Property loading error:', error);
//         this.errorMessage = 'Unable to load property details.';
//         this.loading = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.propertyForm.invalid) {
//       this.propertyForm.markAllAsTouched();
//       return;
//     }

//     this.submitting = true;
//     this.errorMessage = '';

//     const propertyData = this.propertyForm.getRawValue() as Partial<Property>;

//     if (this.isEditMode && this.propertyId !== null) {
//       this.propertyService.updateProperty(
//         this.propertyId,
//         propertyData
//       ).subscribe({
//         next: () => {
//           this.submitting = false;
//           this.router.navigate(['/properties', this.propertyId]);
//         },
//         error: (error) => {
//           console.error('Property update error:', error);
//           this.errorMessage = 'Unable to update property.';
//           this.submitting = false;
//         }
//       });
//     } else {
//       this.propertyService.createProperty(propertyData).subscribe({
//         next: () => {
//           this.submitting = false;
//           this.router.navigate(['/properties']);
//         },
//         error: (error) => {
//           console.error('Property creation error:', error);
//           this.errorMessage = 'Unable to create property.';
//           this.submitting = false;
//         }
//       });
//     }
//   }

// }

// new code or update code from here, if not work restore from here

import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { finalize } from 'rxjs';

import { PropertyService } from '../../../core/services/property';
import { Property } from '../../../core/models/property';

@Component({
  selector: 'app-property-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './property-form.html',
  styleUrl: './property-form.scss',
})
export class PropertyForm implements OnInit {

  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  propertyId: number | null = null;

  isEditMode = false;
  loading = false;
  submitting = false;
  errorMessage = '';

  propertyForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    listingType: ['SALE', Validators.required],
    // new sale or rent
    location: ['', Validators.required],
    city: ['', Validators.required],
    propertyType: ['', Validators.required],
    bedrooms: [0, [Validators.required, Validators.min(0)]],
    bathrooms: [0, [Validators.required, Validators.min(0)]],
    areaSqft: [null as number | null, [Validators.required, Validators.min(1)]],
    status: ['AVAILABLE', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const parsedId = Number(id);

      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        this.errorMessage = 'Invalid property ID.';
        return;
      }

      this.propertyId = parsedId;
      this.isEditMode = true;

      this.loadProperty(this.propertyId);
    }
  }

  loadProperty(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.propertyService.getPropertyById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();

          console.log('Property loading completed');
        })
      )
      .subscribe({
        next: (property) => {
          this.propertyForm.patchValue(property);

          console.log('Property loaded for editing:', property);
        },

        error: (error) => {
          console.error('Property loading error:', error);

          this.errorMessage = 'Unable to load property details.';
        }
      });
  }

  onSubmit(): void {

    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const propertyData =
      this.propertyForm.getRawValue() as Partial<Property>;

    if (this.isEditMode && this.propertyId !== null) {

      this.propertyService.updateProperty(
        this.propertyId,
        propertyData
      ).subscribe({

        next: () => {
          this.submitting = false;
          this.router.navigate(['/properties', this.propertyId]);
        },

        error: (error) => {
          console.error('Property update error:', error);

          this.errorMessage = 'Unable to update property.';
          this.submitting = false;
        }

      });

    } else {

      this.propertyService.createProperty(propertyData).subscribe({

        next: () => {
          this.submitting = false;
          this.router.navigate(['/properties']);
        },

        error: (error) => {
          console.error('Property creation error:', error);

          this.errorMessage = 'Unable to create property.';
          this.submitting = false;
        }

      });

    }

  }

}
