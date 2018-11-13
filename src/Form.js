import React from "react";

class Form extends React.Component{
    render(){
        return(
                <form onSubmit = {this.props.city}>
                    <input type="text" name="Location" placeholder="Location..."/>
                    <button>Search Weather</button>
                </form>
           
        )
    }
}

export default Form;