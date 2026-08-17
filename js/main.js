document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // FEATURED CARS
    // =========================

    const featuredCars = document.getElementById("featuredCars");

    if (featuredCars) {

        const featured = cars.slice(0, 3);

        featuredCars.innerHTML = featured.map(car => {

            return `
                <div class="car-card">

                    <div class="car-image-container">

                        <img
                            src="${car.image}"
                            alt="${car.name}"
                        >

                        <span class="availability">
                            ${car.available ? "Available" : "Unavailable"}
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


                            <a
                                href="booking.html?car=${car.id}"
                                class="small-book-btn"
                            >
                                Book
                            </a>

                        </div>

                    </div>

                </div>
            `;

        }).join("");

    }


    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }

});