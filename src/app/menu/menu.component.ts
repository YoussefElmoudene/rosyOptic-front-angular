import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  ngOnInit(): void {
    $(document).ready(function(){
      var $targetElement = $(".nav-link");
      $targetElement.click(function() {
        $targetElement.removeClass("changeColor");
        $(this).addClass("changeColor");
      });
    });
  }
  public modalRef: BsModalRef | undefined; // {1}
  constructor(private modalService: BsModalService) {} // {2}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }
}
