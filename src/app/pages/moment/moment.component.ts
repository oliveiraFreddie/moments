import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
    ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id')); // pegando o id da rota.

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe() // chama o método removeMoment no service
    this.messagesService.add("Momento excluído com sucesso!") // exibe a mensagem de exclusão
    this.router.navigate(["/"]); // navega de volta pra home
  }

}
