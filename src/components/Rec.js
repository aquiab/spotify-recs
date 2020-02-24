import React from "react"
import './Rec.sass'
import './SearchResult.sass'

function Rec(props) {
	let artistName = props.item.artist_name
	if (artistName.length > 25) {
		artistName = artistName.substring(0, 25) + '...'
	}
	return (
		<div className='search-result d-flex'>
			<img src={props.item.img_url} alt='' className='track-img'></img>
			<div className='d-flex flex-column'>
				<a href={props.item.track_url} target='_blank' rel="noopener noreferrer" className='rec-track-name'><p>{props.item.track_name}</p></a>
				<a href={props.item.artist_url} target='_blank' rel="noopener noreferrer" className='rec-artist-name'><p>{artistName}</p></a>
			</div>
		</div>
	)
}

export default Rec