import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasProdutos } from './categorias-produtos';

describe('CategoriasProdutos', () => {
  let component: CategoriasProdutos;
  let fixture: ComponentFixture<CategoriasProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
