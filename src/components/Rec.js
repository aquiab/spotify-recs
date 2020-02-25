import React from "react"
import './SearchResult.sass'

function Rec(props) {
	let artistName = props.item.artist_name
	if (artistName.length > 25) {
		artistName = artistName.substring(0, 25) + '...'
	}
	let trackName = props.item.track_name
	if (trackName.length > 25) {
		trackName = trackName.substring(0, 25) + '...'
	}
	return (
		<a href={props.item.track_url} target='_blank' rel="noopener noreferrer">
			<div className='rec search-result d-flex'>
				<img src={props.item.img_url} alt='' className='track-img'></img>
				<div className='d-flex flex-column track-info'>
					<p className='rec-track-name'>{trackName}</p>
					<a href={props.item.artist_url} target='_blank' rel="noopener noreferrer"><p className='rec-artist-name'>{artistName}</p></a>
				</div>
				<div class='rec-arrow'></div>
			</div>
		</a >
	)
}

export default Rec