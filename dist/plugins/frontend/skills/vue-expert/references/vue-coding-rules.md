# Vue Coding Rules

## Core Vue.js Development Rules

### Code Organization (STRICT)
```
resources/js/
├── components/
│   ├── automation/          # ALWAYS group by feature
│   ├── company/             # ALWAYS separate by domain
│   ├── contact/             # ALWAYS organize by business area
│   ├── project/             # ALWAYS group related components
│   ├── shared/              # ALWAYS create shared components
│   ├── settings/            # ALWAYS separate settings components
│   └── lists/               # ALWAYS group by functionality
├── utils/                   # ALWAYS create utility functions
├── mixins/                  # ALWAYS create reusable mixins
└── spark-components/        # ALWAYS separate third-party extensions
```

### Vue.js 2.x Standards (ALWAYS ENFORCE)
- ALWAYS use Single File Components (.vue files)
- ALWAYS use PascalCase for component names
- ALWAYS use kebab-case for component file names
- ALWAYS implement proper component structure
- ALWAYS use scoped styles to prevent CSS conflicts
- ALWAYS validate props with proper types

### Blade Template Integration (CRITICAL)
- ALWAYS embed Vue components within Blade templates (not SPA)
- ALWAYS pass Laravel data to Vue components via props
- ALWAYS use json_encode() for complex data structures
- ALWAYS use proper boolean conversion for Laravel booleans
- ALWAYS extend Spark layouts for consistent structure

### Laravel Data Passing (MANDATORY)
- ALWAYS pass complex objects with json_encode
- ALWAYS convert Laravel booleans properly
- ALWAYS pass user and team context
- ALWAYS pass helper function results

### Laravel-Vue Data Handling (REQUIRED)
- ALWAYS handle Laravel boolean strings in Vue
- ALWAYS use helper functions for common Laravel data
- ALWAYS access Laravel helper data properly
- ALWAYS format data using Laravel masks/symbols

### Component Structure (MANDATORY TEMPLATE)
- ALWAYS use semantic HTML
- ALWAYS add loading states
- ALWAYS handle empty states
- ALWAYS use v-for with :key
- ALWAYS provide component name
- ALWAYS register local components
- ALWAYS validate props from Blade templates
- ALWAYS initialize reactive data
- ALWAYS use computed for derived data
- ALWAYS use watchers for side effects
- ALWAYS initialize component state
- ALWAYS fetch initial data
- ALWAYS implement error handling
- ALWAYS cleanup resources

### Performance Rules (CRITICAL)
- ALWAYS use `v-show` for frequently toggled elements
- ALWAYS use `v-if` for conditionally rendered elements
- ALWAYS implement pagination for large datasets
- ALWAYS debounce search inputs and API calls (500-800ms delay)
- ALWAYS lazy load large components with dynamic imports
- ALWAYS use `keep-alive` for expensive components that switch frequently
- ALWAYS cancel previous API requests when making new ones
- ALWAYS optimize bundle size with code splitting

### Bootstrap Vue Integration (MANDATORY)
- ALWAYS use Bootstrap Vue components instead of plain HTML
- ALWAYS use Bootstrap Vue's grid system
- ALWAYS implement responsive design
- ALWAYS use Bootstrap Vue's form components
- ALWAYS use Bootstrap Vue's modal and toast components

### Event Handling (STRICT RULES)
- ALWAYS use kebab-case for custom events
- ALWAYS emit events for parent communication
- ALWAYS provide event payload with meaningful data
- ALWAYS document custom events in component comments
- ALWAYS prevent default behavior when needed

### State Management (REQUIRED)
- ALWAYS use component data for local state
- ALWAYS use props for parent-child data flow
- ALWAYS use events for child-parent communication
- ALWAYS use provide/inject for deep component trees
- ALWAYS implement proper reactivity

### Accessibility (REQUIRED)
- ALWAYS add proper ARIA labels
- ALWAYS implement keyboard navigation
- ALWAYS provide alt text for images
- ALWAYS use semantic HTML elements
- ALWAYS ensure proper color contrast

### Testing Requirements (MANDATORY)
- ALWAYS write unit tests for components
- ALWAYS test component props and events
- ALWAYS mock API calls in tests
- ALWAYS test user interactions
- ALWAYS test error scenarios

### Security Rules (NON-NEGOTIABLE)
- ALWAYS sanitize user input before display
- ALWAYS validate data from APIs
- ALWAYS use HTTPS for all API calls
- ALWAYS implement proper CSRF protection
- ALWAYS avoid storing sensitive data in localStorage

---

## Vue.js Component Patterns

### Component Structure (MANDATORY TEMPLATE)
```vue
<template>
  <div class="component-name">
    <!-- ALWAYS use semantic HTML -->
    <!-- ALWAYS add loading states -->
    <div v-if="loading" class="loading-spinner">
      <i class="fa fa-spinner fa-spin"></i> Loading...
    </div>

    <!-- ALWAYS handle empty states -->
    <div v-else-if="!items.length" class="empty-state">
      No items found
    </div>

    <!-- ALWAYS use v-for with :key -->
    <div v-else>
      <div v-for="item in items" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentName', // ALWAYS provide component name

  components: {
    // ALWAYS register local components
  },

  props: {
    // ALWAYS validate props from Blade templates
    user: {
      type: Object,
      required: true
    },
    team: {
      type: Object,
      required: true
    },
    canEdit: {
      type: [Boolean, String],
      default: false
    },
    canDelete: {
      type: [Boolean, String],
      default: false
    },
    userRole: {
      type: String,
      required: true
    },
    fieldLabels: {
      type: Object,
      default: () => ({})
    },
    masks: {
      type: Object,
      default: () => ({})
    },
    symbols: {
      type: Object,
      default: () => ({})
    },
    // ALWAYS add specific component props
    data: {
      type: [Object, Array],
      default: () => ({})
    }
  },

  data() {
    return {
      // ALWAYS initialize reactive data
      items: [],
      loading: false,
      error: null
    }
  },

  computed: {
    // ALWAYS use computed for derived data
    filteredItems() {
      return this.items.filter(item => item.active);
    }
  },

  watch: {
    // ALWAYS use watchers for side effects
    '$route'(to, from) {
      this.fetchData();
    }
  },

  created() {
    // ALWAYS initialize component state
  },

  mounted() {
    // ALWAYS fetch initial data
    this.fetchData();
  },

  methods: {
    // ALWAYS implement error handling
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$http.get('/api/data');
        this.items = response.data.data;
      } catch (error) {
        this.error = 'Failed to load data';
        this.$toast.error(this.error);
        console.error('Fetch error:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  destroyed() {
    // ALWAYS cleanup resources
  }
}
</script>

<style scoped>
/* ALWAYS use scoped styles */
.component-name {
  /* ALWAYS follow BEM methodology */
}

.loading-spinner {
  text-align: center;
  padding: 20px;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px 20px;
}
</style>
```

### Laravel-Vue Data Handling (REQUIRED)
```javascript
// ALWAYS handle Laravel boolean strings in Vue
export default {
  computed: {
    // ALWAYS convert string booleans from Laravel
    canEditBoolean() {
      return this.canEdit === true || this.canEdit === 'true';
    },

    canDeleteBoolean() {
      return this.canDelete === true || this.canDelete === 'true';
    }
  },

  methods: {
    // ALWAYS use helper functions for common Laravel data
    hasPermission(permission) {
      return this.userRole === 'owner' || this.userRole === 'admin' ||
             this.team.permissions?.includes(permission);
    },

    // ALWAYS access Laravel helper data properly
    getFieldLabel(field) {
      return this.fieldLabels[field] || field;
    },

    // ALWAYS format data using Laravel masks/symbols
    formatCurrency(amount) {
      return this.symbols.currency + amount.toFixed(2);
    }
  }
}
```

### Computed Properties Optimization (CRITICAL)
```javascript
// ALWAYS use computed for expensive operations
export default {
  computed: {
    // ALWAYS cache expensive filtering/mapping operations
    computedFollowUpFieldsOptions() {
      return this.followUpFieldsOptions.map(group => ({
        label: group.label,
        options: group.options.map(option => ({
          value: {
            value: option.value,
            label: option.label,
            object_type: option.object_type,
            is_custom_field: option.is_custom_field ?? 0,
            fieldType: option.fieldType ?? null,
            dropdownOptions: this.getDropdownOptionsForComputed(option),
          },
          label: option.label,
          disabled: this.isFieldDisabled(this.fieldMappingData, option),
        }))
      }));
    },

    // ALWAYS use computed for derived state
    filteredItems() {
      return this.items.filter(item => item.active);
    }
  }
}
```

### Event Bus Pattern (REQUIRED)
```javascript
// ALWAYS use event bus for cross-component communication
export default {
  mounted() {
    // ALWAYS listen to bus events
    Bus.$on('vistaConnectionDataChanged', data => {
      this.vistaProjectConnectionData = data;
    });
  },

  beforeDestroy() {
    // ALWAYS clean up event listeners
    Bus.$off('vistaConnectionDataChanged');
  },

  methods: {
    updateData() {
      // ALWAYS emit events for other components
      Bus.$emit('dataUpdated', this.newData);
    }
  }
}
```

### Lifecycle Management (MANDATORY)
```javascript
// ALWAYS clean up resources in beforeDestroy
export default {
  mounted() {
    // ALWAYS add event listeners
    document.addEventListener('click', this.handleClickOutside);

    // ALWAYS initialize tooltips/plugins
    $('[data-toggle="tooltip"]').tooltip();
  },

  beforeDestroy() {
    // ALWAYS remove event listeners
    document.removeEventListener('click', this.handleClickOutside);

    // ALWAYS clean up intervals/timeouts
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

### Mixins Pattern (REQUIRED)
```javascript
// ALWAYS create mixins for common functionality
// resources/js/components/lists/mixin.js
export default {
  data() {
    return {
      uri: ''
    };
  },

  methods: {
    saveList(form) {
      form = this.filterCustomFields(form);
      // Common save logic
    },

    filterCustomFields(form) {
      // Common filtering logic
      return form;
    }
  }
}

// ALWAYS use mixins in components
import Mixin from './mixin';

export default {
  mixins: [Mixin],
  // Component-specific logic
}
```

### Global Component Registration (REQUIRED)
```javascript
// ALWAYS auto-register components globally in app.js
const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
  Vue.component(
    key
      .split("/")
      .pop()
      .split(".")[0],
    files(key).default
  )
);

// ALWAYS add global prototype methods
Vue.prototype.flash = (text, type) => {
  Bus.$emit("flash-message", { text, type: type || "success" });
};

Vue.prototype.getSafe = (fn) => {
  try {
    return fn();
  } catch (error) {
    return "";
  }
};
```

---

## Vue.js Forms and API Integration

### Form Handling (REQUIRED)
```javascript
// ALWAYS use this form handling pattern
export default {
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      errors: {},
      loading: false
    }
  },

  methods: {
    // ALWAYS validate forms
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'Name is required';
      }

      if (!this.form.email) {
        this.errors.email = 'Email is required';
      }

      return Object.keys(this.errors).length === 0;
    },

    // ALWAYS handle form submission
    async onSubmit() {
      if (!this.validateForm()) {
        return;
      }

      this.loading = true;

      try {
        await this.apiCall('/api/submit', {
          method: 'POST',
          data: this.form
        });

        this.$toast.success('Form submitted successfully');
        this.resetForm();
      } catch (error) {
        // Handle validation errors from backend
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors || {};
        }
      } finally {
        this.loading = false;
      }
    },

    // ALWAYS provide form reset
    resetForm() {
      this.form = {
        name: '',
        email: ''
      };
      this.errors = {};
    },

    // ALWAYS provide field state helpers
    getFieldState(field) {
      return this.errors[field] ? false : null;
    },

    getFieldError(field) {
      return this.errors[field] ? this.errors[field][0] || this.errors[field] : '';
    }
  }
}
```

### Bootstrap Vue Form Integration (MANDATORY)
```vue
<template>
  <!-- ALWAYS use Bootstrap Vue components -->
  <b-container>
    <b-row>
      <b-col cols="12" md="8">
        <b-form @submit.prevent="onSubmit">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              :state="getFieldState('name')"
              required
            />
            <b-form-invalid-feedback>
              {{ getFieldError('name') }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="loading">
            <b-spinner v-if="loading" small class="mr-2" />
            Submit
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
```

### API Integration (REQUIRED PATTERN)
```javascript
// ALWAYS use this API service pattern
export default {
  methods: {
    async apiCall(endpoint, options = {}) {
      try {
        // ALWAYS show loading state
        this.loading = true;

        // ALWAYS include tenant headers
        const config = {
          headers: {
            'X-Tenant-ID': window.Laravel.team_id,
            'X-User-ID': window.Laravel.user_id,
            ...options.headers
          },
          ...options
        };

        const response = await axios.get(endpoint, config);

        // ALWAYS handle API response format
        if (response.data.success) {
          return response.data.data;
        } else {
          throw new Error(response.data.message || 'API call failed');
        }
      } catch (error) {
        // ALWAYS handle errors gracefully
        const message = error.response?.data?.message || error.message || 'Request failed';
        this.$toast.error(message);
        console.error('API Error:', error);
        throw error;
      } finally {
        // ALWAYS hide loading state
        this.loading = false;
      }
    }
  }
}
```

### Error Handling (MANDATORY)
```javascript
// ALWAYS implement global error handling
export default {
  methods: {
    handleError(error, context = '') {
      // ALWAYS log errors
      console.error(`Error in ${context}:`, error);

      // ALWAYS show user-friendly messages
      const message = this.getErrorMessage(error);
      this.$toast.error(message);

      // ALWAYS report critical errors
      if (error.status >= 500) {
        this.reportError(error, context);
      }
    },

    getErrorMessage(error) {
      // ALWAYS provide fallback messages
      if (error.response?.data?.message) {
        return error.response.data.message;
      }

      if (error.message) {
        return error.message;
      }

      return 'An unexpected error occurred';
    }
  }
}
```

### Event Handling (STRICT RULES)
```javascript
// ALWAYS use this event pattern
methods: {
  onItemClick(item) {
    // ALWAYS emit custom events
    this.$emit('item-selected', {
      item: item,
      timestamp: Date.now(),
      source: 'user-click'
    });
  },

  onFormSubmit(event) {
    // ALWAYS prevent default when needed
    event.preventDefault();

    // ALWAYS validate before emitting
    if (this.validateForm()) {
      this.$emit('form-submitted', this.form);
    }
  }
}
```

---

## Frontend Vue Naming and Style Conventions

### Frontend Stack
- Framework: **Vue 2**
- Style: **Options API** (no Composition API)
- Vue components live under `resources/js/components` and are mounted in Blade templates.

### Naming Conventions
- **Variables/constants**: must have **meaningful names**.
  - Avoid single letters like `r`, `i`, `e`.
  - Use descriptive names like `responseData`, `projectId`, `isVisible`.
- **Methods**: must be **UpperCamelCase** (e.g., `LoadProjects`, `HandleSubmit`).
- **Data properties**: must be **UpperCamelCase** (e.g., `ProjectName`, `CompanyList`).
- **Props**: use **camelCase** when declared in Vue, but kebab-case in templates (`<my-component :project-name="ProjectName" />`).

### Options API Only
- Use `data()`, `methods`, `computed`, `watch`.
- Do not use Vue 3 Composition API (`setup()`, `ref`, `reactive`, etc.).

### Axios & State
- Axios requests handled in methods (e.g., `LoadProjects`) with clear naming.
- Errors caught and assigned to meaningful data props (`ErrorMessage`, not `err`).
- Local component state only, unless explicitly shared via event bus/Vuex.

### Components & Events
- **Filenames**: kebab-case (e.g., `project-list.vue`)
- **Tags in templates**: kebab-case (e.g., `<project-list />`)
- **Props**: declare in JS as camelCase, use in templates as kebab-case (`projectId` -> `:project-id`)
- **Custom events**: emit and listen in **kebab-case** (`'project-updated'`, `'project-live'`)
- **Event handlers (methods)**: **UpperCamelCase** (e.g., `HandleProjectUpdated`)

---

## Vue.js Frontend Development Rules

### Quick Reference

#### Essential Patterns
- Use Single File Components (.vue files) with proper structure
- Implement Blade + Vue integration with json_encode for data passing
- Handle Laravel boolean strings properly in Vue components
- Use Bootstrap Vue components for consistent UI
- Implement proper error handling and loading states
- Use computed properties for expensive operations
- Implement pagination and lazy loading for performance
- Use event bus for cross-component communication
- Follow proper lifecycle management and cleanup

#### File Organization
```
resources/js/
├── components/          # Vue components organized by feature
├── utils/              # Utility functions and helpers
├── mixins/             # Reusable component mixins
└── app.js              # Main application entry point

resources/views/
└── [feature]/          # Blade templates with Vue component integration
```

#### Key Integration Points
- Pass Laravel data via props with proper boolean conversion
- Use team/tenant context for multi-tenant applications
- Implement proper permission handling
- Use helper functions for common data formatting
- Handle API responses consistently

For detailed rules and examples, refer to the specific rule files based on your current development context.
