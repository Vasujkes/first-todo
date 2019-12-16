import React from "react";
import axios from "axios";

import editSvg from "../../assets/svg/edit.svg";
import "./Tasks.scss";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withOutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert("Неудалось обновить название списка");
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="edit icon" />
      </h2>
      <div className="tasks__items">
        {!withOutEmpty && list.tasks && !list.tasks.length && (
          <div className="tasks__empty">Задачи отсутствуют</div>
        )}
        {list.tasks.map(task => (
          <Task
            key={task.id}
            list={list}
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            onComplete={onCompleteTask}
            {...task}
          />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
