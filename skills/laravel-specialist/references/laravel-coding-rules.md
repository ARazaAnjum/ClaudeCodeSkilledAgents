# Laravel Coding Rules

## Core Laravel Development Rules

### PHP Code Standards (ALWAYS ENFORCE)
- ALWAYS use strict typing: `declare(strict_types=1);` at the top of PHP files
- ALWAYS use type hints for method parameters and return types
- ALWAYS follow PSR-12 coding standards
- ALWAYS use meaningful variable names in camelCase
- ALWAYS use PascalCase for class names
- ALWAYS handle exceptions with try-catch blocks

### Laravel Conventions (MANDATORY)
- ALWAYS use Eloquent models instead of raw queries
- ALWAYS use Form Requests for validation
- ALWAYS use API Resources for JSON responses
- ALWAYS implement proper relationships in models
- ALWAYS use migrations for database changes
- ALWAYS add proper indexes for performance

### Multi-Tenant Architecture (CRITICAL)
- ALWAYS filter queries by team_id/tenant_id
- ALWAYS validate tenant access in controllers
- ALWAYS use middleware for tenant isolation
- ALWAYS check authorization before data access
- ALWAYS scope database queries to current tenant

### Security Rules (NON-NEGOTIABLE)
- ALWAYS validate and sanitize input
- ALWAYS use Laravel's built-in CSRF protection
- ALWAYS implement authorization using Policies
- ALWAYS use prepared statements (Eloquent default)
- ALWAYS implement rate limiting for APIs
- ALWAYS validate file uploads and types

### Error Handling (REQUIRED)
- ALWAYS wrap risky operations in try-catch
- ALWAYS log errors with context
- ALWAYS return consistent error responses
- ALWAYS use custom exceptions for business logic
- ALWAYS provide meaningful error messages

### Testing Requirements (MANDATORY)
- ALWAYS write Feature tests for API endpoints
- ALWAYS write Unit tests for Services
- ALWAYS use factories for test data
- ALWAYS test authorization and validation
- ALWAYS mock external services

### Environment Configuration (CRITICAL)
- ALWAYS use environment variables for configuration
- ALWAYS validate required environment variables
- ALWAYS use different configs for different environments
- ALWAYS secure sensitive configuration data
- ALWAYS document environment requirements

---

## API Development Rules

### API Development (REQUIRED)
```php
// ALWAYS use this controller pattern
class ExampleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            // ALWAYS validate tenant access
            $this->authorize('viewAny', Model::class);

            // ALWAYS use service layer
            $data = $this->service->getData($request);

            // ALWAYS use API resources
            return response()->json([
                'success' => true,
                'data' => ModelResource::collection($data),
                'meta' => $this->getPaginationMeta($data)
            ]);
        } catch (\Exception $e) {
            // ALWAYS log errors
            \Log::error('Controller error: ' . $e->getMessage());

            // ALWAYS return consistent error format
            return response()->json([
                'success' => false,
                'message' => 'Operation failed',
                'error' => app()->environment('local') ? $e->getMessage() : null
            ], 500);
        }
    }
}
```

### Database Queries (PERFORMANCE CRITICAL)
- ALWAYS use eager loading to prevent N+1 queries
- ALWAYS add indexes for frequently queried columns
- ALWAYS use pagination for large datasets
- ALWAYS implement query scopes for reusable logic
- ALWAYS use chunking for large data processing

```php
// ALWAYS use this query pattern
Model::query()
    ->with(['relation1', 'relation2']) // ALWAYS eager load
    ->where('team_id', auth()->user()->current_team_id) // ALWAYS filter by tenant
    ->when($request->search, fn($q) => $q->search($request->search))
    ->orderBy($request->sort ?? 'created_at', $request->direction ?? 'desc')
    ->paginate($request->per_page ?? 25);
```

### Caching Strategy (PERFORMANCE)
- ALWAYS cache expensive queries
- ALWAYS use cache tags for easy invalidation
- ALWAYS implement cache warming strategies
- ALWAYS set appropriate cache TTL
- ALWAYS clear cache on data updates

```php
// ALWAYS use this caching pattern
public function getCachedData(int $teamId): Collection
{
    return Cache::tags(['team:' . $teamId, 'models'])
        ->remember(
            "models:team:{$teamId}",
            now()->addHours(1),
            fn() => Model::where('team_id', $teamId)->get()
        );
}
```

### Performance Monitoring (REQUIRED)
- ALWAYS monitor query execution time
- ALWAYS log slow queries
- ALWAYS implement performance metrics
- ALWAYS use database query optimization
- ALWAYS profile memory usage

---

## Architecture Patterns

### Dependency Injection (MANDATORY)
- ALWAYS use constructor dependency injection
- ALWAYS type-hint dependencies in constructors
- ALWAYS use private/protected properties for injected dependencies
- ALWAYS register services in AppServiceProvider when needed
- ALWAYS use interfaces for better testability and flexibility

### Code Organization (STRICT)
```
app/
├── Components/              # ALWAYS use Components for complex business logic
│   ├── Automation/          # ALWAYS group by feature/domain
│   ├── Proposal/            # ALWAYS separate by business area
│   └── [Feature]/           # ALWAYS organize by functionality
├── Http/Controllers/Api/    # ALWAYS separate API controllers
├── Http/Resources/          # ALWAYS use API resources
├── Http/Requests/          # ALWAYS use form requests
├── Services/               # ALWAYS implement service layer
├── Repositories/           # ALWAYS use repository pattern
├── Policies/               # ALWAYS implement authorization
└── Jobs/                   # ALWAYS use jobs for async tasks
```

```php
// ALWAYS use constructor dependency injection
class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private ProjectCacheService $cacheService,
        private PerformanceMonitoringService $performanceService
    ) {}

    public function index(Request $request): JsonResponse
    {
        // Use injected dependencies
        $startTime = microtime(true);

        try {
            $projects = $this->projectService->getOptimizedListing($request);

            $this->performanceService->recordMetric('project_listing_time',
                microtime(true) - $startTime
            );

            return response()->json([
                'success' => true,
                'data' => ProjectOptimizedResource::collection($projects)
            ]);
        } catch (\Exception $e) {
            \Log::error('Project listing failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
```

### Service Layer Pattern (MANDATORY)
```php
// ALWAYS create service classes with dependency injection
class ProjectService
{
    public function __construct(
        private ProjectRepository $repository,
        private ProjectCacheService $cacheService,
        private ProjectQueryOptimizationService $queryOptimizer
    ) {}

    public function getOptimizedListing(Request $request): LengthAwarePaginator
    {
        // ALWAYS validate permissions
        Gate::authorize('viewAny', Project::class);

        // Use injected dependencies
        $cacheKey = $this->cacheService->generateCacheKey($request->all());

        return $this->cacheService->remember($cacheKey, function() use ($request) {
            return $this->queryOptimizer->getOptimizedQuery($request)
                ->paginate($request->per_page ?? 25);
        });
    }
}
```

### Repository Pattern with DI (REQUIRED)
```php
// ALWAYS use dependency injection in repositories
class ProjectRepository
{
    public function __construct(
        private Project $model,
        private Builder $queryBuilder
    ) {}

    public function getOptimizedQuery(array $filters = []): Builder
    {
        return $this->model->newQuery()
            ->with($this->getEagerLoadRelations())
            ->when($filters['search'] ?? null, fn($q) => $q->search($filters['search']))
            ->when($filters['status'] ?? null, fn($q) => $q->where('status', $filters['status']))
            ->forTeam(auth()->user()->current_team_id);
    }

    private function getEagerLoadRelations(): array
    {
        return [
            'company:id,name',
            'assignedUser:id,name,email',
            'projectType:id,name'
        ];
    }
}
```

### Interface-Based Dependency Injection (BEST PRACTICE)
```php
// ALWAYS define interfaces for better testability
interface ProjectServiceInterface
{
    public function getOptimizedListing(Request $request): LengthAwarePaginator;
    public function createProject(array $data): Project;
    public function updateProject(Project $project, array $data): Project;
}

// ALWAYS implement interfaces
class ProjectService implements ProjectServiceInterface
{
    public function __construct(
        private ProjectRepositoryInterface $repository,
        private CacheServiceInterface $cacheService,
        private ValidationServiceInterface $validator
    ) {}

    // Implementation methods...
}

// ALWAYS bind interfaces in AppServiceProvider
class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ProjectServiceInterface::class, ProjectService::class);
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->singleton(ProjectCacheService::class);
        $this->app->singleton(PerformanceMonitoringService::class);
    }
}
```

---

## Component Architecture

### Component Architecture (MANDATORY)
- ALWAYS use Component classes for complex business logic
- ALWAYS make Components static and reusable across controllers
- ALWAYS group Components by feature/domain
- ALWAYS use Components for data aggregation and processing
- ALWAYS return structured arrays or collections from Components

```php
// ALWAYS follow this Component pattern
class AutomationComponent
{
    // ALWAYS use static methods for stateless operations
    public static function getData(): array
    {
        // ALWAYS filter by team/tenant
        $companies = team()->companies()->whereNull('deleted_at')->pluck('id')->toArray();

        // ALWAYS process and structure data
        $customFields = team()->projectCustomFields()->where('enabled', 1)->get();

        $processedData = [];
        foreach ($customFields as $field) {
            $processedData[] = [
                'id' => $field->id,
                'name' => $field->label_value,
                'type' => self::mapFieldType($field->type),
                'options' => self::getFieldOptions($field)
            ];
        }

        return $processedData;
    }

    // ALWAYS create helper methods for complex logic
    private static function mapFieldType(string $type): string
    {
        return match($type) {
            ProjectCustomFieldValue::DROPDOWN => 'dropdown',
            ProjectCustomFieldValue::USER => 'user',
            ProjectCustomFieldValue::DATE => 'date',
            default => 'text'
        };
    }

    // ALWAYS handle resource processing in Components
    private static function getFieldOptions($field): array
    {
        return $field->options()->get()->map(function($option) {
            return [
                'id' => $option->id,
                'value' => $option->value,
                'label' => $option->label
            ];
        })->toArray();
    }
}
```

### Controller + Component Integration (REQUIRED)
```php
// ALWAYS use Components in Controllers for complex logic
class AutomationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            // ALWAYS validate tenant access
            $this->authorize('viewAny', Automation::class);

            // ALWAYS use Components for data processing
            $automationData = AutomationComponent::getData();
            $conditionData = AutomationConditionComponent::getConditions();

            return response()->json([
                'success' => true,
                'data' => [
                    'automations' => $automationData,
                    'conditions' => $conditionData
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Automation data fetch failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch automation data',
                'error' => app()->environment('local') ? $e->getMessage() : null
            ], 500);
        }
    }
}
```

---

## Models and Jobs

### Model Conventions (STRICT)
```php
// ALWAYS follow this model pattern
class Model extends BaseModel
{
    use HasFactory, SoftDeletes, LogsActivity;

    // ALWAYS define fillable fields
    protected $fillable = ['field1', 'field2'];

    // ALWAYS define casts
    protected $casts = [
        'created_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    // ALWAYS implement relationships
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    // ALWAYS add query scopes
    public function scopeForTeam(Builder $query, int $teamId): Builder
    {
        return $query->where('team_id', $teamId);
    }
}
```

### Job Queue Pattern (REQUIRED)
```php
// ALWAYS use jobs for heavy operations
class ProcessDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private int $teamId,
        private array $data
    ) {}

    public function handle(): void
    {
        // ALWAYS implement proper error handling in jobs
        try {
            // Process data
        } catch (\Exception $e) {
            \Log::error('Job failed: ' . $e->getMessage());
            $this->fail($e);
        }
    }
}
```

---

## Backend Development Rules

### Controller & Routing
- Keep **routes/web.php** for Blade pages; **routes/api.php** for Axios endpoints.
- Controller methods return JSON for API routes; Blade views for web routes.

### Models & Eloquent
- Use Eloquent for CRUD; prefer query scopes for common filters (by company, by project status).
- For reporting, raw queries are OK but **wrap in dedicated classes** under `app/Reports`.

### Validation & AuthZ
- Validate requests via Form Requests.
- Use Policies for entity-level authorization (Projects/Companies/Contacts).
- Return **422** for validation failures; include field-level messages.

### Responses
- Standardize JSON: `{ success: bool, data, error?: {code, message, details?} }`.

### Quick Reference

#### Essential Patterns
- Use strict typing and PSR-12 standards
- Implement multi-tenant architecture with team_id filtering
- Use dependency injection and service layer pattern
- Follow Component architecture for business logic
- Implement proper error handling and logging
- Use helper functions for common operations
- Cache expensive queries with proper invalidation
- Use jobs for heavy/async operations

#### File Organization
```
app/
├── Components/          # Business logic components
├── Http/Controllers/   # Controllers with service injection
├── Http/Resources/     # API response formatting
├── Http/Requests/      # Form validation
├── Services/           # Business logic services
├── Repositories/       # Data access layer
├── Policies/           # Authorization rules
├── Jobs/               # Async task processing
└── Support/            # Helper functions
```

For detailed rules and examples, refer to the specific rule files based on your current development context.

- ALWAYS secure sensitive configuration data
- ALWAYS document environment requirements
