import { get, writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);
export const apiData1 = writable([]);
export const apiData2 = writable([]);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const noteNames = derived(apiData, ($apiData) => {
  console.log('updating noteNames');
  return $apiData.map((playernote) => playernote);
});

export const wwevents = derived(apiData1, ($apiData1) => {
  return $apiData1.map((wwevent) => wwevent);
});

export const rroles = derived(apiData2, ($apiData2) => {
  return $apiData2.map((rrroles) => rrroles);
});

const { subscribe, set } = writable([]);

export const sevents = { subscribe };

function getUsername(uid) {
  const foundnote = get(noteNames).find((obj) => obj._id === uid);

  return foundnote ? foundnote.name : '';
}

export const getEvents = async () => {
  const response = await fetch('http://process.env.API_HOST:3000/wwevents');
  const api_events = await response.json();

  if (response.ok) {
    console.log('Events updated');
    for (const ae of api_events) {
      const playername = getUsername(ae.NoteId);
      //console.log('noteNames = ', get(noteNames));
      ae.playername = playername;
    }
    //console.log(api_events);
    set(api_events); // Set the store data to API state
  }
};
