import { Component, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { Config, ColumnConfig } from './entities';

@Component({
  tag: 'cbk-grid',
  styleUrl: 'cbk-grid.css',
  shadow: true
})
export class Grid {
  
  /**
   * 1. Own Properties
   */
  selectedItems: any[] = [];

  /**
   * 4. Public Property API
   */

  /**
   * Config data
   */
  @Prop() config: Config;

  /**
   * Grid items
   */
  @Prop() items: any[];


  /**
   * 5. Events section
   */
  @Event() selectionChanged: EventEmitter;


  /**
   * 8. Public methods API
   */
  @Method()
  selectAllItems() {
    this.selectedItems = [this.items];
    this.selectionChanged.emit(this.selectedItems);
  }

  @Method()
  clearSelection() {
    this.selectedItems = [];
    this.selectionChanged.emit(this.selectedItems);
  }

  /**
   * 9. Local methods 
   */
  private get hasHeaderRow(): boolean {
    return this.config && this.config.header && this.config.header.length > 0;
  }

  private get isValidInput(): boolean {
    return this.config && this.config.columns && this.config.columns.length > 0;
  }

  private toggleSelection(event, item: any) {
    event.target.checked ? this.addSelection(item) : this.removeSelection(item);
  } 

  private isSelected(item: any): boolean {
    return this.selectedItems.some(selectedItem => selectedItem.id === item.id);
  }

  private addSelection(item: any) {
    if (!this.isSelected(item)) {
      this.selectedItems =  [...this.selectedItems, item];
      this.selectionChanged.emit(this.selectedItems);
    }
  }

  private removeSelection(item: any) {
    const index = this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id);
    if (index > -1) {
      this.selectedItems.splice(index, 1)
      this.selectedItems =  [...this.selectedItems];
      this.selectionChanged.emit(this.selectedItems);
    }
  }


  /**
   * 11. render() function
   */
  private renderValue(item: any, column: ColumnConfig): Element {
    const value = item[column.key];
    return column.type === 'image' ? <img src={value}></img> : value;
  }

  private renderHeader(): JSX.Element {
    return (
      <tr>
        { this.config.multiSelect ? <td> </td> : null }
        { this.config.header.map(column => 
          <td> {column.text} </td>
        )}
      </tr>
    );
  }

  private renderRows(): JSX.Element[] {
    return this.items.map(item => 
      <tr key={item.id}>
        { this.config.multiSelect ? <td><input type="checkbox" checked={this.isSelected(item)} onInput={(event) => this.toggleSelection(event, item)}></input> </td> : null }
        { this.config.columns.map(column => 
          <td> {this.renderValue(item, column)} </td>
        )}
      </tr>
    )
  }

  render() {
    if (!this.isValidInput) {
      return ( <div>Not configured!</div> );
    } else {
      return ([
      <div> { this.selectedItems.length > 0 ? this.selectedItems.length + ' items selected' : null } </div>,
      <table>
        { this.hasHeaderRow ? this.renderHeader() : null }
        { this.renderRows() } 
      </table> 
      ]);
    }
  }
}
