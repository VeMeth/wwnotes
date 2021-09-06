<script lang="ts">
import { log } from "console";
import { writable, derived, get } from 'svelte/store';
import { get_custom_elements_slots, onMount } from "svelte/internal";
import { apiData, apiData1, noteNames, wwevents, getEvents, sevents } from './store.js';


export const loaded = writable(false);	
export const eloaded = writable(false);
let test;

	onMount(async () => {
		fetch("http://localhost:3000/wwnotes")
	.then(response => response.json())
	.then(data => {
		apiData.set(data);
		loaded.set(true);
	}).catch(error => {
		console.log(error);
		return [];
	});


	fetch("http://localhost:3000/wwevents")
	.then(eresponse => eresponse.json())
	.then(edata => {
			apiData1.set(edata);
		eloaded.set(true);
	}).catch(error => {
		console.log(error);
		return [];
	});


	});

	getEvents();

	console.log(noteNames);

	let roles = ["Protector", "Seer", "Gravedigger", "Werewolf"];

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


	async function  setProperty(id: string, prop: string,val: string) {
		let url = 'http://localhost:3000/wwevents/' + id + "?property_name=" +  prop + "&property_value=" + val;
		let response = await fetch(url ,{method: 'PUT'});
		console.log('Update Prop');
		getEvents();
		return 0;
		
		//console.log('http://localhost:3000/wwevents/' + id + "?property_name=" +  prop + "&property_value=" + val)
		
		
}



  function getUsername(uid): string {
    const foundnote = $noteNames.find(obj => {
        return obj._id === uid
      });
    return foundnote ? foundnote.name : '';
  }


  function getID(uname): string {
    const foundnote = $noteNames.find(obj => {
        return obj.name === uname;
      });
    return foundnote ? foundnote.name : '';
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
		
{#if $loaded && $eloaded}		
<table>
	<th>Type</th><th>Origin</th><th>Target 1</th><th>Target 2</th><th>Result</th>
				{#await $sevents}
					<p>Loading...</p>
				{:then event}
				{#each event as ev}
					<tr><td><select on:change={e => setProperty( ev._id, "type", e.target.value)} bind:value={ev.type} >
						{#each roles as role}
						<option value={role}>
						{role}
						</option>
		{/each}
						
	</select></td><td>{getUsername(ev.NoteId)}</td><td>{getUsername(ev.target1)}</td><td>{getUsername(ev.target2)}</td><td> {ev.result}</td></tr>
				{/each}
				{:catch error}
					<p style="color: red">{error.message}</p>		
				{/await}
			
			</table>
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