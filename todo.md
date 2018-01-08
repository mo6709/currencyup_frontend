state = {
    seassion: { authenticated: false }
    account: {
        <!-- the account data -->
        type: 'investor',
        title: '',
        name: 'Moshe Levi',
        investments: ['ddfsfsdf', 'sdfsdfs', 'sdfsdf']
    },
    currencies: [
        {name: "BitCoin", rate: 11.000, region: "world wild"},
        {name: "Etherioum", rate: 400, region: "world wild"}
    ],
    investments: [],
    corporation: []  
 }

 1) fix the catch login and signup error
 2)implement switch for all nested routes
 3)implement onEnter for secure routes
4)fix the errors display in signupForm to display the the errors properly
5)implement all the backend api calls inside of ApiServise component
6)implement authorization for component that require authrization with componeent lifeCycle  componenetWillMount() only if autherized check the local storage

7)redux localstorage middleware: redux hot loader, redux-localstorage-simple 