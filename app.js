let cLog= console.log;

let favoriteCityId = "rome";
cLog(favoriteCityId);

favoriteCityId = "paris";
cLog(favoriteCityId);

const citiesId= ['paris','nyc','rome','rio-de-janeiro'];
citiesId.push('tokyo');
cLog(citiesId);

//citiesId = [];
//citiesId= [... "tokyo"] 
cLog(citiesId);

function getWeather(cityId){
    let city= cityId.toUpperCase();
    let temperature= 20;
    return {
        city,
        temperature
    };
}

const weather= getWeather(favoriteCityId);
cLog(weather);

const {
    city,
    temperature
} = weather;
cLog(city);
cLog(temperature);

let [parisId, nycId, ...othersCitiesId] = citiesId;
cLog(parisId);
cLog(nycId);
cLog(othersCitiesId.length);

class Trip{
    constructor(id, name, imageUrl){   
        this.id= id;
        this.name= name;
        this.imageUrl= imageUrl;
    }

    toString(){
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this.price}]`;
    }

    get price(){
        return this._price;
    }

    set price(newPrice){
        this._price= newPrice;
    }

    static getDefaultTrip(){
        return new Trip("rio-de-janeiro","Rio de Janeiro","img/rio-de-janeiro.jpg");
    }
}

let parisTrip= new Trip("paris", "Paris", "img/paris.jpg");
cLog(parisTrip);

cLog(parisTrip.toString());

parisTrip.price= 100;

cLog(parisTrip.toString());

cLog(Trip.getDefaultTrip().toString());

class FreeTrip extends Trip{
    constructor(id, name, imageUrl){   
        super(id, name, imageUrl);
        this.price= 0;
    }

    toString(){
        return "Free"+super.toString();
    }
}

const freeTrip= new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
cLog(freeTrip.toString());

class TripService {
    constructor() {
            this.trips = new Set();
            this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
            this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
            this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
        }
    
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {

                this.trips.forEach(trip => {
                    if(trip.name === tripName){
                        resolve(trip);
                    }
                });

                reject(`No trip found with name ${tripName}`);
            // ici l'exécution du code est asynchrone
            // TODO utiliser resolve et reject en fonction du résultat de la recherche
            }, 2000);
        });
    }
}

class PriceService {
    constructor() {
        this.prices = new Map();
        this.prices.set('paris', 100);
        this.prices.set('rio-de-janeiro', 800);
        // TODO Map of 2 trips
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout( () => {

                const price = this.prices.get(tripId);

                if(price){
                    resolve(price);
                }else{
                    reject(`No price found for trip ${tripId}`);
                }
            // ici l'exécution du code est asynchrone
            // TODO utiliser resolve et reject en fonction du résultat de la recherche
            }, 2000)
        });
    }
}

const nomVoyage= "Paris";

const tripService= new TripService();

tripService.findByName(nomVoyage)
    .then(trip => (new PriceService).findPriceByTripId(trip.id))
    .then(price => console.log(`Price found for trip ${nomVoyage}: ${price}`))
    .catch(err => console.log(err));

