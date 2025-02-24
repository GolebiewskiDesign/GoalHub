package com.focusflow.goalhubapp.repository;

import com.focusflow.goalhubapp.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository <Task, Long> {
}
