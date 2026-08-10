<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { Sparkles } from 'lucide-vue-next';

</script>

<template>
  <div>
    <main>
      <h1 class="flex items-center gap-3 text-3xl font-bold text-gray-900"> Mon application Vue 3 + Tailwind</h1>
      <Sparkles class="h-7 w-7 text-indigo-600" />
      <span>
        <h2 class="text-xl font-medium text-gray-700">Exemple avec H1, H2, une icône et un composant HelloWorld</h2>
      </span>
      <HelloWorld msg="Bienvenue dans HelloWorld" />
    </main>
  </div>
</template>
