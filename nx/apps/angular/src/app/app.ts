import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '@nx/components';
import { CITIES } from '@nx/data';
import { USERS as NordicUsers } from '@nx/data/nordic';
import { USERS as OneUsers } from '@nx/data/one';

@Component({
  imports: [RouterModule, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'angular';

  nordicUsers = NordicUsers;
  oneUsers = OneUsers;
  cities = CITIES;

  onPress() {
    console.log('A button was pressed.');
  }
}
