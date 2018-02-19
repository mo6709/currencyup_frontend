import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

class LikeButton extends Component{
	constructor(){
		super();

		this.state = {
			likes: 0
		}
	}

	handleClick = (event) => {
        event.preventDefault();
        const newLikes = this.state.likes;
        this.setState({ likes: newLikes +1 });
	}

	render(){
	    return(
            <div>
			    <Button as='div' labelPosition='right'>
			      <Button color='red' name='upvote' onClick={this.handleClick}>
			        <Icon name='thumbs up' />
			      </Button>
			      <Label as='a' basic color='red' pointing='left'>{this.state.likes}</Label>
			    </Button><br/>
			    
			    
		    </div>
	    )
	}
} 

export default LikeButton;