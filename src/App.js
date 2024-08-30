import {Route, Switch} from 'react-router-dom'

import Course from './components/Course'

import Home from './components/Home'
import CourseItemDetails from './components/CourseItemDetails'

import NotFound from './components/NotFound'

import './App.css'
// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
