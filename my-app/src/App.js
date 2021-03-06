import React, { Component } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dexie } from "dexie";

//
// Manipulate and Query Database
//

// Generate "Items"

const content = count => {
  if (count === 0) {
    return <Text value="text" />;
  } else if (count === 1) {
    return <Foto value="foto" />;
  } else if (count === 2) {
    return <Anschrift value="anschrift" />;
  } else if (count === 3) {
    return <Hobbies value="hobby" />;
  } else if (count === 4) {
    return <Werdegang value="werdegang" />;
  }
};

const getItems = (count, offset = 1) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: content(k)
  }));

const db = new Dexie("MyDb1");

db.version(1).stores({
  input: "key,txtInput"
});
db.input.clear();
db.input.add({ key: "text", txtInput: "" });
db.input.add({ key: "foto", txtInput: "" });
db.input.add({ key: "werdegang", txtInput: "" });
db.input.add({ key: "anschrift", txtInput: "" });
db.input.add({ key: "hobby", txtInput: "" });
const msg = getItems.state;
console.log(msg);
//?????????????????
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const dbValue = result => {
  const res = console.log(result["txtInput"]);
};
let res;

const getDBvalue = key => {
  const abc = Promise.resolve(db.input.get(key)).then(function(result) {
    res = result["txtInput"];
    console.log(res);
  });

  console.log(res);
};

console.log("-----------");
console.log(getDBvalue("hobby"));

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
  padding: grid
});

const getListStyle2 = isDraggingOver => ({
  background: isDraggingOver ? "lightgreen" : "lightgrey",
  padding: grid
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
        .update("text", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <label class="font">Name</label>
        <div class="form-group">
          <textarea
            type="text"
            name="inputtextarea"
            placeholder="Vor-/Nachname, Geburtsdatum, Geburts-Ort"
            class="form-control"
            id="inputtextarea"
            rows="3"
            onKeyUp={this.handle.bind(this)}
          />
        </div>
      </form>
    );
  }
}
class Foto extends Component {
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
        .update("foto", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <label class="font">Foto</label>
        <div class="form-group right">
          <picture>
            <source
              srcset="https://storyhub.de/serve/profileimage?user=TylorAlid"
              type="image/svg+xml"
            />
            <img src="..." class="img-fluid img-thumbnail" alt="..." />
          </picture>
        </div>
      </form>
    );
  }
}
class Anschrift extends Component {
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
        .update("anschrift", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <div class="form-group">
          <label class="font">Anschrift</label>
          <textarea
            placeholder="Adresse, PLZ, Ort"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onKeyUp={this.handle.bind(this)}
          />
        </div>
      </form>
    );
  }
}
class Werdegang extends Component {
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
        .update("werdegang", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <label class="font">Werdegang</label>
        <div class="form-group">
          <textarea
            type="text"
            name="inputtextarea"
            placeholder="Schulen, Ausbildung, Abschlüsse, Praktika"
            class="form-control"
            id="inputtextarea"
            rows="3"
            onKeyUp={this.handle.bind(this)}
          />
        </div>
      </form>
    );
  }
}
class Hobbies extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }
  handle(event) {
    let txtInput = this.state.data;

    this.setState({ data: event.target.value });
    if (event.key === "Enter") {
      db.input
        .update("hobby", { txtInput: txtInput })

        .catch(function(e) {});
      console.log(this);
      event.preventDefault();
    }
  }

  render() {
    return (
      <form>
        <label class="font">Hoobies</label>
        <div class="form-group">
          <textarea
            type="text"
            name="inputtextarea"
            placeholder="Hobbies"
            class="form-control"
            id="inputtextarea"
            rows="3"
            onKeyUp={this.handle.bind(this)}
          >
            {getDBvalue("hobby")}
          </textarea>
        </div>
      </form>
    );
  }
}

class App extends Component {
  state = {
    items: getItems(5),
    selected: getItems(0, 5)
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
      <div class="container-fluid">
        <nav class="navbar navbar-light stylecolor font border border rounded">
          CV-Builder
        </nav>
        <div class="row">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div class="col">
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    class="shadow-lg p-3 mb-5 bg-lightgrey rounded border border-dark"
                    ref={provided.innerRef}
                    style={getListStyle1(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
            </div>
            <div class="col">
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    class="shadow-lg p-3 mb-5 bg-lightgrey rounded border border-dark"
                    ref={provided.innerRef}
                    style={getListStyle2(snapshot.isDraggingOver)}
                  >
                    {this.state.selected.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
