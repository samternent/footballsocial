<script setup>
import { useLocalStorage } from "@vueuse/core";

import { Identity } from "@/modules/identity";
import { Encryption } from "@/modules/encryption";
import { SolidPanel } from "@/modules/panels";
import { provideSolid } from "@/modules/solid";

provideSolid();
const showPanel = useLocalStorage("concords/app/showPanel", false);
</script>

<template>
  <VApp>
    <VLayout class="flex-col flex h-screen">
      <VNavigationDrawer permanent :rail="true">
        <VList>
          <VListItem to="/ledger">
            <svg fill="#3d3d3d" viewBox="0 0 48 48">
              <g>
                <path
                  d="M5.899999237060548,-7.629394538355427e-7 c-5.6,0 -5.9,5.3 -5.9,5.6 v38.9 c19.9,0 35.2,0 38.6,0 c5.6,0 5.9,-5.3 5.9,-5.6 V-7.629394538355427e-7 H5.899999237060548 zM7.099999237060544,13.599999237060544 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 c0,2.8 -2.8,5.1 -6.3,5.1 C9.99999923706055,18.699999237060545 7.099999237060544,16.39999923706055 7.099999237060544,13.599999237060544 zM32.49999923706055,30.599999237060544 c-1.5,0.9 -3.2,1.5 -5.1,2 c-1.6,0.4 -3.2,0.6000000000000001 -4.9,0.6000000000000001 c-2,0 -3.9,-0.30000000000000004 -5.8,-0.8 c-1.7000000000000002,-0.5 -3.3,-1.2 -4.7,-2 c-0.9,-0.6000000000000001 -1.1,-1.7000000000000002 -0.6000000000000001,-2.6 c0.6000000000000001,-0.9 1.7000000000000002,-1.1 2.6,-0.6000000000000001 c1.1,0.7000000000000001 2.3,1.2 3.7,1.6 c2.8,0.8 6,0.8 8.9,0.2 c1.5,-0.4 2.9,-0.9 4,-1.6 c0.9,-0.5 2,-0.2 2.6,0.6000000000000001 C33.699999237060545,28.89999923706055 33.39999923706055,30.099999237060544 32.49999923706055,30.599999237060544 zM31.89999923706055,18.699999237060545 c-3.5,0 -6.3,-2.3 -6.3,-5.1 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 C38.199999237060545,16.39999923706055 35.29999923706055,18.699999237060545 31.89999923706055,18.699999237060545 z"
                  id="svg_1"
                  class=""
                  fill="inherit"
                  fill-opacity="1"
                />
              </g>
            </svg>
          </VListItem>
        </VList>

        <VList density="compact" nav>
          <VListItem
            prepend-icon="mdi-content-save-outline"
            title="My Files"
            value="myfiles"
            @click="showPanel = !showPanel"
          ></VListItem>
          <VListItem
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></VListItem>
          <VListItem
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></VListItem>
        </VList>
      </VNavigationDrawer>
      <VNavigationDrawer permanent v-model="showPanel" class="p-4">
        <SolidPanel />
      </VNavigationDrawer>

      <VMain>
        <Identity>
          <Encryption>
            <RouterView />
          </Encryption>
        </Identity>
      </VMain>
    </VLayout>
  </VApp>
</template>
