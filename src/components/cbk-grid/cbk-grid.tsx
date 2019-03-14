import { Component, Prop } from '@stencil/core';
import { Config, Cell, ColumnConfig } from './entities';

@Component({
  tag: 'cbk-grid',
  styleUrl: 'cbk-grid.css',
  shadow: true
})
export class Grid {
  /**
   * The first name
   */
  @Prop() config: Config;

  /**
   * The middle name
   */
  @Prop() items: Cell[];

  private isValidInput(): boolean {
    return this.config && this.config.columns && this.config.columns.length > 0;
  }

  private renderValue(item: Cell, column: ColumnConfig): Element {
    const value = item[column.key];
    return column.type === 'image' ? <img src={value}></img> : value;
  }

  private renderRows(): JSX.Element[] {
    return this.items.map(item => 
      <tr>
        { this.config.columns.map(column => 
          <td> {this.renderValue(item, column)} </td>
        )}
      </tr>
    )
  }

  render() {
    if (!this.isValidInput()) {
      return ( <div>Not configured!</div> );
    } else {
      return ( <table> {this.renderRows()} </table> );
    }
  }
}
