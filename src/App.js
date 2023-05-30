//import { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import CardList from "./components/card-list/card-list-component";
import SearchBox from './components/search-box/search-box-component';

//Render #1

const App = () => {

    const [searchField, setSearchField] = useState('');
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    // since there are no depencies, this will only render once
    // as in didComponentMount
    useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
    }, []);

    useEffect(()=> {
      const newFilteredMonsters = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField);

      });
      setFilteredMonsters(newFilteredMonsters);
    }, [monsters, searchField]);

    const onSearchChange = (event) => {
          const searchFieldString = event.target.value.toLocaleLowerCase();
          setSearchField(searchFieldString);
    }

    
    return(
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
        className = 'search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search-monsters'
      />

      <CardList monsters={filteredMonsters} />
      </div>
    )
}


// class App extends Component{

//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }; 
//   }

//   //happens only once, the moment that the component renders.
//   //Render #3
//   componentDidMount(){
//       fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//           return {monsters: users}
//       },
//       () => {
//           console.log(this.state);
//       }
//       ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(
//       () => {
//       return {searchField};
//     });
//   };

  
//   //Render #2
//   render(){

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
    
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

    
//     return (
//       <div className='App'>
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox 
//         className = 'search-box'
//         onChangeHandler={onSearchChange} 
//         placeholder='search-monsters'
//         />
    
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     )
//   }
// }

export default App;
