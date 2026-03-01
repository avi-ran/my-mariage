<script setup lang="ts">
import { mariageDate } from '../stores/mariageConst'
import 'add-to-calendar-button'
const endDate = new Date(mariageDate.getTime() + 13 * 60 * 60 * 1000); // Add  hours to mariageDate
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="topbar">
    <!-- topbar left msg -->
    <div class="brand">
      <h1>{{ msg }}</h1>
    </div>
    <div class="actions">
      <add-to-calendar-button
        name="Ajouter à l'agenda"
        label="Ajouter à l'agenda"
        buttonStyle="custom"
        listStyle="modal"
        customCss="/addToCal.css"
        options="'Apple','Google','Outlook.com'"
        location="Ô Jardin, 81 route de l'Entre-Deux, Saint-Pierre 97410, La Réunion"
        :startDate="mariageDate.toISOString().split('T')[0]"
        :endDate="endDate.toISOString().split('T')[0]"
        startTime="13:30"
        endTime="02:30"
        timeZone="Indian/Reunion"
      ></add-to-calendar-button>
    </div>
  </div>
</template>
