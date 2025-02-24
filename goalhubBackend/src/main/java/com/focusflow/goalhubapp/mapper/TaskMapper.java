package com.focusflow.goalhubapp.mapper;

import com.focusflow.goalhubapp.dto.TaskDto;
import com.focusflow.goalhubapp.entity.Task;
import com.focusflow.goalhubapp.model.User;

public class TaskMapper {

    public static TaskDto mapToTaskDto (Task task){
        return new TaskDto(
                        task.getTaskId(),
                        task.getTitle(),
                        task.getDescription(),
                task.getPriority(),
                task.getStatus(),
                        task.getStartDate(),
                        task.getFinishDate(),
                        task.getUser().getId(), // Pobieram tylko userId
                        task.getVersion(),
                        task.isCompleted()
                );
    }


    public static Task mapToTask (TaskDto taskDto){
        Task task = new Task();
        task.setTaskId(taskDto.getTaskId());
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriority(taskDto.getPriority());
        task.setStatus(taskDto.getStatus());
        task.setStartDate(taskDto.getStartDate());
        task.setFinishDate(taskDto.getFinishDate());
        User user = new User();
        user.setId(taskDto.getUserId());
        task.setUser(user);
        task.setVersion(taskDto.getVersion());
        return task;
    }
}
