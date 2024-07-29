<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
// import axios from 'axios'
import EventService from '@/services/EventService'
import { error } from 'console'

const events = ref<Event | null>(null)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
      })
      .catch((error) => {
        console.error('There was an error!' , error)
      })
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
  <RouterLink :to="{ name: 'event-list-view', query: { page: page - 1 } }" rel="prev" v-if="(page != 1)">Prev Page</RouterLink> |
  <RouterLink :to="{ name: 'event-list-view', query: { page: page + 1 } }" rel="next">Next Page</RouterLink>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events,
.event-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
