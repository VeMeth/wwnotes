import { writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);
export const apiData1 = writable([]);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const noteNames = derived(apiData, ($apiData) => {
  return $apiData.map((playernote) => playernote);

  return [];
});

export const wwevents = derived(apiData1, ($apiData1) => {
  return $apiData1.map((wwevent) => wwevent);

  return [];
});

/*
    Create store with initial empty array. Looks kinda like...
        const [animals, set] = useState([])
*/
const { subscribe, set } = writable([]);

// Export subscriptable data. Magic happens here.
export const sevents = { subscribe };

export const getEvents = async () => {
  const response = await fetch('http://localhost:3000/wwevents');
  const api_events = await response.json();

  if (response.ok) {
    console.log('Events updated');
    set(api_events); // Set the store data to API state
  }
};
