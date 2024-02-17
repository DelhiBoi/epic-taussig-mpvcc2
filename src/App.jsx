import "./styles.css";
import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const [items, setItems] = useState([{ id: "item-1" }, { id: "item-2" }]);

  const [items2, setItems2] = useState([]);

  const droppable_state = new Map();
  droppable_state.set("1", [items, setItems]);
  droppable_state.set("2", [items2, setItems2]);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // If dragging outside the DropContext, it will return to starting states
    if (!destination) return;

    // if trying to drag and drop to same droppable, then nothing should change
    // since only 2 circles are there
    if (destination.droppableId === source.droppableId) return;

    const movedItemId = result.draggableId;

    // maintain source and state variables since circles can be dragged and dropped
    // from one rectanle to another and vice versa
    const source_state = droppable_state.get(source.droppableId)[0];
    const destination_state = droppable_state.get(destination.droppableId)[0];

    const source_state_setter = droppable_state.get(source.droppableId)[1];
    const destination_state_setter = droppable_state.get(
      destination.droppableId,
    )[1];

    // remove moved item from source state and set it
    const source_items_new = source_state.filter(function (obj) {
      return obj.id !== movedItemId;
    });
    source_state_setter(source_items_new);

    // add moved item to destination state and set it
    destination_state.push({ id: movedItemId });
    destination_state_setter(destination_state);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <Droppable droppableId="1">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="divver"
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided, snapshot) => (
                      <div
                        className="circle"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      ></div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="divver"
                {...provided.droppableProps}
              >
                {items2.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided, snapshot) => (
                      <div
                        className="circle"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      ></div>
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
  );
}
