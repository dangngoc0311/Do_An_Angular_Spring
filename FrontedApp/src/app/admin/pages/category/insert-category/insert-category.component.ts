import { CategoryService } from './../../../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css'],
})
export class InsertCategoryComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    status: ['true', [Validators.required]],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {}
  insertCategory() {
    this.submitted = true;
    if (this.infoForm.valid) {
    this.categoryService.insertCategory(this.infoForm.value).subscribe(
      (data) => {
        this.toastr.success(this.translate.instant(`successInsert`));
        this.router.navigate(['admin/listCategory']);
      },
      (err) => this.toastr.error(this.translate.instant(`errInsert`))
    );}
  }

}
