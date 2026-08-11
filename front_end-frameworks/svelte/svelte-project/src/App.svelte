<script>
import { Rocket } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Ma Homepage</title>
</svelte:head>
<main
  class="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4 text-center"
>
  <Rocket class="mb-6 text-indigo-600" size={56} strokeWidth={1.5} />
  <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
    Bienvenue sur mon projet Svelte
  </h1>
  <h2 class="mt-3 max-w-xl text-lg text-slate-600 sm:text-xl">
    Une page d’accueil simple, stylisée avec Tailwind CSS et une icône Lucide.
  </h2>
  <a
    href="https://lucide.dev"
    target="_blank"
    rel="noreferrer"
    class="mt-8 inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
  >
    Découvrir Lucide
  </a>
</main>
