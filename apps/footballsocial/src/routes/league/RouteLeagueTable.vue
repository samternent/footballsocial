<script setup>
import { inject } from "vue";
import LeagueTable from "../../components/LeagueTable.vue";
import { useCompetitionLoader } from "../../api/football-data/useCompetitionLoader";
const { items: competition, hasItems: hasCompetition } = useCompetitionLoader();
</script>
<template>
  <LeagueTable v-if="competition" :competitionCode="competition?.code" />
</template>
