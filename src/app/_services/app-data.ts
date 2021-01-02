import { Injectable } from '@angular/core';

@Injectable()
export class AppData {
  BASE_URL: string;
  API_KEY: string;
  constructor() {
    this.BASE_URL = '';
  }
}
