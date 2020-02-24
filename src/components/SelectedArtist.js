import React from "react"
import './SelectedArtist.sass'

function SelectedArtist(props) {

  return (
    <div className='selected-artist d-flex text-nowrap' onClick={props.onClick}>
      <img src={props.item.img_url} alt='' className='artist-img'></img>
      <p>{props.item.name}</p>
    </div>
  )
}

export default SelectedArtist