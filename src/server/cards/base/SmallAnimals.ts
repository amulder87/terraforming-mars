import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card2} from '../Card';
import {VictoryPoints} from '../ICard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Resources} from '../../../common/Resources';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class SmallAnimals extends Card2 implements IActionCard, IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.SMALL_ANIMALS,
      tags: [Tag.ANIMAL],
      cost: 6,

      resourceType: CardResource.ANIMAL,
      victoryPoints: VictoryPoints.resource(1, 2),
      requirements: CardRequirements.builder((b) => b.oxygen(6)),

      metadata: {
        cardNumber: '054',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 Animal to this card.', (eb) => {
            eb.empty().startAction.animals(1);
          }).br;
          b.production((pb) => pb.minus().plants(1, {all})).br;
          b.vpText('1 VP per 2 Animals on this card.');
        }),
        description: {
          text: 'Requires 6% oxygen. Decrease any Plant production 1 step.',
          align: 'left',
        },
      },
    });
  }
  public override resourceCount = 0;
  public override canPlay(player: Player): boolean {
    return player.canReduceAnyProduction(Resources.PLANTS, 1);
  }
  public override bespokePlay(player: Player) {
    player.game.defer(
      new DecreaseAnyProduction(player, Resources.PLANTS, {count: 1}));
    return undefined;
  }
  public canAct(): boolean {
    return true;
  }
  public action(player: Player) {
    player.addResourceTo(this);
    return undefined;
  }
}
