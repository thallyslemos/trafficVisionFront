import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DadosTrafego } from '../../models/rua.model';
import { DadosTrafegoService } from '../../services/dados-trafego.service';
import { FormDataService } from '../../services/form-data.service';
import { ToastService } from '../../services/toast.service';
import { DadosTrafegoFormComponent } from '../dados-trafego-form/dados-trafego-form.component';
import { LoadingComponent } from '../loading/loading.component';

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
  @Input({ required: true }) ruaId: number | null = null;

  constructor(
    private formService: FormDataService,
    private dadosTrafegoService: DadosTrafegoService,
    private toastService: ToastService
  ) {}

  openForm(dados?: DadosTrafego) {
    this.formService.open(dados);
  }

  handleFormSubmit(event: { dados: DadosTrafego; isCreation: boolean }) {
    console.log(event.dados);
    this.isLoading = true;

    const { semana, fluxo, velocidadeMedia, incidentes } = event.dados;
    const dadosTrafegoOperation = event.isCreation
      ? this.dadosTrafegoService.create({
          semana,
          fluxo,
          velocidadeMedia,
          incidentes,
          rua: { id: this.ruaId as number, nome: '' },
        })
      : this.dadosTrafegoService.update(event.dados);
    const successMessage = event.isCreation
      ? 'Dados cadastrados com sucesso!'
      : 'Dados atualizados com sucesso!';

    dadosTrafegoOperation.subscribe((data) => {
      console.log(data);
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

  deleteDadosTrafego(id: number) {
    this.isLoading = true;

    const dadosTrafegoOperation = this.dadosTrafegoService.delete(id);
    const successMessage = 'Deletado com sucesso!';

    dadosTrafegoOperation.subscribe((data) => {
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
    console.log(this.ruaId);
    this.loadDados();
    this.columns = ['Semana', 'Tráfego', 'Velocidade', 'Incidentes'];
  }

  loadDados() {
    this.isLoading = true;
    this.dadosTrafegoService
      .getByRuaId(this.ruaId as number)

      .subscribe((data) => {
        this.isLoading = false;
        this.rows = data;
      });
  }
}
