// =========================
// BOOKING SYSTEM
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const bookingForm =
        document.getElementById("bookingForm");

    const carSelect =
        document.getElementById("carSelect");

    const pickupDate =
        document.getElementById("pickupDate");

    const returnDate =
        document.getElementById("returnDate");

    const pickupLocation =
        document.getElementById("pickupLocation");


    // =========================
    // SUMMARY ELEMENTS
    // =========================

    const summaryCarName =
        document.getElementById("summaryCarName");

    const summaryCarCategory =
        document.getElementById("summaryCarCategory");

    const summaryPickup =
        document.getElementById("summaryPickup");

    const summaryReturn =
        document.getElementById("summaryReturn");

    const summaryDays =
        document.getElementById("summaryDays");

    const summaryLocation =
        document.getElementById("summaryLocation");

    const summaryPrice =
        document.getElementById("summaryPrice");

    const summaryDayPrice =
        document.getElementById("summaryDayPrice");

    const summaryTotal =
        document.getElementById("summaryTotal");


    // =========================
    // SET MINIMUM DATE
    // =========================

    const today =
        new Date().toISOString().split("T")[0];

    pickupDate.min = today;

    returnDate.min = today;


    // =========================
    // LOAD CAR OPTIONS
    // =========================

    cars.forEach(car => {

        const option =
            document.createElement("option");

        option.value = car.id;

        option.textContent =
            `${car.name} - ₹${car.price.toLocaleString("en-IN")}/day`;

        carSelect.appendChild(option);

    });


    // =========================
    // GET CAR FROM URL
    // =========================

    const urlParams =
        new URLSearchParams(window.location.search);

    const carId =
        urlParams.get("car");


    if (carId) {

        carSelect.value = carId;

        updateSummary();

    }


    // =========================
    // GET SELECTED CAR
    // =========================

    function getSelectedCar() {

        const selectedId =
            Number(carSelect.value);

        return cars.find(
            car => car.id === selectedId
        );

    }


    // =========================
    // CALCULATE DAYS
    // =========================

    function calculateDays() {

        if (
            !pickupDate.value ||
            !returnDate.value
        ) {

            return 0;

        }


        const pickup =
            new Date(pickupDate.value);

        const returnDay =
            new Date(returnDate.value);


        const difference =
            returnDay - pickup;


        const days =
            difference /
            (1000 * 60 * 60 * 24);


        return days > 0 ? days : 0;

    }


    // =========================
    // UPDATE SUMMARY
    // =========================

    function updateSummary() {

        const selectedCar =
            getSelectedCar();


        const days =
            calculateDays();


        // Car

        if (selectedCar) {

            summaryCarName.textContent =
                selectedCar.name;

            summaryCarCategory.textContent =
                `${selectedCar.category} • ${selectedCar.fuel} • ${selectedCar.seats} Seats`;

            summaryPrice.textContent =
                `₹${selectedCar.price.toLocaleString("en-IN")}`;

        }

        else {

            summaryCarName.textContent =
                "Select a car";

            summaryCarCategory.textContent =
                "Car details will appear here";

            summaryPrice.textContent =
                "₹0";

        }


        // Pickup date

        if (pickupDate.value) {

            summaryPickup.textContent =
                formatDate(pickupDate.value);

        }

        else {

            summaryPickup.textContent =
                "-";

        }


        // Return date

        if (returnDate.value) {

            summaryReturn.textContent =
                formatDate(returnDate.value);

        }

        else {

            summaryReturn.textContent =
                "-";

        }


        // Days

        summaryDays.textContent =
            `${days} ${days === 1 ? "Day" : "Days"}`;


        // Location

        summaryLocation.textContent =
            pickupLocation.value || "-";


        // Price

        if (selectedCar && days > 0) {

            const total =
                selectedCar.price * days;


            summaryDayPrice.textContent =
                `₹${total.toLocaleString("en-IN")}`;


            summaryTotal.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }

        else {

            summaryDayPrice.textContent =
                "₹0";

            summaryTotal.textContent =
                "₹0";

        }

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
    // DATE VALIDATION
    // =========================

    pickupDate.addEventListener(
        "change",
        () => {

            returnDate.min =
                pickupDate.value;

            if (
                returnDate.value &&
                returnDate.value <= pickupDate.value
            ) {

                returnDate.value = "";

            }

            updateSummary();

        }
    );


    returnDate.addEventListener(
        "change",
        updateSummary
    );


    carSelect.addEventListener(
        "change",
        updateSummary
    );


    pickupLocation.addEventListener(
        "change",
        updateSummary
    );


    // =========================
    // FORM SUBMISSION
    // =========================

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "customerEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const selectedCar =
                getSelectedCar();


            const days =
                calculateDays();


            // =========================
            // VALIDATION
            // =========================

            if (name.length < 3) {

                alert(
                    "Please enter a valid full name."
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            const phonePattern =
                /^[6-9][0-9]{9}$/;


            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit Indian mobile number."
                );

                return;

            }


            if (!selectedCar) {

                alert(
                    "Please select a car."
                );

                return;

            }


            if (!pickupDate.value) {

                alert(
                    "Please select pickup date."
                );

                return;

            }


            if (!returnDate.value) {

                alert(
                    "Please select return date."
                );

                return;

            }


            if (days <= 0) {

                alert(
                    "Return date must be after pickup date."
                );

                return;

            }


            if (!pickupLocation.value) {

                alert(
                    "Please select pickup location."
                );

                return;

            }


            // =========================
            // TOTAL PRICE
            // =========================

            const total =
                selectedCar.price * days;


            // =========================
            // BOOKING OBJECT
            // =========================

            const booking = {

                id:
                    "CR" +
                    Date.now(),

                customerName:
                    name,

                email:
                    email,

                phone:
                    phone,

                carId:
                    selectedCar.id,

                carName:
                    selectedCar.name,

                category:
                    selectedCar.category,

                pricePerDay:
                    selectedCar.price,

                pickupDate:
                    pickupDate.value,

                returnDate:
                    returnDate.value,

                rentalDays:
                    days,

                location:
                    pickupLocation.value,

                totalPrice:
                    total,

                bookingDate:
                    new Date().toISOString()

            };


            // =========================
            // SAVE BOOKING
            // =========================

            const existingBookings =
                JSON.parse(
                    localStorage.getItem(
                        "carRentalBookings"
                    )
                ) || [];


            existingBookings.push(booking);


            localStorage.setItem(
                "carRentalBookings",
                JSON.stringify(
                    existingBookings
                )
            );


            // =========================
            // SUCCESS MESSAGE
            // =========================

            alert(
                `Booking Confirmed!\n\n` +

                `Booking ID: ${booking.id}\n` +

                `Car: ${booking.carName}\n` +

                `Name: ${booking.customerName}\n` +

                `Rental Days: ${booking.rentalDays}\n` +

                `Total Amount: ₹${booking.totalPrice.toLocaleString("en-IN")}`
            );


            // =========================
            // RESET FORM
            // =========================

            bookingForm.reset();


            summaryCarName.textContent =
                "Select a car";

            summaryCarCategory.textContent =
                "Car details will appear here";

            summaryPickup.textContent =
                "-";

            summaryReturn.textContent =
                "-";

            summaryDays.textContent =
                "0 Days";

            summaryLocation.textContent =
                "-";

            summaryPrice.textContent =
                "₹0";

            summaryDayPrice.textContent =
                "₹0";

            summaryTotal.textContent =
                "₹0";

        }
    );

});