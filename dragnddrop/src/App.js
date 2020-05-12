import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const items = [
  { number: "1", title: "Missed Call ", icon: "phone_missed" },
  { number: "2", title: "Cloud Circle", icon: "cloud_circle" },
  { number: "3", title: "Airplane Mode", icon: "airplanemode_active" },
  { number: "4", title: "Code", icon: "	keyboard" },
  { number: "5", title: "Games", icon: "gamepad" },
];

const initialDNDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

function App() {
  const [list, setList] = useState(items);
  const [diff, setDiff] = useState(false);
  const [user, setUser] = useState("");
  const [dragAndDrop, setDragAndDrop] = useState(initialDNDState);

  const animals = [
    "🐈",
    "🐶",
    "🐻",
    "🦜",
    "🐢",
    "🐴",
    "🐭",
    "🐹",
    "🐬",
    "🐮",
    "🐷",
    "🐒",
    "🐥",
    "🦄",
    "🦊",
  ];

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });
    console.log(initialPosition);

    // e.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);
    console.log(draggedTo);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (e) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = (e) => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const handleSubmit = (e) => {
    //setList([...list, { number: list.length + 1, title: user }]);

    const val = user;
    if (e.keyCode == 13 && val) {
      setList([...list, { number: list.length + 1, title: val }]);
      setUser("");
    }
  };

  const handleRemove = (i) => {
    let newList = [...list];
    newList.splice(i, 1);
    setList(newList);
  };

  const dragStart = (e) => {
    console.log("dragging ", e.target.id);

    e.dataTransfer.setData("animal", e.target.id);
  };
  const drop = (e) => {
    const thingBeingDragged = e.dataTransfer.getData("animal");
    e.target.appendChild(document.getElementById(thingBeingDragged));

    // Remove the highlight
    // because the onDragLeave won't fire after onDrop
    e.target.classList.remove("activeDropArea");
  };

  const allowDrop = (e) => {
    // The default action of onDragOver
    // is to cancel the drop operation  -.-
    // so we need to prevent that
    e.preventDefault();
  };

  //second type of drag an drop functions

  const dragEnter = (e) => {
    // Drag Enter is used to
    // highlight the drop area
    e.target.classList.add("activeDropArea");
  };

  const dragLeave = (e) => {
    // Drag Leave is used to
    // remove the highlight in the drop area
    e.target.classList.remove("activeDropArea");
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          setDiff(!diff);
        }}
      >
        Other Type of Drag and Drop
      </button>
      {diff ? (
        <section>
          <label className="label">New Item</label>

          <input
            className="inp"
            type="textfield"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            onKeyDown={handleSubmit}
          />

          <p>The Drag and Drop</p>
          <ul>
            {list.map((l, index) => {
              return (
                <li
                  key={index}
                  data-position={index}
                  draggable
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragLeave={onDragLeave}
                  className={
                    dragAndDrop && dragAndDrop.draggedTo === Number(index)
                      ? "dropArea"
                      : ""
                  }
                >
                  <span>{l.number}</span>
                  <p>{l.title}</p>
                  <i
                    class="material-icons"
                    style={{
                      fontSize: "28px",
                      color: "#f78fb3",

                      marginLeft: "10%",
                    }}
                  >
                    {l.icon}
                  </i>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => {
                        handleRemove(index);
                      }}
                      class="material-icons"
                      style={{
                        fontSize: "28px",
                        color: "#f78fb3",

                        marginLeft: "10%",
                      }}
                    >
                      {" "}
                      close
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <div>
          <div>
            <ul>
              {animals.map((animal) => (
                // <DraggableThing
                //   style={{ fontSize: "40px " }}
                //   key={animal}
                //   id={animal}
                // />
                <li
                  className="availableAnimals"
                  key={animal}
                  id={animal}
                  draggable="true"
                  onDragStart={dragStart}
                >
                  {animal}
                </li>
              ))}
            </ul>
            <div
              className="droppableArea"
              onDrop={drop}
              onDragOver={allowDrop}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
            >
              <p>picked animals 🤲</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
