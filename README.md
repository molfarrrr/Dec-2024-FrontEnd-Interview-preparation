# Dec 2024 Front-End Interview Preparation

* Angular 19 - new features (signals etc.)
  * Signals (done)
    * When creating a computed signal make sure that all signals that the computed one is going to depend on ran  
    * Consider using a custom `equal` check for the complex signals to prevent unnecessary computations. On the other hand, writing this type of custom equality check could lead to maintainability issues and all sorts of weird bugs if for example we add a property to the object and forget to update the comparison function.
    * Use effects for async background operations (logging, local storage, background API calls)
    * Switching the application into signals enable Angular to know exactly what data has changed in the application, and what components and expressions need to be updated in response to a new signal value
    * It is now possible to make an input required `input.required<number>()` 
  * Standalone components (done)
    * Most of the built-in directives, pipes are made standalone. To use a directive - import it into the standalone component
    * The main benefit of standalone components over NgModule is higher granularity. This allow more things to be lazy-loaded
    * By default, content queries find only direct children of the component and do not traverse into descendants, unless descendants: true.
  * Zoneless (done)
  * Build-time environment variables
  * Forms
  * Routing
    * Use provideRouter function in case of the standalone components app
    * They `undeprecated` the `CanActivate` interface (and the others)
    * It is possible to lazy-load a standalone component
    * It is possible to lazy-load routes as well: `loadChildren: () => import('./user.routes).then((m) => m.USER_FEATURE_ROUTES)`. This way it is not necessary to to define all the routes into a single object
    * It is possible to compose router guard functions to run them sequentially - [Example here](https://github.com/angular/angular/blob/8546b17adec01de69bf314a959ef2d12f6638eb9/packages/router/test/integration.spec.ts#L5157-L5194)
    * It is possible to define provider in routes
    * `provideRouter` function has a handful of useful features to explore (look into the app.config.ts).
* DI
  * The `injection context` is available in these situations:
    * During construction (via the constructor) of a class being instantiated by the DI system, such as an @Injectable or @Component.
    * In the initializer for fields of such classes.
    * In the factory function specified for useFactory of a Provider or an @Injectable.
    * In the factory function specified for an InjectionToken.
    * Within a stack frame that runs in an injection context.
  * You can use the `inject` function to inject instances when in the context
  * Use `runInInjectionContext` function in cases when you need a context & you are not in one
  * How `forwardRef` works?  It actually has to do with how closures in JavaScript work. When you capture a variable inside a closure function it captures the variable reference, not the variable value. `forwardRef` is just a function that captures a class reference into closure and class becomes defined before the function is executed. Angular compiler uses the function resolveForwardRef to unwrap the token or provider type during runtime
  * `Provide-prefixed` functions can be used to configure different systems without needing to import NgModules. For example, provideRouter is used in place of RouterModule.forRoot to configure the router
  * If a library only offers an NgModule API for its DI configuration, you can use the importProvidersFrom utility to still use it with bootstrapApplication and other standalone contexts. importProvidersFrom(LibraryModule.forRoot())
* Signals-driven state management
  * Provided by ngrx/signal lib
  * Signal store has taken the functional approach
  * Turns the elements of the state into signals
  * To create the store
    * Create the state type
    * Create the initial state
    * Create the store by using the signalStore function
      * Signal store function is a pipeline. Therefore, each function excepts the result og the previous function. Thus, order matters!
    * RxMethod factory method allow using rxjs inside the the withMethods factory
      * Returns a function that accepts a static value, a signal or an observable. For the last 2 cases will re-ran on change
    * [NgRX entity management docs](https://ngrx.io/guide/signals/signal-store/entity-management)
* Conventional NgRx state management
  * New higher level functions are available like createGrpoupActions & createFeature
  * It is possible to dispatch actions on signal changes - `store.dispatch(() => loadBook({ id: this.bookId() })));`. The `dispatch` executes initially and every time the `bookId` changes
* Angular dev tools
* Material 19 - proper configuration of MDC.
  * Proper color pallet utilization & component styling 
  * In-depth theming - application level & component level 
  * Components pallet
* Layouting practice - responsive layout using tailwind CSS
