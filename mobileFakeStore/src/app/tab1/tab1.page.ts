import { Component } from '@angular/core';
import { FakeStoreService } from '../services/fake-store.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private fakeStoreService: FakeStoreService) {}

  ngOnInit() {
    this.fakeStoreService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
