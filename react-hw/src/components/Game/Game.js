import React, {Component} from "react";
import Nav from "../Nav";
import data from "../../data.json";
import Container from "../Container";
import ClickItem from "../clickItem"


class Game extends Component {
    //declare default score board
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount(){
        //shuffle card when component mount
        this.setState({data: this.shuffleData(this.state.data)});
    }

    handleCorrectGuess = newData => {
        //set logic for counting score
        const{topScore, score } = this.state;
        const newScore = score + 1;
        const newTopScore = newScore > topScore ? newScore : topScore;
        //if correctly guess the card, set score to this and reshuffle card
        this.setState({
            data: this.shuffleData(data),
            score: newScore,
            topScore: newTopScore
        });
    };

    //reset score if guess incorrectly, retain top score, reshuffle
    handleIncorrectGuess = newData => {
        this.setState({
            data: this.resetData(data),
            score:0
        });
    };

    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false }));
        return this.shuffleData(resetData);
      };
      
    //borrow this from online, ask TA or Sammy for logic
    
    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          i--;
        }
        return data;
      };

      render() {
        return ( 
        	
    			<div>
                    <Nav score={this.state.score} topScore={this.state.topScore} />
                    <Container>
                        {this.state.data.map(item => (
                            <ClickItem
                            key={item.id}
                            id={item.id}
                            shake={!this.state.score && this.state.topScore}
                            handleClick={this.handleItemClick}
                            image={item.image}
                            />
                        ))}
                    </Container>
                </div>
            
        );
      }



}

export default Game;