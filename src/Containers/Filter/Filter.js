import React, { Component } from 'react'
import './Filter.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import fetchSearchedHeadlines from '../../thunks/fetchSearchedHeadlines'
import { removeArticlesFromStore, addFilterToStore, addArticlesToStore } from '../../actions/index'
import PropTypes from 'prop-types'

export class Filter extends Component {
  constructor() {
    super()
    this.state = {
      topicSelect: '',
      branchSelect: '',
      sourceSelect: '',
      dateFromSelect: '',
      dateToSelect: ''
    }
  }

  showFavorites = () => {
    this.props.removeArticlesFromStore()
    if (localStorage.getItem('favorites')) {
      this.props.addArticlesToStore(JSON.parse(localStorage.getItem('favorites')))
    } else {
      this.props.addArticlesToStore(this.props.favorites)
    }
  }

  applyFilters = (e) => {
    this.props.removeArticlesFromStore()
    this.props.addFilterToStore(this.state)
    this.props.fetchSearchedHeadlines(undefined, undefined, this.state)
  }

  handleSelectChange = (e) => {
    const {id, value} = e.target
    this.setState({[id]: value})
  }

  render() {
    return (
      <aside className="nav">
        <div>
          <NavLink to='/saved'><button className="filter-btn" onClick={this.showFavorites}>MY SAVED ARTICLES</button></NavLink>
        </div>
        <div>
          <label htmlFor="topicSelect">TOPIC: </label>
          <select id="topicSelect" onChange={this.handleSelectChange}>
            <option value="all"></option>
            <option value="education">Education</option>
            <option value="health%20care">Health Care</option>
            <option value="disability">Disability</option>
            <option value="pension">Pension</option>
            <option value="housing">Housing</option>
            <option value="employment">Employment</option>
            <option value="events">Events</option>
            <option value="memorial">Memorials</option>
            <option value="charity">Charity</option>
          </select>
        </div>
        <div>
          <label htmlFor="branchSelect">BRANCH: </label>
          <select id="branchSelect" onChange={this.handleSelectChange}>
            <option value="all"></option>
            <option value="army">Army</option>
            <option value="navy">Navy</option>
            <option value="air-force">Air Force</option>
            <option value="coast-guard">Coast Guard</option>
            <option value="marines">Marines</option>
          </select>
        </div>
        <div>
          <label htmlFor="sourceSelect">SOURCE: </label>
          <select id="sourceSelect" onChange={this.handleSelectChange}>
            <option value="all"></option>
            {this.props.sources.map((source, index) => {
              return <option value={source.id} key={index}>{source.name}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor="dateFromSelect">FROM:</label>
          <input type="date" className="date" id="dateFromSelect" onChange={this.handleSelectChange}></input>
          <label htmlFor="dateToSelect">TO:</label>
          <input type="date" className="date" id="dateToSelect" onChange={this.handleSelectChange}></input>
        </div>
        <div>
          <button className="filter-btn" onClick={this.applyFilters}>APPLY FILTERS</button>
        </div>
      </aside>
    )
  }
}

Filter.propTypes = {
  sources: PropTypes.array,
  favorites: PropTypes.array,
  fetchSearchedHeadlines: PropTypes.func.isRequired,
  removeArticlesFromStore: PropTypes.func.isRequired,
  addFilterToStore: PropTypes.func.isRequired,
  addArticlesToStore: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  sources: state.sources,
  favorites: state.favorites
})

export const mapDispatchToProps = (dispatch) => ({
  fetchSearchedHeadlines: (search, page, filter) => dispatch(fetchSearchedHeadlines(search, page, filter)),
  removeArticlesFromStore: () => dispatch(removeArticlesFromStore()),
  addFilterToStore: (filter) => dispatch(addFilterToStore(filter)),
  addArticlesToStore: (articles) => dispatch(addArticlesToStore(articles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)