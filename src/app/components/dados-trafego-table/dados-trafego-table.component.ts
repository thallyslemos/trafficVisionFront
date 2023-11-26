import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
import { ToastService } from '../../services/toast.service';
import { DadosTrafego, Rua } from '../../models/rua.model';
import { LoadingComponent } from '../loading/loading.component';
import { RuaFormComponent } from '../rua-form/rua-form.component';
import { DadosTrafegoService } from '../../services/dados-trafego.service';
import { DadosTrafegoFormComponent } from '../dados-trafego-form/dados-trafego-form.component';

@Component({
  selector: 'app-dados-trafego-table',
  standalone: true,
  imports: [CommonModule, LoadingComponent, DadosTrafegoFormComponent],
  templateUrl: './dados-trafego-table.component.html',
})
export class DadosTrafegoTableComponent {
  columns: any[] = [];
  rows: DadosTrafego[] = [];
  isLoading: boolean = false;
  @Input({ required: true }) id: number | null = null;

  constructor(
    private formService: FormDataService,
    private dadosTrafegoService: DadosTrafegoService,
    private toastService: ToastService
  ) {}

  openForm(dados?: {
    id: number | null;
    semana: number | null;
    fluxo: number | null;
    velocidadeMedia: number | null;
    incidentes: number | null;
  }) {
    this.formService.open(dados);
  }

  handleFormSubmit(event: { rua: Rua; isCreation: boolean }) {
    this.isLoading = true;

    const ruaOperation = event.isCreation
      ? this.dadosTrafegoService.create(event.rua)
      : this.dadosTrafegoService.update(event.rua);
    const successMessage = event.isCreation
      ? 'Rua criada com sucesso!'
      : 'Rua atualizada com sucesso!';

    ruaOperation.subscribe((data) => {
      if (data) {
        this.toastService.open({
          message: successMessage,
          type: 'success',
        });
      }
      this.isLoading = false;
      this.formService.close();
      this.loadDados();
    });
  }

  deleteRua(id: number) {
    this.isLoading = true;

    const ruaOperation = this.dadosTrafegoService.delete(id);
    const successMessage = 'Rua deletada com sucesso!';

    ruaOperation.subscribe((data) => {
      this.toastService.open({
        message: successMessage,
        type: 'success',
      });
      this.isLoading = false;
      this.formService.close();
      this.loadDados();
    });
  }

  ngOnInit() {
    this.loadDados();
    this.columns = ['Semana', 'Tráfego', 'Velocidade', 'Incidentes'];
  }

  loadDados() {
    this.isLoading = true;
    this.dadosTrafegoService
      .getByRuaId(this.id as number)

      .subscribe((data) => {
        this.isLoading = false;
        console.log(data);
        this.rows = data;
      });
  }
}
