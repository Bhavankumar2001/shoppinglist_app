// import React from 'react';

// import './ShoppingList.css';



// class Shoppinglist extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={
//       newItemname :'',
//       geoceryitem : [
//         {name :"bananans" ,id:"item-1",completed : false},
//         {name :"Apple" ,id:"item-2",completed : true},
//         {name :"MAngo" ,id:"item-3",completed : false}
//       ],
//       validationerror :{},
//       submitted :0
//     }

//   this.handleonchange=this.handleonchange.bind(this)
//   this.handletoggle=this.handletoggle.bind(this)
//   this.handleDelete=this.handleDelete.bind(this)
//   this.handleOnSubmit=this.handleOnSubmit.bind(this)
//   this.validateFields=this.validateFields.bind(this)
//   }

//   handleonchange(e){
//     const target=e.target
//     const name=target.name
//     const value=target.value
//     this.setState({
//       [name]:value
//     })
//   }
//   handletoggle(e){
//     const target=e.target
//     const itemindexvalue=target.attributes.itemindex.value
//     const index=parseInt(itemindexvalue,10)
//     const newgeoceryitem=[...this.state.geoceryitem]
//     newgeoceryitem[index].completed=target.checked

//     this.setState({
//       geoceryitem :newgeoceryitem
//     })
//   }
//   handleDelete(e){
//     const target=e.target
//     const itemindexvalue=target.attributes.itemindex.value
//     const index=parseInt(itemindexvalue,10)
//     const newgeoceryitem=[...this.state.geoceryitem]
//     newgeoceryitem.splice(index,1)

//     this.setState({
//        geoceryitem :newgeoceryitem
//     })
//   }



//   handleOnSubmit(e) {
//     e.preventDefault()

//     const isFormValid = this.validateFields()
//     // console.log(isFormValid)
//     if (isFormValid) {
//       const newGroceryItemObject = {
//         completed: false,
//         name: this.state.newItemname
//       }
//       this.setState((state) => {
//         return { 
//           submitted: state.submitted + 1,
//           geoceryitem: [...state.geoceryitem, newGroceryItemObject],
//           newItemname: ''
//         }
//       })
//     }
//   }

//   validateFields() {
//     const {
//       newItemname
//     } = this.state

//     const errors = {}

//     if (!newItemname) {
//       errors['newItemname'] = 'Please enter grocery item name'
//     }

//     this.setState({
//       validationerror :  errors
//     })
//     // console.log(Object.keys(errors).length === 0)
//     return Object.keys(errors).length === 0
//   }

//   render(){
//     const{
//       newItemname :newitemnameerror
//     }=this.state.validationerror

//     const {
//       geoceryitem
//     } = this.state

//   return(
//     <div>
//       <section>
//         <h3>Shopping List</h3>
//         { !geoceryitem.length && <p>No items!</p> }
//         <ul>
//           {
//             geoceryitem.map((item, index) => {
//               return (
//                 // <li key={index}>
//                 <li key={item.id}>
//                   <input
//                     type="checkbox"
//                     checked={item.completed}
//                     onChange={this.handletoggle}
//                     itemindex={index} // lowercase 'itemindex' as per React docs
//                   />
//                   <span>{item.name}</span>
//                   <button
//                     itemindex={index}
//                     onClick={this.handleDelete}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               )
//             })
//           }
//         </ul>
//         <form onSubmit={this.handleOnSubmit}>
//         <span>{newitemnameerror}</span>
//           <label> 
//             <input
//               type="text"
//               name="newItemname"
//               placeholder="Enter New"
//               value={this.state.newItemname}
//               onChange={this.handleonchange}
//             />
           
//           </label>

//           <button type="submit">Submit</button>

//           <p>Submitted {this.state.submitted} times!</p>
//         </form>
//       </section>
//     </div>
//   );
// }
// }
// export default Shoppinglist;
// class based components*********


import React, { useState } from 'react';
import './ShoppingList.css';

function ShoppingList() {
  const [newItemname, setNewItemname] = useState('');
  const [geoceryitem, setGeoceryitem] = useState([
    { name: "Bananas", id: "item-1", completed: false },
    { name: "Apple", id: "item-2", completed: true },
    { name: "Mango", id: "item-3", completed: false }
  ]);
  const [validationerror, setValidationError] = useState({});
  const [submitted, setSubmitted] = useState(0);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValidationError({ ...validationerror, [name]: '' });
    setNewItemname(value);
  }

  const handleToggle = (e, index) => {
    const newGeoceryitem = [...geoceryitem];
    newGeoceryitem[index].completed = e.target.checked;
    setGeoceryitem(newGeoceryitem);
  }

  const handleDelete = (index) => {
    const newGeoceryitem = [...geoceryitem];
    newGeoceryitem.splice(index, 1);
    setGeoceryitem(newGeoceryitem);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFields();
    if (isFormValid) {
      const newGroceryItemObject = {
        completed: false,
        name: newItemname
      };

      setSubmitted(submitted + 1);
      setGeoceryitem([...geoceryitem, newGroceryItemObject]);
      setNewItemname('');
    }
  }

  const validateFields = () => {
    const errors = {};

    if (!newItemname) {
      errors['newItemname'] = 'Please enter grocery item name';
      setValidationError(errors);
      return false;
    }

    setValidationError(errors);
    return true;
  }

  return (
    <div>
      <section>
        <h3>Todo App</h3>
        {!geoceryitem.length && <p>No items!</p>}
        <ul>
          {geoceryitem.map((item, index) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => handleToggle(e, index)}
              />
              <span>{item.name}</span>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
          <span>{validationerror.newItemname}</span>
          <label>
            <input
              type="text"
              name="newItemname"
              placeholder="Enter New"
              value={newItemname}
              onChange={handleOnChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default ShoppingList;

