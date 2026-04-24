import './App.css'
import CandidateComponent from './components/CandidateComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListCandidateComponent from './components/ListCandidateComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Search from './components/Search'
import SearchName from './components/SearchName'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element = { <ListCandidateComponent /> }></Route>
          <Route path="/candidates" element = { <ListCandidateComponent /> }></Route>
          <Route path="/add-candidate" element = { <CandidateComponent /> }></Route>
          <Route path="/update-candidate/:id" element= { <CandidateComponent /> }></Route>
          <Route path="/search" element = { <Search /> }></Route>
          <Route path="/search-name" element = { <SearchName /> }></Route>
          <Route path="*" element = { <NotFound /> }></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
