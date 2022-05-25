import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-insert-book',
  templateUrl: './insert-book.component.html',
  styleUrls: ['./insert-book.component.css'],
})
export class InsertBookComponent implements OnInit {
  public listCate?: Category[];
  imgURL: any;
  bookImg: any;
  public category?: Category;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private categoryService: CategoryService, private toastr: ToastrService,
    private translate: TranslateService
  ) {
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ]
  };
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    author: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    price: ['', [Validators.required,Validators.min(1000)]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    quantity: ['', [Validators.required,Validators.min(1)]],
    hot: ['false', [Validators.required]],
    status: ['true', [Validators.required]],
    objCategory: ['', [Validators.required]],
    saleprice: ['',[Validators.min(1)]],
    typesale: ['']
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {
    this.getDataCategory();
  }
  getDataCategory(): void {
    this.categoryService.getCategoryByStatus().subscribe(
      (response: Category[]) => {
        this.listCate = response;
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  insertBook() {
    this.submitted = true;
    if (this.infoForm.valid) {
    const formData = new FormData();
    formData.append('file', this.bookImg);
    formData.append('book', JSON.stringify(this.infoForm.value));
    this.bookService.insertBook(formData).subscribe(
      (data) => {
        this.toastr.success(this.translate.instant(`successInsert`));
        this.router.navigate(['admin/listBook']);
      },  (err) =>   this.toastr.error(this.translate.instant(`errInsert`))
    );
  }}
  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookImg = file;
      var mineType = event.target.files[0].type;
      if (mineType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      this.imgURL = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
}
