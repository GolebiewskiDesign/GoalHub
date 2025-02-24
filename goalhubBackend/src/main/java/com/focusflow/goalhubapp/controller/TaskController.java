package com.focusflow.goalhubapp.controller;

import com.focusflow.goalhubapp.dto.TaskDto;
import com.focusflow.goalhubapp.entity.Task;
import com.focusflow.goalhubapp.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable ("id") Long taskId){
        TaskDto taskDto = taskService.getTaskById(taskId);
        return ResponseEntity.ok(taskDto);
    }


    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks(){
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }


    @PatchMapping("{id}")
    public ResponseEntity<TaskDto> updateTask (@PathVariable("id") Long taskId,
                                               @RequestBody TaskDto updatedTask){
        TaskDto taskDto = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(taskDto);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask (@PathVariable("id") Long taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully!");
    }



    @PatchMapping("{id}/complete")
    public ResponseEntity<TaskDto> completeTask(@PathVariable("id") Long taskId){
       TaskDto updatedTask =  taskService.completeTask(taskId);
       return ResponseEntity.ok(updatedTask);
    }


    @PatchMapping("{id}/in-complete")
    public ResponseEntity<TaskDto> inCompleteTask(@PathVariable("id") Long taskId){
        TaskDto updatedTask = taskService.inCompleteTask(taskId);
        return ResponseEntity.ok(updatedTask);
    }


}
