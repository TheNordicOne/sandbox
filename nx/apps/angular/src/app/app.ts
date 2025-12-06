import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from '@nx/components';

@Component({
  imports: [RouterModule, Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'angular';

  onPress() {
    console.log('A button was pressed.');
  }
}
