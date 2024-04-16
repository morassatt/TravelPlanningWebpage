document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        api_url: 'https://whapi.dev.velmax.tech/api',
        path: window.location.pathname,
        scroll_y: 0,
        auth: {
            access_token: null,
            user: null,
            email: "edwin@gmail.com",
            password: "pass1234",
            isAdmin: false,
        },
        user: {
            first_name: null,
            last_name: null,
            username: null,
            email:null,
            phone:null,
            password: null
        },
        users: [],
        cities: [],
        city: {
            name: null,
            country: null,
            state: null,
            region: null
        },

        accommodations: [],
        accommodation: {
            accommodation_name: null,
            description: null,
            city_id: null
        },

        activities: [],
        activity: {
            activity_name: null,
            description: null,
            city_id: null
        },

        flights: [],
        flight: {
            flight_company: null,
            flight_cost: null,
            city_id: null,
            flight_date: null
        },
        property_types: [],
        property_type: {
            name: null,
            description: null,
            city_id: null
        },

        travel_plans: [],
        my_travel_plans: [],
        travel_plan: {
            user_id: null,
            travel_date: null,
            people_count: null,
            description: null,
            city_id: null,
            accommodation_id: null,
            activity_id: null,
            flight_id: null
        },

        // form state
        formState: null,
         //init
        init() {
            axios.defaults.baseURL = this.api_url;
            if (Cookies.get('auth')) {
                this.auth = JSON.parse(Cookies.get('auth'))
            }
            if(this.auth.access_token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.auth.access_token;
                this.getUsers()
                this.getCities()
                this.getAtivities()
                this.getPropertyTypes()
                this.getFlights()
                this.getTravelPlans()
                this.getAccommodations()
                this.user.id = this.auth.user.user_id
            }
            this.redirect()
        },

        //redirect
        redirect(){
            if(this.auth.access_token && this.path == '/dashboard.html' && this.isAdmin){
                window.location.href = '/admin/dashboard.html'
            }

            if(this.auth.access_token && this.path == '/login.html'){
                window.location.href = '/dashboard.html'
            }
            if(!this.auth.access_token && this.path == '/dashboard.html'){
                window.location.href = '/login.html'
            }
        },

        // login
        login(){
            axios.post('auth/login', {
                email: this.auth.email,
                password: this.auth.password
            })
            .then(response => {
                this.auth.isAdmin = false
                this.auth.access_token = response.data.access_token
                this.auth.user = response.data.user
                Cookies.set('auth', JSON.stringify(this.auth))
                window.location.href = '/dashboard.html'
                //this.getUsers()
                
            })
            .catch(error => {
                console.log(error);
            })
        },

        //register
        register(){
            axios.post('auth/register', this.user)
            .then(response => {
                window.location.href = '/login.html'
            })
            .catch(error => {
                console.log(error);
            })
        },

        // check admin
        isAdmin(){
            console.log(this.users)
            if(this.users[0].email == this.auth.email){
                this.auth.isAdmin = true
            }
            Cookies.set('auth', JSON.stringify(this.auth))
        },

        // logout
        logOut(){
            this.auth.access_token = null
            this.auth.isAdmin = false
            Cookies.set('auth', JSON.stringify(this.auth))
            window.location.href = '/index.html'
           
        },

        //users
        getUsers(){
            axios.get('users')
            .then(response => {
                this.users = response.data.users
                this.isAdmin()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // cities
        getCities(){
            axios.get('cities')
            .then(response => {
                this.cities = response.data.cities
                console.log(this.cities)
            })
            .catch(error => {
                console.log(error);
            })
        },

        // create city
        createCity(){
            axios.post('cities', this.city)
            .then(response => {
                this.resetForms()
                this.getCities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select city
        selectCity(id){
            this.formState = 'edit'
            for (var i = this.cities.length; i--;) {
                if (this.cities[i]["id"] == id) {
                    this.city = this.cities[i]
                }
            }
            
        },

        // edit city
        editCity(){
            axios.put('city/' + this.city.id, this.city)
            .then(response => {
                this.resetForms()
                this.getCities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // delete city
       deleteCity(){
            axios.delete('city/' + this.city.id)
            .then(response => {
                this.resetForms()
                this.getCities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // get city name
        getCityName(id){
            for (var i = this.cities.length; i--;) {
                 
                if (this.cities[i]["id"] == id) {
                    return this.cities[i]["name"]
                }
            }
        },

        getUserName(id){
                for (var i = this.users.length; i--;) {
                     
                    if (this.users[i]["id"] == id) {
                        return this.users[i]["first_name"] + ' ' + this.users[i]["last_name"]
                    }
                }
             
        },

        // get activities
        getAtivities(){
            axios.get('activities')
            .then(response => {
                this.activities = response.data.activities
            })
            .catch(error => {
                console.log(error);
            })
        },

        
        // create activity
        createActivity(){
            axios.post('activities', this.activity)
            .then(response => {
                this.resetForms()
                this.getAtivities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select activity
        selectActivity(id){
            this.formState = 'edit'
            for (var i = this.activities.length; i--;) {
                if (this.activities[i]["id"] == id) {
                    this.activity = this.activities[i]
                }
            }
            
        },

        // edit activity
        editActivity(){
            //console.log(this.activity)
            axios.put('activity/' + this.activity.id, this.activity)
            .then(response => {
                this.resetForms()
                this.getActivities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // delete activity
       deleteActivity(){
            axios.delete('activity/' + this.activity.id)
            .then(response => {
                this.resetForms()
                this.getActivities()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // get accommodations
        getAccommodations(){
            axios.get('accommodations')
            .then(response => {
                this.accommodations = response.data.accommodations
            })
            .catch(error => {
                console.log(error);
            })
        },

        // create accommodation
        createAccommodation(){
            //console.log(this.accommodation)
            axios.post('accommodations', this.accommodation)
            .then(response => {
                this.resetForms()
                 this.getAccommodations()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select Acc
        selectAccommodation(id){
            
            this.formState = 'edit'
            for (var i = this.accommodations.length; i--;) {
                if (this.accommodations[i]["id"] == id) {
                    this.accommodation = this.accommodations[i]
                }
            }
            console.log(this.accommodation)
        },

        // edit accommodation
        editAccommodation(){
            //console.log(this.accommodation)
            axios.put('accommodation/' + this.accommodation.id, this.accommodation)
            .then(response => {
                this.resetForms()
                this.getAccommodations()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // delete accommodation
        deleteAccommodation(){
            axios.delete('accommodation/' + this.accommodation.id)
            .then(response => {
                this.resetForms()
                this.getAccommodations()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // get flights
        getFlights(){
            axios.get('flights')
            .then(response => {
                this.flights = response.data.flights
            })
            .catch(error => {
                console.log(error);
            })
        },

        // create flight
        createFlight(){
            axios.post('flights', this.flight)
            .then(response => {
                this.resetForms()
                 this.getFlights()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select Flight
        selectFlight(id){
            this.formState = 'edit'
            for (var i = this.flights.length; i--;) {
                if (this.flights[i]["id"] == id) {
                    this.flight = this.flights[i]
                }
            }
            
        },

        // edit flight
        editFlight(){
            axios.put('flight/' + this.flight.id, this.flight)
            .then(response => {
                this.resetForms()
                this.getFlights()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // delete flight
        deleteFlight(){
            axios.delete('flight/' + this.flight.id)
            .then(response => {
                this.resetForms()
                this.getFlights()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // get property_types
        getPropertyTypes(){
            axios.get('property_types')
            .then(response => {
                this.property_types = response.data.property_types
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select Property Type
        selectPropertyType(id){
            this.formState = 'edit'
            for (var i = this.property_types.length; i--;) {
                if (this.property_types[i]["id"] == id) {
                    this.property_type = this.property_types[i]
                }
            }
            
        },

        // edit flight
        editPropertyType(){
            axios.put('property_type/' + this.property_type.id, this.property_type)
            .then(response => {
                this.resetForms()
                this.getPropertyTypes()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // delete property type
        deletePropertyType(){
            axios.delete('property_type/' + this.property_type.id)
            .then(response => {
                this.resetForms()
                this.getPropertyTypes()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // create property type
        createPropertyType(){
            axios.post('property_types', this.property_type)
            .then(response => {
                this.resetForms()
                 this.getPropertyTypes()
            })
            .catch(error => {
                console.log(error);
            })
        },

        // get travel plans
        getTravelPlans(){
            axios.get('travel_plans')
            .then(response => {
                this.travel_plans = response.data.travel_plans
                this.my_travel_plans = []
                for (var i = this.travel_plans.length; i--;) {
                    if (this.travel_plans[i]["user_id"] == this.auth.user.user_id) {
                        this.my_travel_plans.push(this.travel_plans[i])
                    }
                }

                console.log(this.my_travel_plans)
            })
            .catch(error => {
                console.log(error);
            })
        },

         // create travel plane
         createTravelPlan(){
            this.travel_plan.user_id = this.auth.user.user_id
            console.log(this.travel_plan)
            axios.post('travel_plans', this.travel_plan)
            .then(response => {
                this.resetForms()
                 this.getTravelPlans()
                 this.formState = null
            })
            .catch(error => {
                console.log(error);
            })
        },

        // select travel plan
        loadTravelPlan(id){
            this.formState = 'edit'
            for (var i = this.travel_plans.length; i--;) {
                if (this.travel_plans[i]["id"] == id) {
                    this.travel_plan = this.travel_plans[i]
                }
            }            
        },

        // edit travel plane
         editTravelPlan(){
            this.travel_plan.user_id = this.auth.user.user_id
            axios.put(`travel_plan/${this.travel_plan.id}`, this.travel_plan)
            .then(response => {
                this.resetForms()
                 this.getTravelPlans()
                 this.formState = null
            })
            .catch(error => {
                console.log(error);
            })
        },

         // delete travel plane
         deleteTravelPlan(){
            this.travel_plan.user_id = this.auth.user.user_id
            axios.delete(`travel_plan/${this.travel_plan.id}`)
            .then(response => {
                this.resetForms()
                 this.getTravelPlans()
                 this.formState = null
            })
            .catch(error => {
                console.log(error);
            })
        },
        

        // reset forms
        resetForms(){
            this.formState = null
            this.city = {
                name: null,
                country: null,
                state: null,
                region: null
            }
            this.activity = {
                activity_name: null,
                description: null,
                city_id: null
            }
            this.accommodation = {
                accommodation_name: null,
                description: null,
                city_id: null
            }
            this.user = {
                first_name: null,
                last_name: null,
                username: null,
                email:null,
                phone:null,
                password: null
            }
            this.property_type = {
                name: null,
                description: null,
                city_id: null
            }
            this.travel_plan = {
                user_id: null,
                travel_date: null,
                people_count: null,
                description: null,
                city_id: null,
                accommodation_id: null,
                activity_id: null,
                flight_id: null
            }
        },

    })
})