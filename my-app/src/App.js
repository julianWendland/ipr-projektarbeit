import React, { Component } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dexie } from "dexie";

//
// Manipulate and Query Database
//

const itemCount = 5;
// Generate "Items"
const getItems = (count, offset = 1) =>
  Array.from({ length: count - itemCount }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: <Text />
  }));

const itemTextarea = (count, offset = 1) =>
  Array.from({ length: count - itemCount }, (v, k) => k).map(k => ({
    id: `itemTextarea-${k + offset}`,
    content: <Text />
  }));

const db = new Dexie("MyDb1");

db.version(1).stores({
  input: "key,txtInput"
});
db.input.clear();
db.input.add({ key: "component1", txtInput: "" });

const msg = getItems.state;
console.log(msg);
//?????????????????
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Moves an item from one side to the opposite one

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // How an Item Looks like
  userSelect: "none",
  padding: grid * 3,
  margin: `0 0 ${grid}px 0`,

  // change background color if an item got dragged
  background: isDragging ? "lightblue" : "grey",

  // ????? styles we need to apply on draggables ????
  ...draggableStyle
});
// How the List looks like
const getListStyle1 = isDraggingOver => ({
  background: isDraggingOver ? "lightgreen" : "lightgrey",
  padding: grid,
  width: 600
});

const getListStyle2 = isDraggingOver => ({
  background: isDraggingOver ? "lightgreen" : "lightgrey",
  padding: grid,
  width: 800
});
class Text extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }
  handle(event) {
    let txtInput = this.state.data;

    console.log(event.key);
    this.setState({ data: event.target.value });
    if (event.key === "Enter") {
      db.input
        .update("component1", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <label>{this.state.data}</label>
        <div class="form-group">
          <textarea
            type="text"
            name="inputtextarea"
            placeholder="Input"
            class="form-control"
            id="inputtextarea"
            rows="3"
            onKeyUp={this.handle.bind(this)}
          />
          <input class="btn btn-primary" type="submit" />
        </div>
      </form>
    );
  }
}

class App extends Component {
  state = {
    items: getItems(10),
    selected: getItems(5, 10)
  };

  /**
   * ??????????????
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // brings an item back to Source if its dropped somewhere wrong
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  // Render the Whole App
  //Verschiedene veränderliche objekte die gerendert werden
  // und nicht immer eine Kopie von dem selben nir eine Zeichen for-Schleife
  render() {
    console.log(this);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle1(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle2(snapshot.isDraggingOver)}
            >
              {this.state.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
