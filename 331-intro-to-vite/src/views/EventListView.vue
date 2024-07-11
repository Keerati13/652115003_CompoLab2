<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import Event from '@/types/Event'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[]>(null)

onMounted(() => {
  axios
  .get('https://my-json-server.typicode.com/Keerati13/jsonLab2CP/events')
  .then((response) => {
    events.value = response.data
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="home">
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="events-info">
    <EventInfo v-for="event in events" :key="event.id" :event="event" />
  </div>    
  </div>

</template>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events, .event-info{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>