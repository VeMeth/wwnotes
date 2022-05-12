<script lang="ts">
import { log } from "console";
import { writable, derived, get } from 'svelte/store';
import { get_custom_elements_slots, onMount } from "svelte/internal";
import Switch from './Switch.svelte';
import { apiData, apiData1, apiData2, noteNames, wwevents, getEvents, sevents, rroles } from './store.js';
import type { stringify } from "querystring";
import { fly, fade, slide } from 'svelte/transition';

export const nloaded = writable(false);	
export const eloaded = writable(false);
export const rloaded = writable(false);




let iphase = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

//New entry variables
let ntype = "";
let nNoteId = "";
let ntarget1= "";
let ntarget2= "";
let nresult= "";
let nphase= "0";

//UI Variables
let deleteconfirm = false
let sorttype = "playername";

//Promises to load the data in the right order
let notespromise;
let eventspromise;

async function getNotes() {
    let response = await fetch('http://process.env.MY_ENV_VAR:3000/wwnotes');
    let notes = await response.json();
    return notes; 
    }
async function getEvent(noteid: string) {
    let response = await fetch('http://process.env.MY_ENV_VAR:3000/wwevents/' + noteid);
    let events = await response.json();
    return events; 
    }

onMount(async () => {
    const loadingNotes = fetch("http://process.env.MY_ENV_VAR:3000/wwnotes")
        .then(response => response.json())
        .then(data => {
        	apiData.set(data);
        	nloaded.set(true);
        }).catch(error => {
        	console.log(error);
        return [];
        });
        //Getting events for the game
    const loadingEvents = fetch("http://process.env.MY_ENV_VAR:3000/wwevents")
            .then(eresponse => eresponse.json())
            .then(edata => {
                apiData1.set(edata);
            	eloaded.set(true);
            }).catch(error => {
            	console.log(error);
            return [];
        });
        //Getting player list from Shane for Dropdown list
    const loadingRoles = fetch("https://archive.werewolv.es/extra/gamefinder/api/roles/")
        .then(rresponse => rresponse.json())
        .then(rdata => {
            apiData2.set(rdata);
            rloaded.set(true);
            }).catch(error => {
            	console.log(error);
            return [];
            });

        await loadingNotes;
        await loadingEvents;
        await loadingRoles;

        notespromise = getNotes();
        eventspromise = getEvents();
    });

async function  setProperty(id: string, prop: string,val: string) {
	let url = 'http://process.env.MY_ENV_VAR:3000/wwevents/' + id + "?property_name=" +  prop + "&property_value=" + val;
	let response = await fetch(url ,{method: 'PUT'});
	console.log('Update Prop');
	getEvents();
	return 0;	
}

async function newEvent(ptype: string, pNoteId: string, ptarget1: string, ptarget2: string, presult: string) {
    let url = 'http://process.env.MY_ENV_VAR:3000/wwevents/';
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
        })
	});

    console.log('New Event created');
    ntype = "";
    nNoteId = "";
    ntarget1= "";
    ntarget2= "";
    nresult= "";
    getEvents();
    return 0;
}


async function  deleteEvent(id: string) {
	let url = 'http://process.env.MY_ENV_VAR:3000/wwevents/' + id;
	let response = await fetch(url ,{method: 'DELETE'});
	console.log('Delete Event');
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


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

sortByKey($sevents, "playername");


</script>

<svelte:head>
	<title>WW-Notes</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
</svelte:head>

<main>
	
	<div>
	<h1>WW-Notes</h1>		
{#if $nloaded && $eloaded && $rloaded}		
<table transition:fade="{{ duration: 700 }}">
	<th on:click={e => sorttype = 'playername'}>Player {#if sorttype === 'playername'} <i class="fa fa-arrow-down"></i>{/if}</th>
	<th on:click={e => sorttype = 'type'}>Type {#if sorttype === 'type'} <i class="fa fa-arrow-down"></i>{/if}</th>
	<th on:click={e => sorttype = 'phase'}>Phase {#if sorttype === 'phase'} <i class="fa fa-arrow-down"></i>{/if}</th>
	<th on:click={e => sorttype = 'target1'}>Target 1 {#if sorttype === 'target1'} <i class="fa fa-arrow-down"></i>{/if}</th>
	<th on:click={e => sorttype = 'target2'}>Target 2 {#if sorttype === 'target2'} <i class="fa fa-arrow-down"></i>{/if}</th>
	<th>Result</th>
	<th>Action</th> 
	{#await sortByKey($sevents, sorttype)}
		<p>Loading...</p>
	{:then event}
		{#each event as ev}
			<tr transition:fade="{{ duration: 700 }}"><td>{getUsername(ev.NoteId)}</td>


				<td><select class="style widthHeight" on:change={e => setProperty( ev._id, "type", e.target.value)} bind:value={ev.type} >
					{#each $rroles as role}
							<option value={role}>
							{role}
							</option>
					{/each}
					</select>
				</td>

				<td><input on:change={e => setProperty( ev._id, "phase", e.target.value)} bind:value={ev.phase}></td>

				<td><select on:change={e => setProperty( ev._id, "target1", e.target.value)} bind:value={ev.target1} >
						{#each $noteNames as note}
						<option value={note._id}>
						{note.name}
						</option>
						{/each}
						<option value="">none</option>
					</select>
				</td>


				<td><select on:change={e => setProperty( ev._id, "target2", e.target.value)} bind:value={ev.target2} >
						{#each $noteNames as note}
						<option value={note._id}>
						{note.name}
						</option>
						{/each}
						<option value="">none</option>
					</select>
				</td>


				<td><input on:change={e => setProperty( ev._id, "result", e.target.value)} bind:value={ev.result}>
				</td>


				<td>{#if deleteconfirm} <button transition:fade="{{ duration: 1000 }}" on:click={e => deleteEvent(ev._id) }><i class="fa fa-times-circle"></i></button>{/if}
				</td>
			</tr>
		{/each}

			<!-- Add new entry-->

			<tr>
				<td><select bind:value={nNoteId} >
					{#each $noteNames as note}
					<option value={note._id}>
						{note.name}
					</option>
					{/each}
								
					</select>
				</td>
			
				<td><select bind:value={ntype} >
						{#each $rroles as role}
						<option value={role}>
							{role}
						</option>
							{/each}
						</select>
				</td>

				<td><input bind:value={nphase}></td>

				<td><select bind:value={ntarget1} >
						{#each $noteNames as note}
						<option value={note._id}>
							{note.name}
						</option>
						{/each}
						<option value="">none</option>
						</select>
					</td>
					<td><select bind:value={ntarget2} >
							{#each $noteNames as note}
							<option value={note._id}>
								{note.name}
							</option>
								{/each}
							<option value="" >none</option>
							</select>
					</td>
					<td><input bind:value={nresult}></td>

					<td><button on:click={e => newEvent(ntype, nNoteId, ntarget1, ntarget2, nresult) } disabled={nNoteId === ""}><i class="fa fa-plus-circle"></i></button>
					</td>
				</tr>
						<p class = "rest">Delete Mode: <Switch bind:checked={deleteconfirm}></Switch></p>
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
		font-size: 1.1em;		
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;		
	}
	th,td {
		border: 1px dotted  #ff3e00;
		color: #ff3e00;
		padding: 0px 0px;
		margin: 0px  0px;
		text-align: center; 
    	vertical-align:middle;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}	
	select {
		border: 0;
		color: #ff3e00;
		background-color: black;
		padding: 0px 0px;
		margin: 0px  0px;
		vertical-align: middle;
	}
	input {
		border: #ff3e00;
		color: #ff3e00;
		text-align: center;
		background-color: black;
		padding: 0px 0px;
		margin: 0px  0px;
	}
	p.rest {
		text-align: center;
		color: #ff3e00;
	}
	i.fa.fa-times-circle {
		color: red;
	}
	button {
		background-color: black;
		border: none;
		padding: 0px 0px;
		margin: 0px  0px;
		text-align: center;
	}

	i.fa.fa-plus-circle{
		color: green;

	}
	:root {
		background-color: black;
		font-family: "Helvetica";
	}

	select::-webkit-scrollbar {
  	width: 10px;
  	height: 10px;
	}

	select::-webkit-scrollbar-track {
  	border: orange;
  	background-color: black;
	}

	select::-webkit-scrollbar-thumb {
	background-color: #ff3e00;
	border: 1px solid #ff3e00;
	}

</style>