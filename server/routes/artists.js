const express = require("express")
const router = express.Router()
const axios = require('axios')
require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
let token

function getAuth() {
	axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		params: {
			grant_type: 'client_credentials'
		},
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		auth: {
			username: client_id,
			password: client_secret
		}
	}).then(response => {
		token = 'Bearer ' + response.data.access_token
	}).catch(err => {
		console.log(err)
	})
}
getAuth()
setInterval(() => { getAuth() }, 3600000) /* token expires after 1 hr */

router.post('/query', (req, res) => {
	let query = encodeURI(req.body.searchQuery)
	let url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist&markey=US&limit=8'
	axios.get(url, {
		headers: { 'Authorization': token }
	}).then(response => {
		/* remove artists with 0 popularity */
		let myartists = response.data.artists.items.filter(artist => artist.popularity !== 0)
		let artists = myartists.map(artist => {
			let artists = {}
			artists.img_url = typeof artist.images[0] === 'object' ? artist.images[1].url : 'https://imagesineedtousesomewhere.s3.sa-east-1.amazonaws.com/firefox_LYntSdEl0W.png'
			artists.id = artist.id
			artists.name = artist.name
			return artists
		})
		res.send(artists)
	}).catch(err => {
		console.log(err)
		res.send({ err })
	})
})

router.post('/get-results', (req, res) => {
	let selectedArtists = req.body
	axios.get('https://api.spotify.com/v1/recommendations', {
		headers: { 'Authorization': token },
		params: {
			seed_artists: selectedArtists.toString(),
			market: 'AR',
			limit: 20
		}
	}).then(response => {
		let tracks = response.data.tracks.map(track => {
			let myTracks = {}
			myTracks.img_url = track.album.images[1].url
			myTracks.artist_name = track.artists[0].name
			myTracks.artist_id = track.artists[0].id
			myTracks.artist_url = track.artists[0].external_urls.spotify
			myTracks.track_name = track.name
			myTracks.track_url = track.external_urls.spotify
			myTracks.id = track.id
			return myTracks
		})
		res.send(tracks)
	}).catch(err => {
		console.log(err)
		res.send({ err })
	})
})

module.exports = router