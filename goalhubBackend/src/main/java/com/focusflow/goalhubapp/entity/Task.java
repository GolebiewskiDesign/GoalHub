package com.focusflow.goalhubapp.entity;

import com.focusflow.goalhubapp.enums.TaskPriority;
import com.focusflow.goalhubapp.enums.TaskStatus;
import com.focusflow.goalhubapp.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name="task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name="task_id")
    private Long taskId;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private Date startDate;
    private Date finishDate;

    @Column(name="completed")
    private boolean completed = false;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Version
    private Long version = 0L;




    // Konstruktor z argumentami
    public Task(Long taskId, String title, String description, TaskPriority priority, TaskStatus status, Date startDate, Date finishDate, boolean completed, User user) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.completed = completed;
        this.user = user;
    }

    public Task (){
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Long getVersion() {
        return version;
    }

    public void setVersion(Long user) {
        this.version = version;
    }




}
