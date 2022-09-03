import {IProjectCard} from '../IProjectCard';
import {Card2} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ReleaseOfInertGases extends Card2 implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.RELEASE_OF_INERT_GASES,
      cost: 14,
      tr: {tr: 2},

      metadata: {
        cardNumber: '036',
        renderData: CardRenderer.builder((b) => {
          b.tr(2);
        }),
        description: 'Raise your terraforming rating 2 steps.',
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.increaseTerraformRatingSteps(2);
    return undefined;
  }
}
