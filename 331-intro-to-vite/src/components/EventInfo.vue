<script setup lang="ts">
import { ref } from 'vue'
import Event from '@/types/Event'
defineProps<{
  event: Event
}>()
</script>

<template>
    <div class="event-class">
    <div class="event-info">
        <span>{{ event.category }}</span>
        <span>{{ event.organizer }}</span>      
    </div>        
    </div>

  </template>
  
  <style scoped>
  .event-info {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    text-align: right;
    font-size: 20px;
  }
  .event-info:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .event-info span{
    font-size: 12px;
  }
  </style>
