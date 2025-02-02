import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverComponent } from './game-over.component';
import { GameService } from '../services/game.service';


describe('AppComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    fixture = TestBed.createComponent(GameOverComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    gameService = TestBed.inject(GameService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the winning message', async () => {
    await setWinningStatePlayer();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const gameOverContainer = compiled.querySelector('#game-over');
    const gameOverMessage = gameOverContainer?.querySelector('p:first-of-type');
    expect(gameOverMessage?.textContent).toContain('Player 1 won!');
  });

  async function setWinningStatePlayer() {
    const moves = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2]
    ];

    for (const move of moves) {
      gameService.state.selectSquare({ rowIndex: move[0], colIndex: move[1] });
    }
  }
});


