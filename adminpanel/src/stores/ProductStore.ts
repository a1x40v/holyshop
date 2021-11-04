import { makeAutoObservable, runInAction } from 'mobx';
import { agent } from '../api/agent';
import { Product } from '../models/Product';

export class ProductStore {
  productRegistry: Map<string, Product> = new Map();
  loadingInitial: boolean = false;
  loading: boolean = false;
  amount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get products() {
    return Array.from(this.productRegistry.values());
  }

  private setProduct = (product: Product) => {
    this.productRegistry.set(product.id, product);
  };

  loadProducts = async (page: number, pageSize: number) => {
    this.loadingInitial = true;
    this.productRegistry.clear();
    try {
      const pagination = await agent.products.list(page, pageSize);
      runInAction(() => {
        this.amount = pagination.amount;
        pagination.data.forEach((product) => this.setProduct(product));
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  loadProduct = async (id: string) => {
    if (this.productRegistry.has(id)) return this.productRegistry.get(id)!;
    this.setLoadingInitial(true);
    console.log('load product ', this.loadingInitial);
    const product = await agent.products.details(id);
    this.setLoadingInitial(false);
    return product;
  };

  createProduct = async (product: Product) => {
    try {
      await agent.products.create(product);
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (product: Product) => {
    try {
      await agent.products.update(product);
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id: string) => {
    try {
      this.setLoading(true);
      await agent.products.delete(id);
      runInAction(() => {
        this.productRegistry.delete(id);
        this.amount = this.amount - 1;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  setLoadingInitial = (value: boolean) => {
    this.loadingInitial = value;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };
}
