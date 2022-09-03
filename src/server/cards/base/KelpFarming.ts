import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card2} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class KelpFarming extends Card2 implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.KELP_FARMING,
      tags: [Tag.PLANT],
      cost: 17,
      victoryPoints: 1,
      productionBox: {megacredits: 2, plants: 3},

      requirements: CardRequirements.builder((b) => b.oceans(6)),
      metadata: {
        cardNumber: '055',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(2).br;
            pb.plants(3);
          }).nbsp.plants(2);
        }),
        description: 'Requires 6 ocean tiles. Increase your M€ production 2 steps and your Plant production 3 steps. Gain 2 Plants.',
      },
    });
  }
  public override bespokePlay(player: Player) {
    player.plants += 2;
    return undefined;
  }
}
