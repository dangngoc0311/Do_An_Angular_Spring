import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  public listCate?: Category[];
  host: string = 'http://localhost:8081/admin/book';
  id = '';
  imgURL: any;
  bookImg: any;
  categoryId: any;
  img: any;
  book: Book = new Book(); submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    author: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1000)]],
    description: ['', [Validators.required]],
    image: [''],
    quantity: ['', [Validators.required, Validators.min(1)]],
    hot: ['', [Validators.required]],
    objCategory: [''],
    saleprice: ['', [Validators.min(1)]],
    typesale: [''],
  });
  get f() {
    return this.infoForm.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookService.findBookById(this.id).subscribe((res) => {
      this.book = res;
      this.img = res.image;
      this.categoryId = res.objCategory.id;
      this.infoForm = this.fb.group({
        name: [`${res.name}`],
        author: [`${res.author}`],
        publisher: [`${res.publisher}`],
        price: [`${res.price}`],
        saleprice: [`${res.saleprice}`],
        typesale: [`${res.typesale}`],
        description: [`${res.description}`],
        image: [''],
        quantity: [`${res.quantity}`],
        objCategory: [this.categoryId],
        hot: [`${res.hot}`],
        status: ['true'],
      });
    });

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
  updateBook() {  this.submitted = true;
    if (this.infoForm.valid) {
    this.categoryService
      .findCategoryById(this.infoForm.controls['objCategory'].value)
      .subscribe((data) => {
        this.infoForm.controls['objCategory'].setValue(data);
        const formData = new FormData();
        if (this.bookImg != null) {
          formData.append('file', this.bookImg);
          formData.append('book', JSON.stringify(this.infoForm.value));
          this.bookService.updateBook(this.id, formData).subscribe(
            (data) => {
              this.toastr.success(this.translate.instant(`successUpdate`));
              this.router.navigate(['admin/listBook']);
            },
            (err) => this.toastr.error(this.translate.instant(`errUpdate`))
          );
        } else {
          formData.append('book', JSON.stringify(this.infoForm.value));
          this.bookService.updateBookNoImage(this.id, formData).subscribe(
            (data) => {
              this.toastr.success(this.translate.instant(`successUpdate`));
              this.router.navigate(['admin/listBook']);
            },
            (err) => this.toastr.error(this.translate.instant(`errUpdate`))
          );
        }
      });
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
