import React, { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import TodoList from "./components/TodoList";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [touchStartY, setTouchStartY] = useState<null | number>(null);
  const [swipeY, setSwipeY] = useState(0);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTouchStartY(null);
    setSwipeY(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setSwipeY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const deltaY = e.touches[0].clientY - touchStartY;
      setSwipeY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (swipeY > 100) {
      closeModal();
    } else {
      setSwipeY(0);
    }
  };


  return (
    <div className="App">
      <button className="button_form" onClick={openModal}>Открыть модалку</button>
      {modalVisible && (
        <div
          className="modal-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ transform: `translateY(${swipeY}px)` }}
        >
          <div className="modal">
            <div className="modal-content">
              {/* Здесь можно разместить содержимое модального окна */}
              <button onClick={closeModal}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
      {/* <UserList />
      <hr />
      <TodoList /> */}
    </div>
  );
}

export default App;
