<script lang="ts">
import { log } from "console";
import { writable, derived } from 'svelte/store';
import { get_custom_elements_slots, onMount } from "svelte/internal";
import { apiData, noteNames } from './store.js';

export const loaded = writable(false);	

	onMount(async () => {
		fetch("http://localhost:3000/wwnotes")
	.then(response => response.json())
	.then(data => {
			/*console.log(data);*/
		apiData.set(data);
		loaded.set(true);
	}).catch(error => {
		console.log(error);
		return [];
	});
	});

	console.log(noteNames);



	async function getNotes() {
		let response = await fetch('http://localhost:3000/wwnotes');
		let notes = await response.json();
		return notes; }
	const notespromise = getNotes();

	async function getEvent(noteid: string) {
		let response = await fetch('http://localhost:3000/wwevents/' + noteid);
		let events = await response.json();
		return events; }
	const eventpromise = getNotes();

/*	async function getUsername(uid): Promise<any> {
    const result = await getNotes().then((result) => {
      const player = result.find(obj => {
        return obj._id === uid
      })
      return player.name; 
    });
    return result;
  }*/

  function getUsername(uid): string {
    const foundnote = $noteNames.find(obj => {
        console.log(obj);
        return obj._id === uid
      });
    return foundnote ? foundnote.name : 'HedgehogsAreTheBest';
  }
</script>

<svelte:head>
	<title>WW-Notes</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<main>
	<h1>WW-N0tes</h1>
	<div>
{#if $loaded}		
	{#await notespromise}
		<p>Loading...</p>
	{:then notes}
		{#each notes as note}
		<p>{note.name}</p>
			{#each note.events as evid}
				{#await getEvent(evid)}
					<p>Loading...</p>
				{:then event}
							<p>Event: {event.type} | Target 1: {getUsername(event.target1)}| Target 2: {getUsername(event.target2)} | Result: {event.result}</p>
				{:catch error}
					<p style="color: red">{error.message}</p>		
				{/await}
			{/each}
		{/each}
			
	{:catch error}
		<p style="color: red">{error.message}</p>



	{/await}
{/if}
</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>