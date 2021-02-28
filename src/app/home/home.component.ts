import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from 'src/utils/login/login.service';
import { AppState, BloggingObj } from '../store/Blogging.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  count = 1;
  rowToDel = -1;
  blogArray = {
    id: '',
    createdDate: '',
    type: '',
    heading: '',
    para: '',
    author: ''
  };
  isAddNewBlog = true;
  newBlogObje: Observable<BloggingObj[]>;
  constructor(private loginService: LoginService, private store: Store<AppState>,
              private activeModal: NgbModal, private spinner: NgxSpinnerService, private alertService: ToastrService) {
    this.newBlogObje = this.store.select(state => state.product);
  }
  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logOutUser();
  }

  addBlogConfirm(modal) {
    this.clearForm();
    this.isAddNewBlog = true;
    this.activeModal.open(modal, { size: 'xl' });
  }

  addBlog(): void {
    this.spinner.show(undefined, { type: 'ball-fussion', color: 'rgba(100,149,237,.8)' });
    this.store.dispatch({
      type: 'ADD_BLOGS',
      payload: {
        id: this.count,
        createdDate: this.formatDate(new Date()),
        type: this.blogArray.type,
        heading: this.blogArray.heading,
        para: this.blogArray.para,
        author: this.blogArray.author,
      } as BloggingObj
    });
    this.count++;
    this.clearForm();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.alertService.success('Added successfully');
  }

  deleteRow(id): void {
    this.spinner.show(undefined, { type: 'ball-fussion', color: 'rgba(100,149,237,.8)' });
    this.store.dispatch({
      type: 'DELETE_BLOGS',
      payload: { id }
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.alertService.success('Deleted successfully');
  }

  confirmDelete(id, modal): void {
    this.rowToDel = id;
    this.activeModal.open(modal);
  }

  clearForm(): void {
    this.blogArray = {
      id: '',
      createdDate: '',
      type: '',
      heading: '',
      para: '',
      author: ''
    };
  }

  editModal(obj, modal) {
    this.isAddNewBlog = false;
    this.blogArray = JSON.parse(JSON.stringify(Object.assign(obj)));
    this.activeModal.open(modal, { size: 'xl' });
  }

  editSelectedRow() {
    this.spinner.show(undefined, { type: 'ball-fussion', color: 'rgba(100,149,237,.8)' });
    this.store.dispatch({
      type: 'EDIT_BLOGS',
      payload: {
        id: this.count - 1,
        createdDate: this.formatDate(new Date()),
        type: this.blogArray.type,
        heading: this.blogArray.heading,
        para: this.blogArray.para,
        author: this.blogArray.author,
      } as BloggingObj
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.alertService.success('Updated successfully');
  }

  goForUpdateOrSave() {
    if (this.isAddNewBlog) {
      this.addBlog();
    } else {
      this.editSelectedRow();
    }
  }

  validation(): void {
    let isError = false;

    // blog type
    if (!this.blogArray.type && this.blogArray.type.trim()) {
      isError = true;
      this.alertService.error('Blog Type is required.');
    }
    if (this.blogArray.type.trim().length < 4) {
      isError = true;
      this.alertService.error('Blog Type must be at least 4 characters long.');
    }

    // blog head
    if (!this.blogArray.heading && this.blogArray.heading.trim()) {
      isError = true;
      this.alertService.error('Blog Heading is required.');
    }
    if (this.blogArray.heading.trim().length < 4 && this.blogArray.heading.trim().length >= 10) {
      isError = true;
      this.alertService.error('Blog Heading must be at least 4 characters long or less than 10 characters');
    }

    // blog author
    if (!this.blogArray.author && this.blogArray.author.trim()) {
      isError = true;
      this.alertService.error('Blog Author is required.');
    }
    if (this.blogArray.author.trim().length < 4 && this.blogArray.author.trim().length >= 10) {
      isError = true;
      this.alertService.error('Blog Author must be at least 4 characters long or less than 10 characters');
    }

    // blog information
    if (!this.blogArray.para && this.blogArray.para.trim()) {
      isError = true;
      this.alertService.error('Blog Information is required.');
    }
    if (this.blogArray.para.trim().length <= 50) {
      isError = true;
      this.alertService.error('Blog Information must be at least of 50 characters long');
    }

    if (!isError) {
      this.goForUpdateOrSave();
    }
  }
  formatDate(date) {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    return formattedDate;
  }
}
