# React vs Vue.js — Migration Comparison

This document compares the React implementation (`front_end-frameworks/react/`) with its
Vue.js migration (`front_end-frameworks/vue/`). Both applications are the same "Agentic AI"
landing page: same sections, same content, same behaviour.

All code samples below are taken from the two real projects, not from generic examples.

**Equivalence check performed after the migration:**

| Check | Result |
|---|---|
| Desktop rendering (1280px), Vue vs React | 0 different pixels out of 6,650,880 |
| Mobile (375px) and tablet (768px) | identical |
| Contact form behaviour (11 assertions) | identical |
| Anchor navigation scroll positions | identical to the pixel |
| Console errors / Vue warnings | none |

---

## Quick reference: what changed

| React | Vue |
|---|---|
| `App.jsx` | `App.vue` |
| `main.jsx` | `main.js` |
| JSX returned from a function | `<template>` block in a `.vue` file |
| `className` | `class` |
| `htmlFor` | `for` |
| `{children}` | `<slot />` |
| `useState` | `ref()` / `reactive()` |
| derived `const` recomputed each render | `computed()` |
| `useEffect(fn, [])` | `onMounted(fn)` |
| `.map()` | `v-for` |
| `{cond && <El/>}` / ternary | `v-if` / `v-else-if` / `v-else` |
| `onClick={fn}` | `@click="fn"` |
| `onSubmit` + `e.preventDefault()` | `@submit.prevent` |
| `value` + `onChange` | `v-model` |
| `<Tag>` variable component | `<component :is="...">` |
| `lucide-react` | `lucide-vue-next` |

---

## 1. Components

### How React components are created

A React component is a plain JavaScript function that returns JSX. It is exported and
imported like any other value.

```jsx
// react/src/components/ui/SectionBadge.jsx
function SectionBadge({ children }) {
	return (
		<span className="px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">{children}</span>
	);
}

export default SectionBadge;
```

There is no framework-specific file format: `.jsx` is just JavaScript. Logic, markup and
imports all live in the same function scope.

### How Vue components are created

A Vue component is a **Single File Component** (SFC): one `.vue` file holding up to three
blocks — `<script>`, `<template>` and `<style>`. With `<script setup>`, everything declared
at the top level is automatically exposed to the template.

```vue
<!-- vue/src/components/ui/SectionBadge.vue -->
<template>
	<span class="px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
		<slot />
	</span>
</template>
```

This component needs no `<script>` block at all — it has no logic. There is also **no
explicit export**: the file itself is the component.

A component with logic looks like this:

```vue
<!-- vue/src/components/ui/Button.vue -->
<script setup>
import { computed } from "vue";

const VARIANTS = {
	primary: "font-semibold text-violet-50 bg-violet-600 hover:bg-violet-700 transition",
	secondary: "font-semibold border border-slate-800 bg-slate-950 hover:bg-slate-900",
};

const props = defineProps({
	href: { type: String, default: undefined },
	variant: { type: String, default: "primary" },
});

const variantClass = computed(() => VARIANTS[props.variant]);
</script>

<template>
	<a v-if="href" :class="variantClass" :href="href">
		<slot />
	</a>
	<button v-else :class="variantClass">
		<slot />
	</button>
</template>
```

### Similarities

- Both are **component-based**: the UI is a tree of small, reusable, composable units.
- Both use **one-way data flow**: data goes down through props.
- Both import child components explicitly at the top of the file.
- Both keep markup and logic **co-located** in the same file (unlike the old
  HTML/CSS/JS separation).
- In both, a component is used in markup as a capitalised tag: `<SectionBadge>`.

### Differences

| Aspect | React | Vue |
|---|---|---|
| File format | `.jsx` — plain JavaScript | `.vue` — a dedicated format compiled by a plugin |
| Structure | one function, one `return` | separate `<script setup>` and `<template>` blocks |
| Export | explicit `export default MyComponent` | implicit — the file *is* the component |
| Import path | extension optional (`"./Button"`) | **extension required** (`"./Button.vue"`) |
| Re-execution | the whole function re-runs on every render | `<script setup>` runs **once** per instance |
| Markup vs logic | interleaved in the same expression | physically separated into two blocks |

The last row is the most consequential difference in practice. In React, the component
function body runs again on every render, so any value declared inside it is recomputed
every time. In Vue, `<script setup>` executes **once** when the component is created;
afterwards, only reactive dependencies trigger updates. This changes how you think about
derived values (see [State management](#4-state-management)).

---

## 2. Templates

### JSX

JSX is a syntax extension that lets you write markup-like expressions inside JavaScript.
It compiles to function calls. Because it *is* JavaScript, you use ordinary JS everywhere:

```jsx
// react/src/components/cards/InsightCard.jsx
<article
	className={`relative h-72 sm:h-80 overflow-hidden rounded-3xl border border-slate-800 ${
		index === 0 ? "col-span-2" : "col-span-1"
	}`}
>
```

Since JSX is JavaScript, HTML attribute names that collide with JS reserved words are
renamed: `class` → `className`, `for` → `htmlFor`.

### Vue templates

Vue templates are valid HTML extended with **directives** (`v-if`, `v-for`, `v-bind`,
`v-on`, `v-model`). Attribute names stay exactly as in HTML:

```vue
<!-- vue/src/components/cards/InsightCard.vue -->
<article
	class="relative h-72 sm:h-80 overflow-hidden rounded-3xl border border-slate-800"
	:class="index === 0 ? 'col-span-2' : 'col-span-1'"
>
```

Note the improvement here: Vue accepts **two `class` attributes** — a static one and a
bound one (`:class`) — and merges them. React needs a single template literal mixing the
static and dynamic parts.

`:class` also accepts objects and arrays:

```vue
:class="{ 'opacity-60': isSending, 'hover:bg-violet-700': !isSending }"
```

### Advantages and disadvantages

**JSX**

| Advantages | Disadvantages |
|---|---|
| Full power of JavaScript — `.map()`, `&&`, ternaries, any helper function | Renamed attributes (`className`, `htmlFor`) diverge from HTML |
| One language to learn; no template syntax to memorise | Complex conditionals become deeply nested and hard to read |
| Easy to extract markup into local variables or functions | Harder to statically analyse and optimise ahead of time |
| Type-checking works naturally over the markup | Copy-pasted HTML must be converted before it works |

**Vue templates**

| Advantages | Disadvantages |
|---|---|
| Valid HTML — designers can read it, HTML pastes in unchanged | You must learn the directive vocabulary (`v-if`, `v-for`, ...) |
| Directives express intent clearly and read declaratively | Restricted to expressions; no arbitrary statements inline |
| Compiler knows the structure statically → better optimisation | Complex logic must be moved into `<script setup>` (arguably a benefit) |
| Static and dynamic `class` can coexist and merge | Slightly more indirection between markup and logic |

In this migration, the Vue templates ended up **more readable** for conditional lists,
while JSX remained more flexible when markup had to be built programmatically.

---

## 3. Props

### React props

Props arrive as a single object argument, usually destructured, with defaults expressed
as plain JavaScript default values:

```jsx
// react/src/components/ui/Brand.jsx
function Brand({
	label = "Agentic AI",
	iconClassName = "w-7 h-7 text-green-600",
	textClassName = "text-sm font-bold"
}) {
	return (
		<>
			<Squirrel className={iconClassName} />
			<span className={textClassName}>{label}</span>
		</>
	);
}
```

There is no type declaration and no runtime validation (unless `prop-types` or TypeScript
is added).

### Vue props

Props are **declared** with `defineProps`, which documents the name, type, default and
whether the prop is required. Vue validates them at runtime in development:

```vue
<!-- vue/src/components/ui/Brand.vue -->
<script setup>
import { Squirrel } from "lucide-vue-next";

defineProps({
	label: { type: String, default: "Agentic AI" },
	iconClass: { type: String, default: "w-7 h-7 text-green-600" },
	textClass: { type: String, default: "text-sm font-bold" },
});
</script>

<template>
	<Squirrel :class="iconClass" />
	<span :class="textClass">{{ label }}</span>
</template>
```

Props are declared in camelCase and passed in the template in kebab-case:

```vue
<Brand
	icon-class="w-7 h-7 ... bg-violet-500 shadow-lg shadow-violet-500/40"
	text-class="text-sm font-bold text-slate-50"
/>
```

### A real difference found during this migration: `className` as a prop

In React, passing extra CSS classes to a child requires an explicit prop, because there is
no automatic mechanism:

```jsx
function Button({ className = "", variant = "primary", ... }) {
	const classes = `${VARIANTS[variant]} ${className}`.trim();   // manual merge
	...
}
```

Vue has **attribute fallthrough**: any attribute that is *not* a declared prop is applied
automatically to the component's root element, and `class` is *merged* rather than
replaced. So the `className` prop disappears entirely:

```vue
<!-- Button.vue declares no "class" prop at all -->
<a v-if="href" :class="variantClass" :href="href"><slot /></a>
```

```vue
<!-- The parent just writes class="..." and it merges with variantClass -->
<Button href="#contact-section" class="px-4 py-2 rounded-md shadow-lg shadow-violet-500/40">
	Enroll now
</Button>
```

This removed a prop and a manual string concatenation from every reusable component
(`Button`, `SectionTitle`).

### Passing components as props

Both frameworks can pass a *component* as a prop — the data files store Lucide icons this
way. The consumption syntax differs:

```jsx
// React: the prop must be capitalised to be treated as a component
function FeatureCard({ title, description, Icon }) {
	return <div>{Icon && <Icon />}</div>;
}
```

```vue
<!-- Vue: any name works, rendered through the <component> element -->
<script setup>
defineProps({ icon: { type: [Object, Function], default: null } });
</script>

<template>
	<div v-if="icon"><component :is="icon" /></div>
</template>
```

### Similarities

- Props are **read-only** in both: a child must never mutate them.
- Both support any value type: strings, numbers, arrays, objects, functions, components.
- Both flow **one way**, parent → child.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Declaration | destructuring in the signature | explicit `defineProps({...})` |
| Types | none by default | declared, validated at runtime in dev |
| Defaults | JS default parameter values | `default` key in the declaration |
| Naming in markup | camelCase | kebab-case (camelCase in `defineProps`) |
| Extra attributes | must be forwarded manually | **fallthrough**, applied to root automatically |
| `class` merging | manual string concatenation | automatic merge |
| Children | `children` prop | `<slot />` |

---

## 4. State management

### React state management

`useState` returns a value and a setter. State is **immutable**: you always replace it,
never mutate it, which is why the object spread is needed:

```jsx
// react/src/components/sections/Contact.jsx
const [formData, setData] = useState({ fullName: "", email: "", message: "" });
const [isSending, setIsSending] = useState(false);
const [feedbackMsg, setFeedbackMsg] = useState(DEFAULT_FEEDBACK);

function handleChange(e) {
	setData({ ...formData, [e.target.name]: e.target.value });   // replace, don't mutate
}

// derived values: plain consts, recomputed on every single render
const isNameValid = formData.fullName.trim().length >= 2;
const isEmailValid = formData.email.includes(".") && formData.email.includes("@");
const isMessageValid = formData.message.trim().length >= 10;
const isValid = isEmailValid && isMessageValid && isNameValid;
```

Calling a setter schedules a re-render: the whole component function runs again from top
to bottom.

### Vue reactive state

Vue offers two primitives:

- `ref(value)` — for any value; read and written through `.value` in `<script>`, and
  auto-unwrapped in `<template>`.
- `reactive(object)` — for objects; properties are mutated **directly**.

```vue
<!-- vue/src/components/sections/Contact.vue -->
<script setup>
import { reactive, ref, computed } from "vue";

const formData = reactive({ fullName: "", email: "", message: "" });
const isSending = ref(false);
const feedbackMsg = ref(DEFAULT_FEEDBACK);

// derived values: cached, recomputed only when their dependencies change
const isNameValid = computed(() => formData.fullName.trim().length >= 2);
const isEmailValid = computed(() => formData.email.includes(".") && formData.email.includes("@"));
const isMessageValid = computed(() => formData.message.trim().length >= 10);
const isValid = computed(() => isEmailValid.value && isMessageValid.value && isNameValid.value);
</script>
```

Note there is **no `handleChange` function at all** in the Vue version — `v-model` handles
it (see [Forms](#8-forms)). Mutation is direct:

```js
formData.fullName = "";      // Vue: mutate directly
```
```js
setData({ ...formData, fullName: "" });   // React: replace the whole object
```

### The key conceptual difference

This is the single most important thing to understand when moving between the two.

**React re-runs the component function.** Any value declared inside it is recreated on
every render. `isNameValid` is a plain `const`: it is recomputed on *every* render, whether
or not `fullName` changed. That is cheap here, but for expensive computations React needs
`useMemo` to opt out.

**Vue tracks dependencies.** `<script setup>` runs once. `computed()` builds a cached value
that knows which reactive sources it reads; it only recomputes when one of them actually
changes, and only the DOM nodes that depend on it are updated. There is no equivalent of
`useMemo` because caching is the default.

### Similarities

- Both are **declarative**: you describe state, and the UI follows automatically.
- Both keep state local to a component unless deliberately lifted or shared.
- Both re-render/update automatically when state changes.
- Both distinguish raw state from derived state.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Declaration | `const [x, setX] = useState(v)` | `const x = ref(v)` / `reactive(obj)` |
| Update | call the setter with a new value | assign directly (`x.value = ...`) |
| Mutability | immutable — must replace | mutable — mutate in place |
| Access in logic | `x` | `x.value` (refs only) |
| Access in template | `x` | `x` (auto-unwrapped) |
| Derived values | plain `const`, recomputed each render | `computed()`, cached |
| Memoisation | opt-in via `useMemo` | automatic |
| Update granularity | re-runs the whole component | updates only affected dependencies |
| Rules | Hooks must be top-level, never conditional | no such restriction |

---

## 5. Lifecycle

Only one component in this project has lifecycle logic: `Insights`, which loads data on
mount.

### React lifecycle logic

`useEffect` with an empty dependency array `[]` runs the callback once after the first
render. The effect callback cannot itself be `async`, so an inner async function is
declared and immediately called:

```jsx
// react/src/components/sections/Insights.jsx
const [insights, setInsights] = useState([]);
const [error, setError] = useState("");

useEffect(() => {
	async function fetchData() {
		try {
			const res = await getInsights();
			setInsights(res);
		} catch {
			setError("loading insights error");
		}
	}
	fetchData();
}, []);
```

### Vue lifecycle logic

Vue exposes named lifecycle hooks. `onMounted` accepts an `async` callback directly, so
the wrapper function disappears:

```vue
<!-- vue/src/components/sections/Insights.vue -->
<script setup>
import { ref, onMounted } from "vue";

const insights = ref([]);
const error = ref("");

onMounted(async () => {
	try {
		const res = await getInsights();
		insights.value = res;
	} catch {
		error.value = "loading insights error";
	}
});
</script>
```

### Similarities

- Both run **after** the component is inserted into the DOM.
- Both are the correct place for data fetching, subscriptions and DOM measurements.
- Both support cleanup (React: return a function from the effect; Vue: `onUnmounted`).

### Differences

| Aspect | React | Vue |
|---|---|---|
| API | one generic `useEffect` | named hooks (`onMounted`, `onUnmounted`, `onUpdated`...) |
| "Run once" | convention: empty dependency array `[]` | built in — `onMounted` runs once by design |
| Async callback | not allowed; needs an inner function | allowed directly |
| Reacting to changes | same `useEffect` with dependencies | a different tool: `watch` / `watchEffect` |
| Cleanup | `return () => {...}` from the effect | separate `onUnmounted` hook |
| Common pitfall | forgetting/misdeclaring dependencies | fewer pitfalls; dependencies are tracked automatically |

Vue's main simplification is that "run once on mount" and "react to a change" are two
**different, explicitly named** APIs, whereas React expresses both through `useEffect` and
distinguishes them only by the dependency array — a frequent source of bugs.

---

## 6. Conditional rendering

### React conditional rendering

React uses ordinary JavaScript expressions — the `&&` operator or a ternary:

```jsx
// react/src/components/ui/SectionTitle.jsx
{highlight && <span className={highlightClassName}>{highlight}</span>}
```

```jsx
// react/src/components/sections/Insights.jsx
<div>{error && <p className="text-red-400">{error}</p>}</div>
```

```jsx
// react/src/components/cards/HighlightCard.jsx — conditional at the root
function HighlightCard({ Icon, label }) {
	return (
		Icon && (
			<li className="...">
				<Icon className="h-4 w-4 text-violet-400" />
				<p>{label}</p>
			</li>
		)
	);
}
```

```jsx
// react/src/components/sections/About.jsx — inside a list
{index < steps.length - 1 && (
	<div className="absolute left-4 top-8 w-px h-full bg-slate-800" />
)}
```

### Vue conditional rendering

Vue uses the `v-if` / `v-else-if` / `v-else` directives, placed on the element itself:

```vue
<!-- vue/src/components/ui/SectionTitle.vue -->
<span v-if="highlight" :class="highlightClass">{{ highlight }}</span>
```

```vue
<!-- vue/src/components/sections/Insights.vue -->
<div>
	<p v-if="error" class="text-red-400">{{ error }}</p>
</div>
```

```vue
<!-- vue/src/components/cards/HighlightCard.vue — conditional at the root -->
<li v-if="icon" class="...">
	<component :is="icon" class="h-4 w-4 text-violet-400" />
	<p>{{ label }}</p>
</li>
```

```vue
<!-- vue/src/components/sections/About.vue — inside a list -->
<div v-if="index < steps.length - 1" class="absolute left-4 top-8 w-px h-full bg-slate-800" />
```

`v-if` / `v-else` is also what replaced the early `return` in `Button`:

```vue
<a v-if="href" :class="variantClass" :href="href"><slot /></a>
<button v-else :type="type" :disabled="disabled" :class="variantClass"><slot /></button>
```

In React the same logic required two separate `return` statements inside an `if` block.

### Similarities

- Both fully remove the element from the DOM when the condition is false — they do not
  merely hide it.
- Both evaluate an ordinary JavaScript expression as the condition.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Syntax | `&&` / ternary, part of the expression | `v-if` directive on the element |
| Chaining | nested ternaries | readable `v-else-if` / `v-else` chain |
| Placement | wraps the JSX | an attribute on the element itself |
| Multiple branches | early `return`s or nested ternaries | `v-if` / `v-else` on sibling elements |
| `&&` pitfall | `0 && <El/>` renders `0`; falsy values leak into output | no such trap |
| Hide vs remove | manual (`style`/class) | `v-show` toggles CSS `display` instead of unmounting |

Vue adds `v-show`, which has no React equivalent: it keeps the element mounted and only
toggles `display`, which is cheaper for frequent toggling.

---

## 7. Dynamic rendering

### React dynamic rendering

Lists are produced with `Array.prototype.map()`, and each item needs a `key`:

```jsx
// react/src/components/sections/Features.jsx
{features.map((feature) => (
	<FeatureCard
		key={feature.title}
		Icon={feature.icon}
		title={feature.title}
		description={feature.description}
	/>
))}
```

```jsx
// react/src/components/sections/Insights.jsx — with an index
{insights.map((insight, index) => (
	<InsightCard key={insight.title} title={insight.title} index={index} ... />
))}
```

### Vue dynamic rendering

Vue uses the `v-for` directive directly on the element to repeat, with `:key`:

```vue
<!-- vue/src/components/sections/Features.vue -->
<FeatureCard
	v-for="feature in features"
	:key="feature.title"
	:icon="feature.icon"
	:title="feature.title"
	:description="feature.description"
/>
```

```vue
<!-- vue/src/components/sections/Insights.vue — with an index -->
<InsightCard
	v-for="(insight, index) in insights"
	:key="insight.title"
	:title="insight.title"
	:index="index"
	...
/>
```

### Dynamic components

Both projects render a component chosen at runtime. React can use a capitalised variable
directly as a tag; Vue uses the built-in `<component :is>`:

```jsx
// react/src/components/ui/SectionTitle.jsx — dynamic HTML tag
function SectionTitle({ as: Tag = "h2", ... }) {
	return <Tag className={className}>...</Tag>;
}
```

```vue
<!-- vue/src/components/ui/SectionTitle.vue -->
<script setup>
defineProps({ as: { type: String, default: "h2" } });
</script>

<template>
	<component :is="as">
		<slot />
		<span v-if="highlight" :class="highlightClass">{{ highlight }}</span>
	</component>
</template>
```

The same `<component :is>` mechanism renders the Lucide icons stored in the data files.

### Similarities

- Both require a **stable, unique `key`** so the framework can track items across updates.
- Both iterate over ordinary JavaScript arrays.
- Both expose the index as an optional second value.
- Both can render a component determined at runtime.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Mechanism | `.map()` — a real JS method | `v-for` — a directive |
| Syntax | `{arr.map(item => <El key={...} />)}` | `<El v-for="item in arr" :key="..." />` |
| Index | second callback argument | `(item, index) in arr` |
| Nesting | callbacks nest and become noisy | `v-for` on nested elements stays flat |
| Iterating an object | `Object.entries().map()` | `v-for` supports objects natively |
| Range loop | `[...Array(n)].map()` | `v-for="n in 10"` natively |
| Dynamic component | capitalised variable as a tag | `<component :is="x">` |

---

## 8. Forms

This is where the two frameworks diverge the most, and where Vue removed the most code.

### React form management

React uses **controlled components**: every input's `value` is bound to state, and every
keystroke goes through an `onChange` handler that writes the state back. Nothing happens
without that handler.

```jsx
// react/src/components/sections/Contact.jsx
const [formData, setData] = useState({ fullName: "", email: "", message: "" });

function handleChange(e) {
	setData({ ...formData, [e.target.name]: e.target.value });
}

<input
	type="text"
	id="fullName"
	name="fullName"                 // required: handleChange reads e.target.name
	value={formData.fullName}       // state drives the input
	onChange={handleChange}         // input writes back to state
	className={fieldBorderClass(isNameValid)}
/>
```

Submission must cancel the browser's default behaviour explicitly:

```jsx
async function handleSubmit(e) {
	e.preventDefault();
	setIsSending(true);
	setFeedbackMsg("Sending...");
	await new Promise((resolve) => setTimeout(resolve, 1500));
	setData({ fullName: "", email: "", message: "" });
	setFeedbackMsg("Message sent!");
	setIsSending(false);
	...
}

<form onSubmit={handleSubmit}>
```

### Vue form management

`v-model` is **two-way binding**: it expands to a `value` binding plus an input listener,
so the `handleChange` function and the `name` attribute plumbing both disappear:

```vue
<!-- vue/src/components/sections/Contact.vue -->
<script setup>
const formData = reactive({ fullName: "", email: "", message: "" });
</script>

<template>
	<!-- v-model replaces value + onChange + handleChange -->
	<input
		id="fullName"
		v-model="formData.fullName"
		type="text"
		name="fullName"
		:class="fieldBorderClass(isNameValid)"
	/>
</template>
```

`v-model` works uniformly on `<input>`, `<textarea>`, `<select>`, checkboxes and radios —
including cases where React requires different props (`checked` instead of `value` for
checkboxes).

Submission uses an **event modifier** instead of a manual call:

```vue
<form @submit.prevent="handleSubmit">
```

```js
async function handleSubmit() {          // no event argument needed at all
	isSending.value = true;
	feedbackMsg.value = "Sending...";
	await new Promise((resolve) => setTimeout(resolve, 1500));
	formData.fullName = "";
	formData.email = "";
	formData.message = "";
	feedbackMsg.value = "Message sent!";
	isSending.value = false;
	...
}
```

### Validation

Both versions derive validity from the current values; only the caching differs:

```jsx
// React — recomputed on every render
const isNameValid = formData.fullName.trim().length >= 2;
```
```js
// Vue — cached, recomputed only when formData.fullName changes
const isNameValid = computed(() => formData.fullName.trim().length >= 2);
```

The disabled state and conditional styling are then expressed the same way in both:

```jsx
disabled={!isValid || isSending}          // React
```
```vue
:disabled="!isValid || isSending"         <!-- Vue -->
```

### Similarities

- State remains the **single source of truth** for the field values.
- Validation is derived from state, not stored separately.
- Both disable the submit button from the same derived condition.
- Both had to prevent the browser's native form submission.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Binding | one-way + manual handler (`value` + `onChange`) | two-way (`v-model`) |
| Boilerplate per field | `value`, `onChange`, plus a shared handler | a single `v-model` |
| Change handler | mandatory | none needed |
| Prevent default | `e.preventDefault()` inside the handler | `.prevent` modifier on the event |
| Checkboxes / radios | different props (`checked`, `onChange`) | same `v-model` |
| Derived validation | plain `const` | `computed()` |
| Useful extras | — | `v-model.trim`, `v-model.number`, `v-model.lazy` |

The `Contact` component lost its entire `handleChange` function and three `value`/`onChange`
pairs in the migration, with identical behaviour — verified by 11 automated assertions.

---

## 9. Events

### React event handling

Events are camelCase props receiving a function. React wraps native events in a
`SyntheticEvent`:

```jsx
<form onSubmit={handleSubmit}>
<button type="submit" disabled={!isValid || isSending}>Send message</button>
```

Anything beyond calling the handler — stopping propagation, preventing the default, testing
which key was pressed — is done imperatively inside the function:

```jsx
function handleSubmit(e) {
	e.preventDefault();
	...
}
```

### Vue event handling

Events use `v-on`, almost always written with its `@` shorthand:

```vue
<form @submit.prevent="handleSubmit">
```

Vue adds **modifiers**, which move common event plumbing out of the handler and into the
template, where it is visible at a glance:

| Modifier | Replaces |
|---|---|
| `@submit.prevent` | `e.preventDefault()` |
| `@click.stop` | `e.stopPropagation()` |
| `@click.once` | manual "already ran" flag |
| `@keyup.enter` | `if (e.key === "Enter")` |
| `@click.self` | `if (e.target === e.currentTarget)` |

Because of `.prevent`, the Vue `handleSubmit` takes **no parameter at all** — it never
touches the event object.

Child-to-parent communication also differs: React passes a callback down as a prop
(`onClick`), whereas Vue emits an event (`defineEmits` + `$emit`) that the parent listens
to with `@`. This project did not need custom events — but note that in `Button.vue`, a
native `@click` written by a parent still reaches the root element automatically through
attribute fallthrough, so no `onClick` prop was needed either.

### Similarities

- Both attach handlers declaratively in the markup.
- Both give access to the native event object when needed.
- Both use event delegation internally rather than one listener per element.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Syntax | `onClick={fn}` — a prop | `@click="fn"` — a directive |
| Naming | camelCase (`onSubmit`) | lowercase, matches the DOM (`@submit`) |
| Event object | `SyntheticEvent` wrapper | native DOM event |
| Common patterns | imperative code inside the handler | declarative modifiers in the template |
| Inline arguments | `onClick={() => fn(id)}` — new function each render | `@click="fn(id)"` — compiled, no closure churn |
| Child → parent | callback passed down as a prop | `emit` an event, parent listens with `@` |

---

## 10. Project organization

### React project structure

```
react/
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── global.css
    ├── components/
    │   ├── layout/      Header.jsx, Footer.jsx
    │   ├── sections/    Hero, About, Features, Insights, Contact  (.jsx)
    │   ├── ui/          Brand, Button, SectionBadge, SectionTitle,
    │   │                SocialLink, FooterLinkGroup                (.jsx)
    │   └── cards/       FeatureCard, StatCard, InsightCard,
    │                    HighlightCard                              (.jsx)
    ├── data/            features, insights, stats, steps, socials,
    │                    footerLinks, highlights                    (.js)
    └── services/        insightsService.js
```

### Vue project structure

```
vue/
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.js
    ├── App.vue
    ├── global.css
    ├── components/
    │   ├── layout/      Header.vue, Footer.vue
    │   ├── sections/    Hero, About, Features, Insights, Contact  (.vue)
    │   ├── ui/          Brand, Button, SectionBadge, SectionTitle,
    │   │                SocialLink, FooterLinkGroup                (.vue)
    │   └── cards/       FeatureCard, StatCard, InsightCard,
    │                    HighlightCard                              (.vue)
    ├── data/            features, insights, stats, steps, socials,
    │                    footerLinks, highlights                    (.js)
    └── services/        insightsService.js
```

The folder tree is **identical**. The migration was a one-to-one file mapping: 28 source
files in, 28 source files out. Only the extensions changed.

### Entry point

```jsx
// react/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```js
// vue/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.css'

createApp(App).mount('#app')
```

Vue's entry point is shorter: a single `createApp().mount()` chain, no `StrictMode`
wrapper, and no JSX — which is why the file can be `.js` rather than `.jsx`.

The mount target also differs by convention: `#root` in React, `#app` in Vue.

### Data and services layers

These were the easiest parts of the migration: **`data/` and `services/` are plain
JavaScript modules with no framework-specific code**. Five of the seven data files and the
service file were copied unchanged.

The only edits were the two data files importing icons:

```js
// react/src/data/features.js
import { Bot, Workflow, Brain, Database, Wrench, ShieldCheck } from "lucide-react";
```
```js
// vue/src/data/features.js
import { Bot, Workflow, Brain, Database, Wrench, ShieldCheck } from "lucide-vue-next";
```

This is a strong argument for keeping data and business logic **outside** components: that
layer is framework-agnostic and survives a migration untouched.

### Similarities

- Same Vite build tool, same `vite.config.js` shape (only the plugin differs).
- Same Tailwind CSS v4 setup via `@tailwindcss/vite`.
- Same ESLint flat-config format.
- Same `index.html` entry with a single mount `<div>`.
- Same `components/` split into `layout` / `sections` / `ui` / `cards`.
- Same `data/` and `services/` separation.

### Differences

| Aspect | React | Vue |
|---|---|---|
| Vite plugin | `@vitejs/plugin-react` | `@vitejs/plugin-vue` |
| Component files | `.jsx` | `.vue` |
| Entry file | `main.jsx` | `main.js` |
| Mount target | `#root` | `#app` |
| Mount call | `ReactDOM.createRoot(el).render(<App/>)` | `createApp(App).mount('#app')` |
| Import extension | optional | **required** for `.vue` files |
| Icon library | `lucide-react` | `lucide-vue-next` |
| Dev-mode strictness | `<React.StrictMode>` (double-invokes effects) | no equivalent |
| ESLint plugin | `eslint-plugin-react-hooks` | `eslint-plugin-vue` |

---

## 11. AI-assisted migration

### What AI tools were used

**Claude (Opus) through Claude Code**, an agentic CLI that can read and write files in the
repository and run shell commands directly. The workflow was:

1. Read all 28 React source files to build a complete picture before writing any Vue code.
2. Check technical blockers up front (which Lucide icon names actually exist in
   `lucide-vue-next`).
3. Write the Vue files layer by layer: `data/` → `services/` → `ui/` → `cards/` →
   `sections/` → `layout/` → `App.vue` and config.
4. Run `npm run build` and `npm run lint` and fix what failed.
5. **Verify empirically** rather than trusting the output: run both apps side by side and
   compare them automatically.

### What worked well

- **Mechanical, rule-based conversions.** `className` → `class`, `htmlFor` → `for`,
  `.map()` → `v-for`, `&&` → `v-if`, `useState` → `ref`. These are pattern substitutions
  with little ambiguity.
- **Framework-agnostic files.** `data/` and `services/` needed almost no changes.
- **Idiomatic rewrites, not literal translation.** The AI recognised that the React
  `className` prop plumbing in `Button` and `SectionTitle` should become Vue attribute
  fallthrough, and that `handleChange` should disappear into `v-model`, instead of
  transcribing the React patterns literally into Vue.
- **Preserving structure.** Keeping the folder tree and file names 1:1 made the two
  projects easy to compare and review.
- **Automated verification.** The strongest result came from *measuring* equivalence rather
  than eyeballing it: rendering both apps in a headless browser and diffing them pixel by
  pixel produced a hard number (0 differing pixels out of 6,650,880) instead of a vague
  "looks the same".

### What required manual corrections

Several issues were **not** caught by the build, and would have shipped unnoticed without
deliberate checking:

1. **Leftover Vite scaffold CSS silently overrode Tailwind.**
   The default `src/style.css` contained plain rules like `h1 { font-size: 56px }`. Tailwind
   v4 emits its utilities inside `@layer utilities`, and **any CSS outside a layer beats CSS
   inside one**, regardless of specificity or import order. So `class="text-3xl"` had no
   visible effect. The build passed and no error appeared; only inspecting the *computed*
   style revealed the h1 rendering at 56px instead of 30px. Fix: delete `style.css` and keep
   `global.css` as the only stylesheet.

2. **ESLint rejected the component names.**
   `eslint-plugin-vue` enforces `vue/multi-word-component-names`, which failed on nine
   components (`Header`, `Hero`, `About`, `Contact`, `Button`...). Renaming them would have
   broken the 1:1 mapping with the React project, so the rule was disabled explicitly, with
   a comment explaining the reason.

3. **The icon library was not a drop-in replacement.**
   `lucide-vue-next` has `instagram` and `youtube` but **no `tiktok`**, and only the old
   Twitter bird rather than the X logo. Since the React version used Bootstrap Icons for the
   four social links, that dependency was kept so the footer stayed visually identical.
   A naive "replace lucide-react with lucide-vue-next everywhere" would have silently
   dropped an icon.

4. **A misleading production diff that was not a migration bug.**
   Once deployed, the live Vue and React pages differed by 4px in the header. Investigation
   showed the "Enroll now" link was `display:block` in React and `display:inline` in Vue —
   because in the deployed React bundle the link was a direct child of the flex `<ul>`
   (making it a flex item), while in Vue it sat inside an `<li>`. The cause was that the
   **live React build was one commit stale**: it predated the commit that added the `<li>`
   by 12 minutes. The Vue migration matched the *current* React source, which is exactly
   what the local pixel-diff had already proven. Lesson: compare against the current source,
   not against a deployed artifact of unknown vintage.

5. **A deployment assumption that was simply wrong.**
   The initial plan was to publish Vue to a `gh-pages-vue` branch alongside `gh-pages-react`.
   But classic GitHub Pages serves **one branch per repository**, so that branch would never
   have been published. The working setup is a single `gh-pages` branch with React at the
   root and Vue in a `vue/` subfolder, which also required changing Vite's `base` to
   `/holbertonschool-agentic_ai/vue/`.

### Lessons learned

- **A green build proves almost nothing about correctness.** Every one of the issues above
  passed `npm run build`. Compilation checks syntax, not behaviour or appearance.
- **Verify by measuring, not by looking.** Pixel-diffing both apps and scripting the form
  interactions turned "it looks right" into a falsifiable result. It also correctly cleared
  the migration when a real difference appeared in production.
- **Isolate before concluding.** When the odd word-spacing appeared in screenshots, the
  right move was to render the *React* app in the same headless browser. Identical output
  proved it was a font-rendering artifact of the environment, not a migration defect.
- **Migrate idiomatically, not literally.** The best parts of the Vue version are where the
  React pattern was dropped entirely rather than translated — `v-model` replacing
  `handleChange`, attribute fallthrough replacing the `className` prop.
- **Framework-agnostic layers pay off.** `data/` and `services/` survived untouched. The
  more logic lives outside components, the cheaper a framework change becomes.
- **Understand the generated code.** Knowing *why* `@layer` lost to plain CSS, or *why* a
  flex child gets blockified, was necessary to diagnose problems that no tool reported.
  AI accelerates the writing; it does not remove the need to understand the result.

---

## Overall conclusion

React and Vue solve the same problems with the same architecture: a tree of components,
props flowing down, state driving a declarative UI, and lifecycle hooks for side effects.
Migrating between them was mostly a **syntax translation**, and the folder structure did
not change at all.

The real differences are in philosophy:

- **React stays closer to plain JavaScript.** JSX is JavaScript, `.map()` is a real method,
  conditionals are real operators. The cost is more manual work — memoisation, dependency
  arrays, form handlers — and more room for subtle mistakes.
- **Vue provides more built-in structure.** Directives, `v-model`, computed caching and
  named lifecycle hooks handle common cases directly. The cost is a vocabulary to learn and
  less freedom inside the template.

For this project — a content-driven landing page with one form — Vue produced measurably
less code for identical behaviour, mainly through `v-model`, `computed` and attribute
fallthrough. On a page needing markup generated programmatically, JSX's flexibility would
have counted for more.
