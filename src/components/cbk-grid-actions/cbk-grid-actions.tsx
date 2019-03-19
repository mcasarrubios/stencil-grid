import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Config, GridActionButton } from './entities';

@Component({
  tag: 'cbk-grid-actions',
  styleUrl: 'cbk-grid-actions.css',
  shadow: true
})
export class GridActions {
  
  /**
   * 4. Public Property API
   */

  /**
   * Config data
   */
  @Prop() config: Config;

  /**
   * 5. Events section
   */
  @Event() actionClicked: EventEmitter;

  /**
   * 9. Local methods 
   */

  private get hasActions(): boolean {
    return this.config && this.config.gridActions && this.config.gridActions.length > 0;
  }

  private onActionClicked(action: GridActionButton) {
    this.actionClicked.emit(action);
  }

  /**
   * 11. render() function
   */
  
  private renderActions(): JSX.Element[] {
    return this.config.gridActions.map(action => 
      <button key={action.key} onClick={ () => this.onActionClicked(action)}>
        { action.icon ? <i class='action.icon'></i> : null }
        { action.text ? <span> {action.text} </span> : null }
      </button>
    )
  }

  render() {
    return this.hasActions ? this.renderActions() : null;
  }
}
