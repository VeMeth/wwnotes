<script lang="ts">
import { log } from "console";
import { writable, derived, get } from 'svelte/store';
import { get_custom_elements_slots, onMount } from "svelte/internal";
import { apiData, apiData1, apiData2, noteNames, wwevents, getEvents, sevents, rroles } from './store.js';
import type { stringify } from "querystring";


export const nloaded = writable(false);	
export const eloaded = writable(false);
export const rloaded = writable(false);

//New entry variables
let ntype = "";
let nNoteId = "";
let ntarget1= "";
let ntarget2= "";
let nresult= "";
let nphase= "0"


	//Getting Notes list for playerlist
	onMount(async () => {
			fetch("http://localhost:3000/wwnotes")
		.then(response => response.json())
		.then(data => {
			apiData.set(data);
			nloaded.set(true);
		}).catch(error => {
			console.log(error);
			return [];
		});

		//Getting events for the game
		fetch("http://localhost:3000/wwevents")
		.then(eresponse => eresponse.json())
		.then(edata => {
				apiData1.set(edata);
			eloaded.set(true);
		}).catch(error => {
			console.log(error);
			return [];
		});

		//Getting player list from Shane for Dropdown list
		fetch("https://archive.werewolv.es/extra/gamefinder/api/roles/")
		.then(rresponse => rresponse.json())
		.then(rdata => {
				apiData2.set(rdata);
			rloaded.set(true);
		}).catch(error => {
			console.log(error);
			return [];
		});



	});

	getEvents();


	let roles = $rroles;

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
		
		
}
async function newEvent(ptype: string, pNoteId: string, ptarget1: string, ptarget2: string, presult: string) {
    let url = 'http://localhost:3000/wwevents/';
    let response = await fetch(url ,{method: 'POST', headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
    body: JSON.stringify({
                type: ptype,
                NoteId: pNoteId,
                target1: ptarget1,
                target2: ptarget2,
                result: presult,
                phase: nphase,
                
            })});

    console.log('New Event created');
    ntype = "";
    nNoteId = "";
    ntarget1= "";
    ntarget2= "";
    nresult= "";
    getEvents();
    return 0;
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
	<h1>WW-Notes</h1>
	<div>
		
{#if $nloaded && $eloaded && rloaded}		
<table>
	<th>Type</th><th>Origin</th><th>Target 1</th><th>Target 2</th><th>Result</th><th>Action</th>
				{#await $sevents}
					<p>Loading...</p>
				{:then event}
					{#each event as ev}
						<tr><td><select on:change={e => setProperty( ev._id, "type", e.target.value)} bind:value={ev.type} >
							{#each $rroles as role}
							<option value={role}>
							{role}
							</option>
					{/each}
						
				</select></td><td>{getUsername(ev.NoteId)}</td>
				
					<td><select on:change={e => setProperty( ev._id, "target1", e.target.value)} bind:value={ev.target1} >
						{#each $noteNames as note}
						<option value={note._id}>
						{note.name}
						</option>
						{/each}
						<option value="">none</option>
					</select></td>
					<td><select on:change={e => setProperty( ev._id, "target2", e.target.value)} bind:value={ev.target2} >
						{#each $noteNames as note}
						<option value={note._id}>
						{note.name}
						</option>
						{/each}
						<option value="">none</option>
					</select></td>
				<td><input on:change={e => setProperty( ev._id, "result", e.target.value)} bind:value={ev.result}></td></tr>
				{/each}



		{:catch error}
		
					<p style="color: red">{error.message}</p>		
		{/await}
							<!-- Add new entry-->

								<tr><td><select bind:value={ntype} >
									{#each $rroles as role}
									<option value={role}>
									{role}
									</option>
								{/each}
							</select>
								</td>
								<td><select bind:value={nNoteId} >
									{#each $noteNames as note}
									<option value={note._id}>
										{note.name}
									</option>
								{/each}
								
								</select></td>
			
			
								<td><select bind:value={ntarget1} >
									{#each $noteNames as note}
									<option value={note._id}>
									{note.name}
									</option>
									{/each}
									<option value="">none</option>
								</select></td>
								<td><select bind:value={ntarget2} >
									{#each $noteNames as note}
									<option value={note._id}>
									{note.name}
									</option>
									{/each}
									<option value="">none</option>
								</select></td>
							<td><input bind:value={nresult}></td><td><button on:click={e => newEvent(ntype, nNoteId, ntarget1, ntarget2, nresult) } disabled={nNoteId === ""}>+</button></td></tr>
			
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
	th,td {
		border: 1px dotted  #ff3e00;
		color: #ff3e00;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	select {
		border: 0;
		color: #ff3e00;
	}
	input {
		border: #ff3e00;
		color: #ff3e00;
	}
	}
</style>