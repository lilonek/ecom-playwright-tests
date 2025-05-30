import { LoginUserModel } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/ui/index.php?route=account/login';
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  forgottenPasswordButton: Locator;
  warningInfo: Locator;
  contentSection: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('E-Mail Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgottenPasswordButton = page.getByText('Forgotten Password');
    this.warningInfo = page.getByText(' Warning:');
    this.contentSection = this.page.locator('#content');
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.emailInput.fill(loginUserData.userEmail);
    await this.passwordInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }

  async resetPassword(): Promise<void> {
    await this.forgottenPasswordButton.click();
  }
}
