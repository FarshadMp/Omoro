export interface Car {
    id: number;
    name: string;
    image: string;
    type: string;
    year: string;
    location: string;
    rates: {
        daily: number;
        weekly: number;
        monthly: number;
    };
    features: {
        doors: number;
        seats: number;
        transmission: "Auto" | "Manual";
        bags: number;
    };
    specs: {
        engine: string;
        power: string;
        torque: string;
        driveType: string;
        seats: number;
        mileage: string;
    };
}

export const CARS: Car[] = [
    {
        id: 1,
        name: "Audi A3 or Similar",
        image: "/img/car-1.png",
        type: "Sedan",
        year: "2024",
        location: "Dabbab Street, Kuwaiti Building No. 19, Riyadh, KSA",
        rates: { daily: 1599.99, weekly: 4599.99, monthly: 14850 },
        features: { doors: 4, seats: 5, transmission: "Auto", bags: 4 },
        specs: {
            engine: "1984 cc",
            power: "187 bhp",
            torque: "320 Nm",
            driveType: "FWD",
            seats: 5,
            mileage: "14.2 kmpl"
        }
    },
    {
        id: 2,
        name: "MG GT or Similar",
        image: "/img/car-2.png",
        type: "Sedan",
        year: "2024",
        location: "Dabbab Street, Kuwaiti Building No. 19, Riyadh, KSA",
        rates: { daily: 1099.99, weekly: 3599.99, monthly: 10850 },
        features: { doors: 4, seats: 5, transmission: "Auto", bags: 3 },
        specs: {
            engine: "1490 cc",
            power: "173 bhp",
            torque: "250 Nm",
            driveType: "FWD",
            seats: 5,
            mileage: "16.5 kmpl"
        }
    },
    {
        id: 3,
        name: "Kia Sonet 2025",
        image: "/img/car-3.png",
        type: "SUV",
        year: "2025",
        location: "Dabbab Street, Kuwaiti Building No. 19, Riyadh, KSA",
        rates: { daily: 999.99, weekly: 2999.99, monthly: 9850 },
        features: { doors: 4, seats: 5, transmission: "Auto", bags: 4 },
        specs: {
            engine: "1493 cc",
            power: "118 bhp",
            torque: "250 Nm",
            driveType: "FWD",
            seats: 5,
            mileage: "18.4 kmpl"
        }
    },
    {
        id: 4,
        name: "Hyundai Accent",
        image: "/img/car-1.png",
        type: "Sedan",
        year: "2023",
        location: "Dabbab Street, Kuwaiti Building No. 19, Riyadh, KSA",
        rates: { daily: 899.99, weekly: 2599.99, monthly: 8500 },
        features: { doors: 4, seats: 5, transmission: "Auto", bags: 3 },
        specs: {
            engine: "1497 cc",
            power: "113 bhp",
            torque: "144 Nm",
            driveType: "FWD",
            seats: 5,
            mileage: "17.0 kmpl"
        }
    },
    {
        id: 5,
        name: "Toyota Yaris",
        image: "/img/car-2.png",
        type: "Sedan",
        year: "2023",
        location: "Dabbab Street, Kuwaiti Building No. 19, Riyadh, KSA",
        rates: { daily: 850.00, weekly: 2400.00, monthly: 8000 },
        features: { doors: 4, seats: 5, transmission: "Auto", bags: 2 },
        specs: {
            engine: "1329 cc",
            power: "98 bhp",
            torque: "123 Nm",
            driveType: "FWD",
            seats: 5,
            mileage: "20.0 kmpl"
        }
    },
];
