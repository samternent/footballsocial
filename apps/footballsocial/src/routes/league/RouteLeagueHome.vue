<script setup>
import { computed, toRefs, watch, provide, shallowRef } from "vue";
import { useTitle } from "@vueuse/core";

import { useCompetitionLoader } from "../../api/football-data/useCompetitionLoader";

const props = defineProps({
  competitionCode: {
    type: String,
    required: true,
  },
  gameweek: {
    type: Number,
    default: null,
  },
  season: {
    type: String,
    default: null,
  },
});

const { competitionCode, gameweek, season } = toRefs(props);
const title = useTitle();

const { items: competition, hasItems: hasCompetition } = useCompetitionLoader();

const crestMap = {
  DED: "ED",
};
const crest = computed(
  () => crestMap[competitionCode.value] || competitionCode.value
);
const tabs = shallowRef(["discussions", "table", "fixtures"]);

watch(
  competition,
  (_competition) => {
    if (_competition?.name) {
      title.value = `${_competition.name}  - Football Social`;
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="md:px-2 lg:px-4 flex-1 max-w-3xl mx-auto pt-0 w-full z-10">
    <div
      class="pt-8 pb-12 px-2 flex justify-between items-center flex-col md:flex-row"
    >
      <div>
        <h1
          class="text-5xl text-white font-bold tracking-tighter shadow-text"
          v-if="competition"
        >
          {{ competition.name }}.
        </h1>
        <h1 v-else class="text-2xl font-thin mb-2">
          <div class="bg-[#3c3c3c] animate-pulse m-2 rounded flex-1 h-8 w-64" />
        </h1>
        <p class="text-sm md:text-base text-[#cdcdcd]">
          <span class="font-bold"
            ><span class="text-indigo-400">Football</span> Social.
          </span>
          Talk <span class="text-pink-400">Football</span>, with
          <span class="text-yellow-400">Football</span> people.
        </p>
      </div>
      <div class="flex items-center justify-between mt-8 md:mt-0">
        <img
          alt="Football Social"
          src="../../assets/OneLoveBawb.png"
          class="h-10 w-10 m-4 block mr-8 md:mr-4"
        />
      </div>
    </div>

    <ul class="flex my-4">
      <li v-for="t in tabs" :key="`${t}`">
        <RouterLink
          :to="`/leagues/${competitionCode}/${t}`"
          class="px-4 py-3 uppercase hover:bg-indigo-900 text-white border-b-4 border-transparent"
          active-class="bg-indigo-900 border-indigo-200"
        >
          {{ t }}
        </RouterLink>
      </li>
    </ul>
    <RouterView />
    <div class="flex justify-center mt-8 mt-16 mx-16 items-end transition-all">
      <img
        alt=""
        class="h-96 opacity-80 transition-all"
        src="../../assets/game-day.svg"
      />
    </div>
  </div>
</template>
