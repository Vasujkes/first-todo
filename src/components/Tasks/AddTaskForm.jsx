import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/svg/add.svg";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [isLoading, setLoading] = useState();

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setinputValue("");
  };
  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(()=> {
          alert('Ошибка при добавлении задачи')
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            type="text"
            placeholder="Текст задачи"
            className="field"
            onChange={e => setinputValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Добавление...':'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} className="button button--cancel">
            Отмана
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
