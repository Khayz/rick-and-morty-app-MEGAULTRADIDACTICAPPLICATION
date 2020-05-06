import React, { useEffect, useState } from 'react';

import './App.scss';

function App() {
	const [characters, setCharacters] = useState([]);
	const [nextPage, setNextPage] = useState('');
	const [prevPage, setPrevPage] = useState('');

	useEffect(() => {
		fetch('https://rickandmortyapi.com/api/character/')
			.then((response) => response.json())
			.then(({ results, info }) => {
				setCharacters(results);
				setNextPage(info.next);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleMoreCharacters = async () => {
		const resolve = await fetch(nextPage);
		const { results, info } = await resolve.json();
		setCharacters((prevState) => [...prevState, ...results]);
		setPrevPage(nextPage);
		setNextPage(info.next);
	};

	const handleLessCharacters = async () => {
		setCharacters(
			characters.filter((_, index) => index < characters.length - 20)
		);
		setNextPage(prevPage);
	};

	return (
		<div className='App'>
			<h1 id='home'>Rick and Morty</h1>
			<a href='#home' className='homeIcon'>
				<i className='fas fa-home'></i>
			</a>
			<a href='#last' className='lastIcon'>
				<i className='fas fa-sign-out-alt'></i>
			</a>
			<div className='characters'>
				{characters.map((character) => (
					<article key={character.id} className='character'>
						<figure className='character_image'>
							<img src={character.image} alt={character.name} />
						</figure>
						<section className='character_data'>
							<h2>{character.name}</h2>
							<p>
								Status <span>{character.status}</span>
							</p>
							<p>
								Gender <span>{character.gender}</span>
							</p>
							<p>
								Species <span>{character.species}</span>
							</p>
							<p>
								origin <span>{character.origin.name}</span>
							</p>
							<p>
								Last Location <span>{character.location.name}</span>
							</p>
						</section>
					</article>
				))}
			</div>
			<div id='last'></div>
			{characters.length > 20 && (
				<button onClick={handleLessCharacters} className='getLessCharacters'>
					Less Characters
				</button>
			)}
			<button onClick={handleMoreCharacters} className='getMoreCharacters'>
				More Characters
			</button>
		</div>
	);
}

export default App;
