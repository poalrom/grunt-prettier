import * as React from 'react';
import { TodoItem } from './todoItem';
interface ITodo {
  description: string;
  key: number;
}
export interface IMainState {
  newItem?: { description: string };
  todoList?: ITodo[];
}
export interface IMainProps {}
export class Main extends React.Component<IMainProps, IMainState> {
  state: IMainState = { newItem: { description: '' }, todoList: [] };
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  render() {
    return (
      <div>
        {' '}
        <div>
          {' '}
          <input
            type="text"
            placeholder="input new item"
            value={this.state.newItem.description}
            onChange={this.changeName}
          />{' '}
          <button onClick={this.addItem}>add</button>{' '}
        </div>{' '}
        <ul>{todoItems}</ul>{' '}
      </div>
    );
  }
}
