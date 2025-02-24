package com.focusflow.goalhubapp.dto;

import com.focusflow.goalhubapp.enums.TaskPriority;
import com.focusflow.goalhubapp.enums.TaskStatus;
import com.focusflow.goalhubapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


public class TaskDto {
    private Long taskId;


    private String title;
    private String description;

    private TaskPriority priority;

    private TaskStatus status;

    private Date startDate;
    private Date finishDate;

    private Integer userId;

    private Long version;
    private boolean completed;



    public TaskDto() {
    }


    public TaskDto(Long taskId, String title, String description, TaskPriority priority, TaskStatus status, Date startDate, Date finishDate, Integer userId, Long version, boolean completed) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.userId = userId;
        this.version = version;
        this.completed=completed;
    }





    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUser(Integer userId) {
        this.userId = userId;
    }

    public Long getVersion(){
        return version;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setVersion(Long version){
        this.version = version;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }


}
