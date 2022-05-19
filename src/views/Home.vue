<template>
  
    <AddTask v-show="showAddTask" @add-task="addTask" />
  

  <Tasks
    @toggle-reminder="toggleReminder"
    @delete-task="deleteTask"
    :tasks="tasks"
  />
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  components: {
    Tasks,
    AddTask,
  },
  props: {
      showAddTask: Boolean
  },
  data() {
    return {
             tasks: [],
    }   
  },
  methods: {
   
    async addTask(taskObj) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObj),
      });
      const data = await res.json();

      this.tasks = [...this.tasks, data];
    },
    async deleteTask(id) {
      const res = await fetch(`api/tasks/${id}`, {
        method: "DELETE",
      });
      this.tasks = this.tasks.filter((x) => x.id !== id);
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`api/tasks/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify(updTask)
      })

      this.tasks = this.tasks.map((x) =>
        x.id === id ? { ...x, reminder: !x.reminder } : x
      );
    },
    async fetchTasks() {
      const res = await fetch("api/tasks");
      const data = await res.json();
      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>