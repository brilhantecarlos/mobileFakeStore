import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '../services/fake-store.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  product: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute,
    private fakeStoreService: FakeStoreService,
    private cartService: CartService
  ) {}

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');

        if (!id) {
          id = localStorage.getItem('lastProductId');
        }

        if (id) {
          this.getProduct(+id);
        } else {
          this.loading = false;
          this.error = 'Nenhum produto selecionado';
        }
      });
  }

  getProduct(id: number) {
    this.fakeStoreService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        localStorage.setItem('lastProductId', id.toString());
      },
      error: () => {
        this.error = 'Erro ao carregar o produto';
        this.loading = false;
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product, 1);
    
    alert(`${product.title} adicionado ao carrinho!`);
  }
}
