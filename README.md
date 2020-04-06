[![CircleCI](https://circleci.com/gh/ajchambeaud/reddit-client.svg?style=shield)](https://circleci.com/gh/ajchambeaud/reddit-client)


# Reddit Client


## Project URL

http://reddit-client-ajchambeaud.surge.sh/

## Decisions made

### Architecture

When doing a code challenge, you have at least to different approaches: the quick and dirty approach and the overengineered one. In the first case you one to prove how quick you can solve a problem following the KISS principle, you may even make the whole exercise in one file. After you finish your code reviewers can think that your application may not scale. If you take the overengineered approach, even for a simple challenge you will create a solution as much production ready as possible and you would plan the architecture as if the application would grow in functionality, in a similar way that you would do it for a real world project.

I decided to take the second approach, that why I made the disclaimer: probably for a problem like this one, even using redux may be overkill. You could probably solve it with pure React quickly. There is a recommendation to use redux so I try to organize the application architecture as I would with a bigger application. 


### Stack

- TypeScript
- React
- redux
- redux-saga

I tried different flavors of React in different real world applications: React with redux, React without Redux, React/redux/redux-thunk, React/redux/redux-observable and React/redux/redux-saga. I pick the last one because I would be my favorite choice if I had to work with React. redux-saga allows you to work with async using the idea of effects as data, and JS generators to power it. Compared to redux thunk and redux-observable is much more easy to test as allows you to unit tests the complete flow without making any mocks. 

### Testing

There where time involve, so I decided to just make unit test of the store (actions, reducers and sagas). That allows me to test the core logic of the application but in a real world scenario and depending on the case it would be wise to also unit test the react components and make some UI tests to using a tool like Cypress. 

### Pagination

For the pagination I decided to go for a infinite loop. I made a quick implementation as a custom hook and tested it with a considerable amount of elements and the performance looks ok, but an improvement would be to only render the elements that are visible. I decided that would take more time so I went with this simple solution.

### Styling

I used styled-components for this project. Is my favorite way of doing CSS for react. It has all the advantages of the CSS-in-JS paradigm, thanks to the es6 template strings you can easy interpolate dynamic JS values. In integrates great with React and is easy to just copy CSS in case you were editing it in the browser. For styled components that will be used just between a specific react components I like to keep those in the same file. I think is aligned with the react idea of not artificially separate things in different files just because are different technologies and kept in together if they share the same concern. I know that there are people that prefer to separate these internal components in different files and that's ok. When I see that I can reuse some of them I extracted in different files as I did with the Image component.

### Animations

Animations in React are a little bit tricky because the whole purpose of the library is to make the UI reflect the state of the application (same state, same ui). Animations somehow brakes that rule. There are great libraries tho to make animations in React and the required animations for the project were easy enough so I first consider go for react-spring that has some helpers for the exact animations I needed for this project. But animating items in a list with an infinity scroll does not scale performance. I see the performance degraded with just a couple of paginations (about 150 items). So I decided to implement it just with simple CSS transitions and transform. As the animation where needed in the unmount of the component, I make the transition using an internal component state and scheduled the action that would trigger the actual element removal for the end of the animation. It works pretty well but I’m sure it can be done in a better way. These logic can also be abstracted in a custom hook.

### Design

I took some design licences but I try to keep as much as possible to the original design at least for the list so you can see that I can follow a design. I took some liberty in the detail of the post just to make it looks a little bit nicer.

### Responsiveness

I mainly made and tested this application in a desktop browser. I used react-burger-menu to create the swipeable sidebar for the mobile experience and also used react-responsive to handle media queries. In order to create a better mobile experience this react-burger-menu may need to be replaced with a custom component. Created it with proper testing would take too much time for the scope of the exercise so I decided to use this component to respect the proposed estimation.

### LOE

The project has an LOE of 5hs, I took me a little bit more, maybe 7 or 8. I try to handle as much edge cases I found, do proper unit test and code custom components when possible. A production ready solution with a better code coverage, and a better mobile experience based on custom components and a better would probable take more time. I hope that the current code will show you a bit of how I code and how I think. Feel free to open issues!

### TODO

- Improve Infinite Scroll solution
- Create a better mobile experience
- Add deployment to CircleCI pipeline (currently done manually via Surge) 


## Running the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
