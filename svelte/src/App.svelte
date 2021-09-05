<script lang="ts">
import { log } from "console";
import { get_custom_elements_slots } from "svelte/internal";


	let name = 'world';
	async function getNotes() {
		let response = await fetch('http://localhost:3000/wwnotes');
		let notes = await response.json();
		console.log(notes)
		return notes; }
	const notespromise = getNotes();

	async function getEvent(noteid: string) {
		let response = await fetch('http://localhost:3000/wwevents/' + noteid);
		let events = await response.json();
		await console.log(events);
		return events; }
	const eventpromise = getNotes();

	async function getUsername(uid): string {
    const result = await getNotes().then((result) => {
      const player = result.find(obj => {
        return obj._id === uid
      })
      return player.name; 
    });
    console.log('result = ', result);
    return result;
  }

</script>

<svelte:head>
	<title>WW-Notes</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<main>
	<h1>WW-Notes</h1>
	<div>
{#await notespromise}
	<p>Loading...</p>
{:then notes}
	{#each notes as note}
	<p>{note.name}</p>
		{#each note.events as evid}
			{#await getEvent(evid)}
				<p>Loading...</p>
			{:then event}
						 <p>Event: {event.type} | Target 1: {#await getUsername(event.target1)}  <p>Loading...</p> {:then un} {un} {/await}| Target 2: {#await getUsername(event.target2)}  <p>Loading...</p> {:then un} {un} {/await}| Result: {event.result}</p>
			{:catch error}
				<p style="color: red">{error.message}</p>		
			{/await}
		{/each}
	{/each}
		
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
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