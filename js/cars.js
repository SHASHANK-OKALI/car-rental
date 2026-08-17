// =========================
// CAR LISTING
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const carsContainer =
        document.getElementById("carsContainer");

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const fuelFilter =
        document.getElementById("fuelFilter");

    const priceFilter =
        document.getElementById("priceFilter");

    const carCount =
        document.getElementById("carCount");

    const noResults =
        document.getElementById("noResults");


    // If cars page elements don't exist,
    // stop the script.

    if (!carsContainer) {
        return;
    }


    // =========================
    // DISPLAY CARS
    // =========================

    function displayCars(carList) {

        carsContainer.innerHTML = "";


        // No cars

        if (carList.length === 0) {

            noResults.style.display = "block";

            carCount.textContent = "0 Cars";

            return;

        }


        noResults.style.display = "none";


        // Update count

        carCount.textContent =
            `${carList.length} Cars`;


        // Create cards

        carList.forEach(car => {

            const carCard = document.createElement("div");

            carCard.className = "car-card";


            carCard.innerHTML = `

                <div class="car-image-container">

                    <img
                        src="${car.image}"
                        alt="${car.name}"
                    >

                    <span class="availability">

                        ${car.available
                            ? "Available"
                            : "Unavailable"
                        }

                    </span>

                </div>


                <div class="car-card-content">


                    <div class="car-title">

                        <div>

                            <h3>
                                ${car.name}
                            </h3>

                            <span class="car-category">
                                ${car.category}
                            </span>

                        </div>

                    </div>



                    <div class="car-details">

                        <span>

                            <i class="fa-solid fa-gas-pump"></i>

                            ${car.fuel}

                        </span>


                        <span>

                            <i class="fa-solid fa-user-group"></i>

                            ${car.seats} Seats

                        </span>


                        <span>

                            <i class="fa-solid fa-gear"></i>

                            ${car.transmission}

                        </span>

                    </div>



                    <div class="car-card-bottom">

                        <div class="car-price">

                            ₹${car.price.toLocaleString("en-IN")}

                            <small>
                                /day
                            </small>

                        </div>


                        ${
                            car.available

                            ?

                            `
                            <a
                                href="booking.html?car=${car.id}"
                                class="small-book-btn"
                            >
                                Book Now
                            </a>
                            `

                            :

                            `
                            <button
                                class="small-book-btn"
                                disabled
                            >
                                Unavailable
                            </button>
                            `
                        }

                    </div>

                </div>

            `;


            carsContainer.appendChild(carCard);

        });

    }



    // =========================
    // FILTER CARS
    // =========================

    function filterCars() {

        let filteredCars = [...cars];


        // Search

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        if (searchText !== "") {

            filteredCars =
                filteredCars.filter(car =>

                    car.name
                        .toLowerCase()
                        .includes(searchText)

                );

        }


        // Category

        const category =
            categoryFilter.value;


        if (category !== "all") {

            filteredCars =
                filteredCars.filter(car =>

                    car.category === category

                );

        }


        // Fuel

        const fuel =
            fuelFilter.value;


        if (fuel !== "all") {

            filteredCars =
                filteredCars.filter(car =>

                    car.fuel === fuel

                );

        }


        // Price sorting

        const price =
            priceFilter.value;


        if (price === "low") {

            filteredCars.sort(
                (a, b) => a.price - b.price
            );

        }


        if (price === "high") {

            filteredCars.sort(
                (a, b) => b.price - a.price
            );

        }


        displayCars(filteredCars);

    }



    // =========================
    // EVENT LISTENERS
    // =========================

    searchInput.addEventListener(
        "input",
        filterCars
    );


    categoryFilter.addEventListener(
        "change",
        filterCars
    );


    fuelFilter.addEventListener(
        "change",
        filterCars
    );


    priceFilter.addEventListener(
        "change",
        filterCars
    );


    // Initial display

    displayCars(cars);

});