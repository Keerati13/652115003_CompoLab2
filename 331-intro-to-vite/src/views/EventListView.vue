<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute  } from 'vue-router'
import EventService from '@/services/EventService'
// import { error } from 'console'

const route = useRoute()

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const perPage = computed(() => parseInt(route.query.perPage as string) || 2)
const page = computed(() => parseInt(route.query.page as string) || 1)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(perPage.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="home">
    <div class="flex flex-col items-center">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="events-info">
      <EventInfo v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="pagination">
      <RouterLink
        id="page-prve"
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events,
/* .event-info {
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
