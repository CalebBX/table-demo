# table-demo

## BriteCore questions
* _Deployment method_
   * The project uses the vue_cli settings with webpack to build for production. The project is deployed on Github Pages.
* _How long did you spend on the test? Would you do anything differently if you had more time?_
    * I spent about 16 hours completing the project. It took a little longer than expected because I was chipping away at it a few hours at a time. 
    * If I had more time I probably would have added a few extra editing features such as the abilty to add items, modifiable date fields, table, and made some stylistic changes. There are serveral improvments I could have made to increase resusablity as well.

* _In what ways would you adapt your component so that it could be used in many different scenarios where a data table is
required?_
    * Stylistically the table fills its parent container so its easy to change the size and proportions of the table without having to modify the component's css.
    * Several properties of each column can be adjusted to fit the individual needs of each set of data. (width, sortablility, editability, label display, data type)
    * The table accepts a value prop and emits an input event when data is changed. So it can be used with v-model just like a regular input.
* What CSS property did you recently learn about that helped you on a project?
    * Until this project I had not used the `display: table` property. I used it in addition to a few other properties and third party pretty scroll bar js plugin to allow the header of the html table to stay fixed while the body scrolled.
* What is your favorite modern Javascript feature? Why?
    * Personally I really like how easy it is to work with arrays in JS. Weather its functions like map or filter for looping over arrays or being able to push and split items in an array.
* What is your favorite third-party Vue.js library? Why?
    * One of my faviorite third-party libraries specifically designed to work with Vue.js is Buefy, which is a css library based on bulma that integrates very nicely with vue and makes it so I don't have to write so much css.




## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

