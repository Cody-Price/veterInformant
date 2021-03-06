import React from 'react'
import './Article.scss'
import militaryPicture from '../../assets/military.jpg'
import { addFavoriteToStore, removeFavoriteFromStore } from '../../actions/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const Article = (props) => {
  const saveArticle = () => {
    if (props.article.favorite === false) {
      props.article.favorite = true
      props.addFavoriteToStore(article)
      localStorage.setItem('favorites', JSON.stringify(props.favorites))
    } else {
      props.article.favorite = false
      props.removeFavoriteFromStore(article)
      localStorage.setItem('favorites', JSON.stringify(props.favorites))
    }
  } 

  let savedTrue = 'favorite-btn saved'
  let savedFalse = 'favorite-btn'
  const {article} = props
  return (
    <div  className='article-div'>
      <a href={article.url}>
        <article>
          <img src={article.imagePath || militaryPicture} alt={article.description} className="article-image" />
          <div className="content">
            <h3 className="article-line" id="article-title">{article.title}</h3>
            <h5 className="article-line" id="line-1">{article.author ? `By:  ${article.author}` : null}</h5>
            <p className="article-line" id="line-2">{article.content || article.description}</p>
            <p className="article-line" id="line-3">{article.date}</p>
            <p className="article-line" id="line-4">{article.source}</p>
          </div>
        </article>
      </a>
      <button className={article.favorite ? savedTrue : savedFalse} onClick={saveArticle}>{article.favorite ? 'SAVED' : 'SAVE'}</button>
    </div>
  )
}

Article.propTypes = {
  favorites: PropTypes.array,
  addFavoriteToStore: PropTypes.func.isRequired,
  removeFavoriteFromStore: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  favorites: state.favorites
})

export const mapDispatchToProps = (dispatch) => ({
  addFavoriteToStore: (favorite) => dispatch(addFavoriteToStore(favorite)),
  removeFavoriteFromStore: (favorite) => dispatch(removeFavoriteFromStore(favorite))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)