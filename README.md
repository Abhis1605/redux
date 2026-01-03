Redux Toolkit (RTK) — Conceptual Guide 🧠

This document explains Redux Toolkit from a usage and decision-making perspective, not from a project-specific implementation.

It focuses on:

Why Redux Toolkit exists

How it is meant to be used

Why patterns are structured the way they are

When to use JavaScript vs TypeScript

When Redux is the right tool — and when it is not

This guide is ideal for:

Beginners learning Redux

Developers confused about “why Redux works like this”

Interview preparation

Using Redux correctly in real-world projects

1️⃣ What Problem Redux Solves

In React, state usually starts simple.

At first, you manage state with:

useState

Passing props to children

As apps grow, problems appear:

Same state needed in many components

Props drilling becomes messy

Updates become hard to trace

Bugs become unpredictable

Redux solves this by:

Keeping state in one central place

Making updates explicit and predictable

Separating state logic from UI components

Redux is about control and predictability, not convenience.

2️⃣ Why Redux Toolkit Exists

Redux Toolkit exists because classic Redux was too hard to use correctly.

Problems with traditional Redux:

Too much boilerplate

Many files for simple logic

Easy to make mistakes with immutability

Hard for beginners to follow best practices

Redux Toolkit was created to:

Enforce best practices by default

Reduce boilerplate

Make Redux easier and safer to use

Prevent common mistakes automatically

👉 Redux Toolkit is not optional — it is the modern Redux.

3️⃣ How Redux Toolkit Is Meant to Be Used

Redux Toolkit is designed around features, not files.

Instead of:

Actions folder

Reducers folder

Constants folder

RTK encourages:

Grouping related logic together

Thinking in terms of features

Keeping reducers, actions, and state close

This makes code:

Easier to understand

Easier to maintain

Easier to scale

4️⃣ The Core Mental Model of Redux Toolkit

Redux Toolkit is built around five core ideas:

🧠 1. Single Source of Truth

There is one store for the entire application.

Why?

Easier debugging

Clear data flow

Predictable behavior

🧠 2. State Is Updated Through Actions

State is never changed directly.

Instead:

You describe what happened

Redux decides how state changes

This makes changes:

Traceable

Debuggable

Testable

🧠 3. Reducers Describe State Changes

Reducers answer one question:

“Given the previous state and an action, what is the next state?”

Redux Toolkit uses Immer, so you:

Write simple, readable code

Still get immutability guarantees

This is why reducers in RTK look “mutable” but are safe.

🧠 4. Slices Represent Features

A slice is not just code structure — it’s a design concept.

A slice represents:

One feature

One responsibility

One part of the state

This prevents:

Giant reducers

God files

Tangled logic

🧠 5. Async Logic Is Explicit

Async logic (API calls, side effects) is separated from UI.

Why?

UI stays clean

Side effects are predictable

Errors and loading states are manageable

This is why createAsyncThunk exists.

5️⃣ Why Redux Toolkit Uses dispatch

Redux does not allow components to change state directly.

Instead:

Components dispatch events

Reducers handle updates

Why this matters:

Clear flow of data

Easier debugging

Redux DevTools can replay actions

Dispatching actions is like sending commands, not mutating data.

6️⃣ Why Selectors Exist

Components should:

Ask for data

Not care how it is stored

Selectors:

Extract data from the store

Decouple components from state shape

Improve maintainability

This allows you to:

Change state structure later

Without breaking components

7️⃣ JavaScript vs TypeScript — When to Use Which
✅ JavaScript Redux Toolkit

Use JavaScript when:

App is small

Team is not familiar with TypeScript

Speed matters more than safety

Learning Redux basics

Pros:

Less setup

Faster to start

Cons:

No compile-time safety

Runtime bugs are easier to introduce

✅ TypeScript Redux Toolkit

Use TypeScript when:

App is medium or large

State shape is complex

Team collaboration is involved

Long-term maintenance matters

Pros:

Strong type safety

Better editor support

Fewer runtime bugs

Self-documenting code

Redux Toolkit + TypeScript is industry standard.

8️⃣ When Redux Is the RIGHT Choice

Redux Toolkit is a good choice when:

State is shared across many screens

Business logic is complex

Data must persist across routes

Predictability is critical

Redux shines in scalable applications.

9️⃣ When Redux Is the WRONG Choice

Do NOT use Redux when:

State is local to one component

UI-only state (modals, inputs)

Simple forms or toggles

Small demo projects

Using Redux everywhere is overengineering.

🔟 Common Misunderstandings

❌ “Redux replaces useState”
✅ Redux complements useState

❌ “Redux is only for big apps”
✅ Redux is for complex state

❌ “Redux Toolkit hides Redux”
✅ Redux Toolkit enforces correct Redux usage

🎯 Key Takeaways

Redux Toolkit is the modern, official Redux

It exists to prevent mistakes and boilerplate

Think in terms of features and events

Use Redux only when it solves a real problem

Combine Redux with TypeScript for scalability
1️⃣ Store
🔹 What is the Store?

The store is the central place where all application state lives.

Think of it as:

“The brain of the application”

🔹 When to Create a Store?

When state is shared across multiple components

When you need predictable updates

🔹 JavaScript Store Example
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

🔹 Why This Way?

configureStore sets up everything correctly

Combines reducers

Enables Redux DevTools automatically

🔹 TypeScript Store Example
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

🔹 Why Types?

RootState → type-safe state access

AppDispatch → type-safe dispatch

2️⃣ Slice (State + Reducer + Action)
🔹 What is a Slice?

A slice represents one feature of your app.

Example:

Counter

Auth

Habits

Cart

🔹 When to Create a Slice?

For each independent feature

One slice = one responsibility

🔹 JavaScript Slice Example
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;

🔹 Why This Structure?

createSlice removes boilerplate

Actions and reducers stay together

Easier to maintain

🔹 TypeScript Slice Example
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    addByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, addByAmount } = counterSlice.actions;
export default counterSlice.reducer;

🔹 Why PayloadAction?

Ensures correct data type

Prevents wrong payload usage

3️⃣ Reducer
🔹 What is a Reducer?

A reducer describes how state changes.

It answers:

“Given the current state and an action, what should the next state be?”

🔹 Why Reducers Look Mutable in RTK?
state.value += 1;


This looks mutable but is safe because:

Redux Toolkit uses Immer

Immer creates immutable updates internally

👉 This reduces bugs and complexity.

4️⃣ Actions
🔹 What is an Action?

An action describes what happened, not how state changes.

Example:

increment

addHabit

loginSuccess

🔹 When to Create Actions?

Whenever user interaction or event changes state

🔹 Why RTK Auto-Creates Actions?
export const { increment } = counterSlice.actions;


Why?

No manual action types

No string constants

Fewer bugs

5️⃣ Dispatch
🔹 What is Dispatch?

dispatch is how components send actions to Redux.

Think of it as:

“Send a message to update state”

🔹 When to Use Dispatch?

Button click

Form submit

API response

User interaction

🔹 JavaScript Dispatch Example
const dispatch = useDispatch();
dispatch(increment());

🔹 TypeScript Dispatch Example (Best Practice)
const dispatch = useAppDispatch();
dispatch(addByAmount(5));

🔹 Why Typed Dispatch?

Prevents wrong action usage

Better editor suggestions

6️⃣ Selector
🔹 What is a Selector?

A selector reads data from the store.

Components should:

Read data

NOT know how state is structured internally

🔹 When to Use Selectors?

Every time you read Redux state

🔹 JavaScript Selector Example
const count = useSelector(state => state.counter.value);

🔹 TypeScript Selector Example
const count = useAppSelector(state => state.counter.value);

🔹 Why Typed Selectors?

Type-safe access

Prevents wrong state usage

7️⃣ Provider
🔹 Why Provider Is Needed?

Redux store must be available to all components.

🔹 When to Use Provider?

Once, at the root of the app

🔹 Example
<Provider store={store}>
  <App />
</Provider>

8️⃣ What Goes Where (Decision Guide)
Thing	Write When
Store	App needs global state
Slice	Feature needs state
Reducer	State must change
Action	Event happens
Dispatch	UI triggers change
Selector	UI reads state
9️⃣ Common Beginner Mistakes

❌ Putting form input state in Redux
❌ One giant slice for everything
❌ Mutating state outside reducers
❌ Using Redux for UI-only state
1️⃣ What Is an Async Thunk?

An async thunk is a Redux Toolkit function used to:

Call APIs

Perform async work

Dispatch results to reducers

Think of it as:

“A controlled way to handle async logic outside components.”

2️⃣ Why Async Logic Should NOT Be in Components

❌ Bad pattern:

useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => setState(data));
}, []);


Problems:

Logic tied to UI

Hard to reuse

Hard to test

No global loading/error control

3️⃣ Why Redux Toolkit Uses createAsyncThunk

Redux Toolkit introduced createAsyncThunk to:

Standardize async patterns

Automatically handle loading states

Automatically dispatch lifecycle actions

Keep components clean

Async thunks separate:

Side effects (API calls)

State updates (reducers)

4️⃣ When Should You Use Async Thunks?
✅ Use Async Thunks When:

Fetching data from an API

Posting data to a server

Handling async business logic

Multiple components need the same async data

❌ Do NOT Use Async Thunks When:

Async logic is local to one component

Simple useEffect + useState is enough

UI-only side effects

5️⃣ Async Thunk Lifecycle (Very Important)

Every async thunk automatically creates three actions:

pending → request started

fulfilled → request successful

rejected → request failed

You do not write these actions yourself.

Redux Toolkit does this for you.

6️⃣ Basic Async Thunk Example (JavaScript)
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("/api/users");
    return response.json();
  }
);

🧠 What Is Happening?

"users/fetchUsers" → action type prefix

async () => {} → async logic

return → becomes action.payload in reducers

7️⃣ Handling Async Thunk in Slice (JavaScript)
const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

🧠 Why extraReducers?

Async actions are external to the slice

They are handled in addition to normal reducers

8️⃣ Async Thunk Example (TypeScript)
import { createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

export const fetchUsers = createAsyncThunk<
  User[],        // return type
  void,          // argument type
  { rejectValue: string }
>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users");
      return await res.json();
    } catch {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

🧠 Why Types Matter?

Prevents wrong API responses

Safer reducer logic

Better editor support

9️⃣ Handling Async Thunk in Slice (TypeScript)
extraReducers: builder => {
  builder
    .addCase(fetchUsers.pending, state => {
      state.loading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Unknown error";
    });
}

🔟 Dispatching Async Thunks

Async thunks are dispatched just like normal actions.

dispatch(fetchUsers());


Redux Toolkit handles:

Promise lifecycle

State updates

Error handling

1️⃣1️⃣ How Data Flows (Mental Model)
UI → dispatch(fetchUsers)
   → pending → loading = true
   → API call
   → fulfilled → data stored
   → UI re-renders


This flow is:

Predictable

Debuggable

Replayable in Redux DevTools

1️⃣2️⃣ Common Mistakes

❌ Putting async logic inside reducers
❌ Calling APIs directly in components
❌ Not handling rejected state
❌ Storing loading state in components

1️⃣3️⃣ Async Thunk vs useEffect
useEffect	Async Thunk
Component-level	App-level
Hard to reuse	Reusable
Hard to test	Easy to test
No global state	Global state
1️⃣4️⃣ When NOT to Use Async Thunks

Small components

One-time local API calls

UI-only async logic

In those cases:

useEffect + useState


is perfectly fine.

🎯 Key Takeaways

Async thunks manage side effects

They keep components clean

Redux Toolkit handles lifecycle automatically

Best for shared async state

Combine with TypeScript for safety

