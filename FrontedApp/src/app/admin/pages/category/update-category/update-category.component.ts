import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  id = ''; submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm= this.fb.group({
    name: [''],
    status: [''],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.findCategoryById(this.id).subscribe((res) => {
    this.infoForm = this.fb.group({
      name: [`${res.name}`],
      status: [`${res.status}`],
    });
    });
  }
  updateCategory() {
    this.submitted = true;
    if (this.infoForm.valid) {
    this.categoryService.updateCategory(this.id,this.infoForm.value).subscribe(data => {
      this.toastr.success(this.translate.instant(`successUpdate`));
      this.router.navigate(['admin/listCategory']);
    },
    (err) => this.toastr.error(this.translate.instant(`errUpdate`)))
  }}
}
