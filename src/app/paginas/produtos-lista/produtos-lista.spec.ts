import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosLista } from './produtos-lista';

describe('ProdutosLista', () => {
  let component: ProdutosLista;
  let fixture: ComponentFixture<ProdutosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
