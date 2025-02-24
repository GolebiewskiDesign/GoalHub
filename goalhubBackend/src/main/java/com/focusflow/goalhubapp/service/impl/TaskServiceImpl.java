package com.focusflow.goalhubapp.service.impl;

import com.focusflow.goalhubapp.dto.TaskDto;
import com.focusflow.goalhubapp.entity.Task;
import com.focusflow.goalhubapp.exception.ResourceNotFoundException;
import com.focusflow.goalhubapp.mapper.TaskMapper;
import com.focusflow.goalhubapp.model.User;
import com.focusflow.goalhubapp.repository.TaskRepository;
import com.focusflow.goalhubapp.repository.UserRepository;
import com.focusflow.goalhubapp.service.TaskService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl  implements TaskService {

    private TaskRepository taskRepository;
    private UserRepository userRepository;

    private ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public TaskDto createTask(TaskDto taskDto) {
        // Pobieranie zalogowanego użytkownika za pomocą Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName(); // Aktualnie zalogowany użytkownik

        User user = userRepository.findByUsername(currentUsername)
               .orElseThrow(() -> new RuntimeException("User not found"));

        //Task task = TaskMapper.mapToTask(taskDto);
       // task.setUser(user);
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriority(taskDto.getPriority());
        task.setStatus(taskDto.getStatus());
        task.setStartDate(taskDto.getStartDate());
        task.setFinishDate(taskDto.getFinishDate());
        task.setUser(user);
        task.setVersion(taskDto.getVersion()); // Obsługa wersji
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task is not exist with id: "+ taskId));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List <Task> tasks = taskRepository.findAll();
        return tasks.stream().map((task)-> TaskMapper.mapToTaskDto(task))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updatedTask) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()-> new ResourceNotFoundException("Task is not exist with given id: "+ taskId));


        // Aktualizuje tylko przesłane wartości
        if (updatedTask.getTitle() != null) {
            task.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getDescription() != null) {
            task.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getPriority() != null) {
            task.setPriority(updatedTask.getPriority());
        }
        if (updatedTask.getStatus() != null) {
            task.setStatus(updatedTask.getStatus());
        }
        if (updatedTask.getStartDate() != null) {
            task.setStartDate(updatedTask.getStartDate());
        }
        if (updatedTask.getFinishDate() != null) {
            task.setFinishDate(updatedTask.getFinishDate());
        }
        if (updatedTask.getVersion() != null) {
            task.setVersion(updatedTask.getVersion());
        }

        Task updatedTaskObj = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTaskObj);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()-> new ResourceNotFoundException("Task is not exist with given id: "+ taskId));

        taskRepository.deleteById(taskId);
    }

    @Override
    public TaskDto completeTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Task not found with id:"+id));

        task.setCompleted(Boolean.TRUE);

        Task updatedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTask);
       // return modelMapper.map(updatedTask, TaskDto.class);
    }

    @Override
    public TaskDto inCompleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Task not found with id:"+id));
        task.setCompleted(Boolean.FALSE);
       Task updatedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTask);
    }

    ;

}
