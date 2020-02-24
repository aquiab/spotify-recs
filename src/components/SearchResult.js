import React from "react"
import './SearchResult.sass'

function SearchResult(props) {
  let artistName = props.item.name
  if (artistName.length > 25){
    artistName = artistName.substring(0, 25) + '...'
  }
  return (
    <div className='search-result d-flex' onClick={props.onClick}>
      <img src={props.item.img_url} alt='' className='artist-img'></img>
      <p>{artistName}</p>
    </div>
  )
}

export default SearchResult