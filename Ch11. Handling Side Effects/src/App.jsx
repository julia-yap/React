import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// This code does not need to be wrapped with useEffect because accessing
// localStorage is synchronous with rendering the App component.
// Futheremore, since we only need to fetch the data at the start of application,
// we can move it out of the component.
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvialablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {}, []);

  // useEffect does not return values. Also the side effect function gets
  // called AFTER React is done rendering the App component.
  useEffect(() => {
    /* 1. Get user location as early as possible (i.e., when the app starts).
    Fetching the data takes time, therefore it takes in a callback function 
    which will be executed once the data is obtained. */
    navigator.geolocation.getCurrentPosition((pos) => {
      // As mentioned earlier, this code will likely be executing after all
      // App components are rendered. This entire code is a side effect, as
      // the main goal of component functions is to return renderable JSX codes.
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        pos.coords.latitude,
        pos.coords.longitude,
      );

      // 2. We want to render places based on the distance from user. But the data
      // won't be available in time to be passed to <Places />. We need to make use of
      // useState() so that App is rendered with sorted data.
      setAvialablePlaces(sortedPlaces);
      // This triggres a new render cycle. BUT, causes an infinite loop.
      // With new execution of App, position is fetched again, callback function as
      // well as setAvailablePlaces is called again.

      // SOLUTION: Wrap the code with useEffect()
    });
  }, []);
  // useEffect gets reexecuted when dependencies change values. With empty list,
  // it is only executed once. If omitted, it is executed at every render cycle.

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // This code is also a side effect, but does not need useEffect.
    // There is no state update, and even if there were, it only happens
    // when there is user interaction, not when the app reexecutes (no inf loop).
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) == -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]),
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    modal.current.close();

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)),
    );
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
