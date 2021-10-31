import {Component, OnInit} from '@angular/core';
import {MontureService} from "../controller/service/monture.service";
import {LunetteService} from "../controller/service/lunette.service";
import {VerresService} from "../controller/service/verres.service";
import {FournisseurService} from "../controller/service/fournisseur.service";
import {Fournisseur} from "../controller/model/fournisseur";
import {Verres} from "../controller/model/verres";
import {LunetteSoleil} from "../controller/model/lunette-soleil";
import {Monture} from "../controller/model/monture";
import {PaiementService} from "../controller/service/paiement.service";
import {Paiement} from "../controller/model/paiement";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  fournisseur = 0;
  totaleAPaye: number = Number();

  constructor(private fournisseurService: FournisseurService,
              private montureService: MontureService,
              private lunetteService: LunetteService,
              private paiementService: PaiementService,
              private modalService: NgbModal,
              private verreService: VerresService) {
  }

  ngOnInit(): void {
    this.fournisseurService.findAll();
  }

  get fournisseurs(): Array<Fournisseur> {
    return this.fournisseurService.fournisseurs;
  }

  get verre(): Verres {
    return this.verreService.verre;
  }

  get lunette(): LunetteSoleil {
    return this.lunetteService.lunette;
  }

  get paiement(): Paiement {
    return this.paiementService.paiement;

  }


  get monture(): Monture {
    return this.montureService.monture;
  }


  public save_monture() {
    // @ts-ignore
    this.monture.priceTotale = this.monture.stock * this.monture.price;
    this.monture.sellingDate = null;
    this.monture.fournisseur.id = this.fournisseur;
    console.log(this.monture);
    this.totaleAPaye = this.totaleAPaye + this.monture.priceTotale;
    return this.montureService.save();
  }

  public save_lunnete() {
    // @ts-ignore
    this.lunette.totalPrice = this.lunette.qte * this.lunette.price;
    this.lunette.fournisseur.id = this.fournisseur;
    console.log(this.lunette);
    this.totaleAPaye = this.totaleAPaye + this.lunette.totalPrice;
    return this.lunetteService.save();
  }


  public save_verre() {
    alert(this.verre.price);
    this.verre.fournisseur.id = this.fournisseur;
    console.log(this.verre);
    this.totaleAPaye = Number(this.verre.price) + Number(this.totaleAPaye);
    return this.verreService.save();
  }

  public save_paiement() {
    this.paiement.restAPay = this.paiement.montantTotale - this.paiement.totalPay;
    this.paiementService.save();
    this.totaleAPaye = 0;
  }

  selectChangeHandler(event: any) {
    this.fournisseur = event.target.value;
  }

  open(content: any) {
    this.paiement.montantTotale = this.totaleAPaye;
    this.paiement.fournisseur.id = this.fournisseur;
    this.modalService.open(content);
  }
}



