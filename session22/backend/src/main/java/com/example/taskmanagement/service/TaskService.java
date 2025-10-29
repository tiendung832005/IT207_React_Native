package com.example.taskmanagement.service;

import com.example.taskmanagement.dto.TaskRequestDTO;
import com.example.taskmanagement.dto.TaskStatusDTO;
import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(TaskRequestDTO taskRequestDTO) {
        Task task = new Task();
        task.setName(taskRequestDTO.getName());
        task.setPriority(taskRequestDTO.getPriority());
        task.setDescription(taskRequestDTO.getDescription());
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long id, TaskRequestDTO taskRequestDTO) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setName(taskRequestDTO.getName());
        task.setPriority(taskRequestDTO.getPriority());
        task.setDescription(taskRequestDTO.getDescription());
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long id, TaskStatusDTO taskStatusDTO) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(taskStatusDTO.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}