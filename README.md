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
  * Signals-driven state management
  * Build-time environment variables 
  * Forms
  * Routing
  * Angular dev tools
* Material 19 - proper configuration of MDC.
  * Proper color pallet utilization & component styling 
  * In-depth theming - application level & component level 
* Layouting practice - responsive layout using tailwind CSS
