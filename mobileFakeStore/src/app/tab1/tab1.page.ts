import { Component } from '@angular/core';
import { FakeStoreService } from '../services/fake-store.service';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../components/cart-modal/cart-modal.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  products: any[] = [];
  loading: boolean = true;
  allProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todas';
  error: string | null = null;

  constructor(private fakeStoreService: FakeStoreService,
    private modalCtrl: ModalController
  ) {}

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalComponent
    });
    await modal.present();
  }

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

  getCategories() {
    this.fakeStoreService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categories.unshift('Todas');
      }
    });
  }

  getProductsByCategory(category?: string) {
    this.loading = true;

    if (category && category !== 'Todas') {
      this.fakeStoreService.getProductsByCategory(category).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar produtos da categoria';
          console.error('Erro ao carregar produtos da categoria');
          this.loading = false;
        }
      });
    }
    else {
      this.fakeStoreService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar produtos';
          console.error('Erro ao carregar produtos');
          this.loading = false;
        }
      });
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.getProductsByCategory(category);
  }
}
