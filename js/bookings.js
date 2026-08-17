// =========================
// MY BOOKINGS
// =========================

document.addEventListener("DOMContentLoaded", () => {


    const bookingsContainer =
        document.getElementById(
            "bookingsContainer"
        );


    const emptyBookings =
        document.getElementById(
            "emptyBookings"
        );


    const totalBookings =
        document.getElementById(
            "totalBookings"
        );


    const carsRented =
        document.getElementById(
            "carsRented"
        );


    const totalSpent =
        document.getElementById(
            "totalSpent"
        );


    // =========================
    // LOAD BOOKINGS
    // =========================

    function getBookings() {

        return JSON.parse(
            localStorage.getItem(
                "carRentalBookings"
            )
        ) || [];

    }


    // =========================
    // DISPLAY BOOKINGS
    // =========================

    function displayBookings() {

        const bookings =
            getBookings();


        bookingsContainer.innerHTML = "";


        // =========================
        // EMPTY STATE
        // =========================

        if (bookings.length === 0) {

            bookingsContainer.style.display =
                "none";

            emptyBookings.style.display =
                "block";

            updateStatistics([]);

            return;

        }


        bookingsContainer.style.display =
            "flex";

        emptyBookings.style.display =
            "none";


        // =========================
        // STATISTICS
        // =========================

        updateStatistics(bookings);


        // =========================
        // CREATE BOOKING CARDS
        // =========================

        bookings
            .slice()
            .reverse()
            .forEach(booking => {


                const card =
                    document.createElement("div");


                card.className =
                    "booking-history-card";


                card.innerHTML = `

                    <!-- Car -->

                    <div class="history-car">

                        <div class="history-car-icon">

                            <i class="fa-solid fa-car"></i>

                        </div>


                        <div>

                            <h3>
                                ${booking.carName}
                            </h3>

                            <p>
                                ${booking.category}
                            </p>

                            <span class="booking-id">

                                Booking ID:
                                ${booking.id}

                            </span>

                        </div>

                    </div>


                    <!-- Details -->

                    <div class="history-details">


                        <div class="history-detail">

                            <span>
                                Pickup
                            </span>

                            <strong>
                                ${formatDate(
                                    booking.pickupDate
                                )}
                            </strong>

                        </div>


                        <div class="history-detail">

                            <span>
                                Return
                            </span>

                            <strong>
                                ${formatDate(
                                    booking.returnDate
                                )}
                            </strong>

                        </div>


                        <div class="history-detail">

                            <span>
                                Rental Days
                            </span>

                            <strong>
                                ${booking.rentalDays} Days
                            </strong>

                        </div>


                        <div class="history-detail">

                            <span>
                                Location
                            </span>

                            <strong>
                                ${booking.location}
                            </strong>

                        </div>

                    </div>


                    <!-- Price -->

                    <div class="history-action">

                        <span class="history-price">

                            ₹${booking.totalPrice
                                .toLocaleString("en-IN")}

                        </span>


                        <button
                            class="cancel-btn"
                            data-id="${booking.id}"
                        >

                            <i class="fa-solid fa-trash"></i>

                            Cancel

                        </button>

                    </div>

                `;


                bookingsContainer.appendChild(card);

            });


        // =========================
        // CANCEL BUTTONS
        // =========================

        const cancelButtons =
            document.querySelectorAll(
                ".cancel-btn"
            );


        cancelButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    cancelBooking(
                        button.dataset.id
                    );

                }
            );

        });

    }


    // =========================
    // UPDATE STATISTICS
    // =========================

    function updateStatistics(bookings) {

        totalBookings.textContent =
            bookings.length;


        carsRented.textContent =
            bookings.length;


        const spent =
            bookings.reduce(
                (total, booking) =>
                    total + booking.totalPrice,
                0
            );


        totalSpent.textContent =
            `₹${spent.toLocaleString("en-IN")}`;

    }


    // =========================
    // CANCEL BOOKING
    // =========================

    function cancelBooking(bookingId) {


        const confirmation =
            confirm(
                "Are you sure you want to cancel this booking?"
            );


        if (!confirmation) {

            return;

        }


        let bookings =
            getBookings();


        bookings =
            bookings.filter(
                booking =>
                    booking.id !== bookingId
            );


        localStorage.setItem(
            "carRentalBookings",
            JSON.stringify(bookings)
        );


        alert(
            "Booking cancelled successfully."
        );


        displayBookings();

    }


    // =========================
    // FORMAT DATE
    // =========================

    function formatDate(dateString) {

        const date =
            new Date(dateString);


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",

                month: "short",

                year: "numeric"
            }
        );

    }


    // =========================
    // INITIAL LOAD
    // =========================

    displayBookings();

});