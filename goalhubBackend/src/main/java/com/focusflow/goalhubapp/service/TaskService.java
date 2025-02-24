package com.focusflow.goalhubapp.service;

import com.focusflow.goalhubapp.dto.TaskDto;
import org.springframework.stereotype.Service;


import java.util.List;


public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    TaskDto getTaskById (Long taskId);

    List <TaskDto> getAllTasks();

    TaskDto updateTask(Long taskId, TaskDto updatedTask);

    void deleteTask(Long taskId);

    TaskDto completeTask(Long id);

    TaskDto inCompleteTask(Long id);
}
