# TaskFlow — Feature Documentation

Complete documentation of every feature in the TaskFlow application.

---

## 1. Dashboard

The Dashboard is the primary view of the application, accessible at `/`.

### Statistics Cards

Four real-time metric cards are displayed at the top of the dashboard:

| Card | Description |
|------|-------------|
| **Total Tasks** | Count of all todos in the database |
| **Completed** | Count of todos with `completed: true` |
| **Pending** | Count of todos with `completed: false` |
| **High Priority** | Count of HIGH priority todos that are not yet completed |

Stats update instantly after every create, update, delete, or toggle action — no page refresh required.

### Todo Grid

Todos are displayed in a responsive grid:
- **Mobile**: 1 column
- **Tablet** (sm): 2 columns
- **Desktop** (lg): 3 columns

Each todo card shows: title, description preview, priority badge, category, due date, created date, completion status, and all action buttons.

---

## 2. Search

- **Trigger**: Type in the search bar in the toolbar area
- **Scope**: Searches across `title`, `description`, and `category` fields simultaneously
- **Behavior**: Client-side filtering — instant results with no API call
- **Clear**: An `×` button appears when there is an active search query
- **Empty state**: Shows a contextual message when no results match the query

---

## 3. Filter Tabs

Three filter tabs are shown next to the search bar:

| Tab | Shows |
|-----|-------|
| **All** | Every todo regardless of status |
| **Active** | Only todos with `completed: false` |
| **Completed** | Only todos with `completed: true` |

Each tab shows a live count badge that updates with the current data. Filters combine with the active search query — you can search within a filter.

---

## 4. CRUD Operations

### Create

- Click **New Task** (top right) or **Create your first task** (empty state)
- A modal form slides up with fields: Title, Description, Priority, Category, Due Date
- **Validation**: Title is required; all others are optional
- **Success**: Toast notification + new card appears instantly at the top of the grid
- **Error**: Toast notification with the error message

### Read (List)

- All todos are fetched on page load via `GET /api/todos`
- Sorted by newest first
- Stats are computed from the fetched data

### Read (Detail)

- Click the **eye icon** or the **title** of any todo card
- Navigates to `/todo/:id`
- Fetches the specific todo via `GET /api/todos/:id`
- Displays full information including all timestamps

### Update

- Click the **pencil icon** on any card or the **Edit** button on the details page
- Pre-populates the same form modal with existing data
- Submit saves only the changed fields
- **Success**: Toast notification + card updates in-place (no refetch)

### Delete

- Click the **trash icon** on any card or the **Delete** button on the details page
- A confirmation modal appears with the task title
- Confirming deletes the record and removes it from the UI
- From the details page: redirects back to Dashboard after deletion

---

## 5. Priority Management

Three priority levels with distinct visual treatment:

| Priority | Badge Color | Use Case |
|----------|-------------|----------|
| **HIGH** | Red | Critical, time-sensitive tasks |
| **MEDIUM** | Amber | Normal priority work (default) |
| **LOW** | Slate | Nice-to-have, low urgency |

Priority is set during creation and can be changed via the edit form. The High Priority stat card counts only **incomplete** HIGH priority todos to reflect actual workload.

---

## 6. Due Dates

- **Optional field** — can be left empty
- Displayed on todo cards and the details page
- **Overdue detection**: If the due date is in the past and the todo is not completed:
  - Card border turns red-tinted
  - "Overdue · [date]" label with a warning icon replaces the normal date
  - Details page shows a red `OVERDUE` prefix
- Completing a todo removes overdue styling regardless of due date

---

## 7. Completion Tracking

- **Toggle**: Checkbox circle on each card, or the **Mark Done / Mark Active** button on the details page
- **completedAt**: Automatically recorded in the database when `completed` transitions to `true`
  - Cleared to `null` when the task is marked active again
- **Display**: Completed tasks are shown with:
  - Strikethrough title
  - Reduced opacity (0.65)
  - Green left accent stripe
  - "Completed On" timestamp on the details page

---

## 8. Toast Notifications

Powered by `react-hot-toast`, styled to match the dark glassmorphism theme.

| Action | Toast |
|--------|-------|
| Create todo | ✅ "Task created successfully!" |
| Update todo | ✅ "Task updated successfully!" |
| Delete todo | ✅ "Task deleted." |
| Mark complete | ✅ "✓ Marked as completed!" |
| Mark active | ✅ "Moved back to active." |
| Any API error | ❌ Error message from the API |

Loading toasts (`⟳ Creating task...`, `⟳ Updating task...`, `⟳ Deleting task...`) are shown during API calls and replaced by the success or error toast when resolved.

---

## 9. Todo Details Page

Route: `/todo/:id`

Displays complete information about a single task:

| Field | Display |
|-------|---------|
| Title | Large heading, strikethrough if completed |
| Status badge | "Completed" (green) or "Active" (indigo) pill |
| Description | Full text below title |
| Priority | Colored badge (same as card) |
| Category | Indigo pill tag |
| Due Date | Formatted date, red + "OVERDUE" if past due |
| Completed On | Formatted date + time (only if completed) |
| Created | Formatted date + time |
| Last Updated | Formatted date + time |

### Page Actions

- **Back** → Returns to Dashboard
- **Mark Done / Mark Active** → Toggle completion without leaving the page
- **Edit** → Opens the edit modal inline
- **Delete** → Opens confirm modal, then redirects to Dashboard

### Color Accent Header

A 4px gradient stripe at the top of the card indicates status:
- **Indigo/purple** → Active task
- **Emerald/green** → Completed task
- **Red** → Overdue task

---

## 10. Loading States

### Dashboard Loading

A full loading skeleton renders while the initial API call is in progress:
- 4 stats card skeletons
- 6 todo card skeletons matching exact card proportions
- Shimmer animation runs continuously

### Details Page Loading

An inline skeleton renders within the details page layout while the single todo is being fetched.

No spinner is shown — shimmer skeletons are used everywhere for a premium feel.

---

## 11. Error Handling

### Frontend

| Scenario | Behavior |
|----------|---------|
| Initial load fails | Full-page error UI with "Try Again" button |
| Details page not found | Error UI with "Back to Tasks" and "Retry" buttons |
| Any mutation fails | Error toast with message from API |
| Network timeout | Caught by Axios interceptor → error toast |

### Backend

| Scenario | HTTP Code | Response |
|----------|-----------|---------|
| Missing title | `400` | `{ success: false, message: "Title is required..." }` |
| Invalid priority | `400` | `{ success: false, message: "Priority must be one of..." }` |
| ID not found | `404` | `{ success: false, message: "Todo with ID ... was not found." }` |
| Unexpected error | `500` | `{ success: false, message: "An unexpected error occurred." }` |
| Invalid route | `404` | `{ success: false, message: "Route ... not found." }` |

---

## 12. Responsive Design

Breakpoints follow Tailwind CSS conventions:

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | `< 640px` | 1-column grid, stacked toolbar |
| Tablet | `≥ 640px` | 2-column todo grid, inline toolbar |
| Desktop | `≥ 1024px` | 3-column todo grid, 4-column stats |

- The Navbar is sticky and uses backdrop blur on scroll
- Modals are full-height scrollable on very small screens
- All buttons and inputs meet minimum touch target sizes

---

## 13. PostgreSQL Persistence (via Prisma + Neon)

- **Database**: Neon serverless PostgreSQL — connection pooled, SSL enforced
- **ORM**: Prisma with generated type-safe client
- **Migrations**: Tracked via `prisma/migrations/` directory
- **Seed**: `prisma/seed.js` seeds 7 realistic todos for demo purposes
- **Singleton client**: Prevents multiple Prisma Client instances in development hot-reload scenarios
- **Error mapping**: Prisma error codes (`P2025`, `P2002`) are mapped to human-readable HTTP responses in the centralized error handler
