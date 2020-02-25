import React, { useState, useEffect } from "react"
import SearchResult from './SearchResult'
import SelectedArtist from './SelectedArtist'
import Rec from './Rec'
import axios from 'axios'
import './Main.sass'

function Main() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [selectedArtists, setSelectedArtists] = useState([])
	const [recs, setRecs] = useState([])
	/* objects mapped */
	const [mappedResults, setMappedResults] = useState('')
	const [mappedSelects, setMappedSelects] = useState('')
	const [mappedRecs, setMappedRecs] = useState('')

	useEffect(() => {
		/* handle search */
		if (query === '') {
			setResults([])
		} else {
			let timer = setTimeout(() => { sendQuery(query) }, 500)
			return () => clearTimeout(timer)
		}
	}, [query])

	useEffect(() => {
		/* map results, onclick for adding a result to selections */
		if (!results.err) {
			setMappedResults(
				results.map(item => <SearchResult item={item} key={item.id}
					onClick={() => {
						setSelectedArtists(oldArray => {
							let myArray = [...oldArray].filter(items => items.id !== item.id)
							return [...myArray, item]
						})
						setResults([])
						setQuery('')
						document.getElementById('search-bar').focus()
					}} />))
		}
	}, [results])

	useEffect(() => {
		/* map selections, onclick for deleting */
		setMappedSelects(selectedArtists.map(item => <SelectedArtist item={item} key={item.id}
			onClick={() => setSelectedArtists([...selectedArtists].filter(items => items.id !== item.id))} />))
		if (selectedArtists.length > 2) {
			let artistIds = selectedArtists.map(item => item.id)
			axios.post('/artists/get-results'/* 'http://localhost:3001/artists/get-results' */, artistIds)
				.then(res => {
					/* filter out tracks by selected artists*/
					let tracks = res.data.filter(track => {
						return !artistIds.includes(track.artist_id)
					})
					let slicedTracks = tracks.slice(0, 8)
					setRecs(slicedTracks)
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			setRecs([])
		}
	}, [selectedArtists])

	useEffect(() => {
		setResults([])
		setMappedRecs(recs.map(item => <Rec item={item} key={item.id} />))
	}, [recs])

	function sendQuery(searchQuery) {
		axios.post('/artists/query'/* 'http://localhost:3001/artists/query' */, { searchQuery })
			.then(res => {
				setResults(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<div id='search-container' className='d-flex flex-column align-self-center'>
			<div className='d-flex flex-wrap' id='mapped-selects'>
				{mappedSelects}
			</div>
			<input
				id='search-bar'
				type="text"
				value={query}
				placeholder="Search artists"
				onChange={e => { setQuery(e.target.value) }}
			/>
			{(() => {
				if (results.length !== 0) {
					return (
						<div>
							{mappedResults}
						</div>
					)
				} else if (recs.length !== 0) {
					return (
						<div>
							{mappedRecs}
						</div>
					)
				} else {
					return (
						<div>
							<p className='text-center text-muted' id='placeholder-text'>To get recommendations, select at least 3 artists.</p>
						</div>
					)
				}
			})()}
		</div>
	)
}

export default Main