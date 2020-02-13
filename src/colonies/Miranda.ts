import { Colony, IColony } from './Colony';
import { Player } from '../Player';
import { ColonyName } from './ColonyName';
import { Game } from '../Game';
import { ResourceType } from '../ResourceType';

export class Miranda extends Colony implements IColony {
    public name = ColonyName.MIRANDA;
    public isActive = false;
    public resourceType = ResourceType.ANIMAL;
    public trade(player: Player, game: Game): void {
        this.beforeTrade(this, player);
        let animals: number = 0;
        if (this.trackPosition < 3) {
            animals = 1;
        } else if (this.trackPosition < 5) {
            animals = 2;
        } else {
            animals = 3;
        }
        player.addResourceToSelector(ResourceType.ANIMAL, animals, game);
        this.afterTrade(this, player, game);
    }
    public onColonyPlaced(player: Player, game: Game): undefined {
        super.addColony(this, player);
        player.addResourceToSelector(ResourceType.ANIMAL, 1, game);
        return undefined;
    }
    public giveTradeBonus(player: Player, game: Game): void {
        player.cardsInHand.push(
            game.dealer.dealCard());
    }    
}