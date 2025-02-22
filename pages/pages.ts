import { Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SignUpPage } from '../pages/signup-page';

export class Pages {
  homePage: HomePage;
  signUp: SignUpPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.signUp = new SignUpPage(page);
  }
}