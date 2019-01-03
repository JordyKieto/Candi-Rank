import React, { Component } from 'react';
import DetailsView from './DetailsView'
class CandidateFeed extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        selected: null
    }

     /** 
     *function select_candidate
     *updates state to newly selected candidate
     *member of CandidateFeed class
     *param - candidate {object} - the selected candidate
     *returns  {Null}  
    */
    select_candidate = (candidate) =>{
        this.setState({
          selected: candidate
        })
      }
    render() {
        var that = this;
        var props_candidates = this.props.candidates.map(function (feedItem) {
            return (
            <div    
                    className="imgDiv" key={`div ${feedItem.id}`}
            >
                <img
                    id={feedItem.id.toString().concat('-feedImg')} 
                    className="feedItem" 
                    src={feedItem.img_src}
                    onClick={() => that.select_candidate(feedItem)}
                    key={`${feedItem.id}`}
                />
            </div>
            )
        });
        return (
        <div>
            <div id="newsfeed"> 
                {props_candidates}
            </div>
            <div id="details-view"> 
            <DetailsView selected={this.state.selected}/>
            </div>
        </div>
    )
    }
};


export { CandidateFeed as default }