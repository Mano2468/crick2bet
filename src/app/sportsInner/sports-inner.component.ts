import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalContentComponent } from '../modal/modal-popup';

@Component({
  selector: 'app-sports',
  templateUrl: './sports-inner.component.html',
  styleUrls: ['./sports-inner.component.css']
})
export class SportsInnerComponent implements OnInit {
  modalRef: BsModalRef | null;
  constructor(private modalService: BsModalService) { }
 
  ngOnInit(): void {
  }
  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...',
        'PROFIT!!!'
      ],
      title: 'Modal with component',
      closeBtnName: 'Close',
    };
    this.modalRef = this.modalService.show(ModalContentComponent, {initialState,backdrop: "static",
    keyboard: false,class:'modal-dialog-centered',},);
    // this.modalRef.setClass('modal-sm');
  }
}
