import React, { Component } from 'react';
import Controller from '../controller'

class DetailsView extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        view: null,
        selected_video: null,
        selected_video_comments: [],
        selected_index: null,
        new_comment: null
    }

    /** 
     *function change_view
     *changes the view and sets state
     *member of DetailsView class
     *returns  {Null}  
    */
    change_view = () => {
        var that = this;
        if (that.state.view == null) {
            that.setState({
                view: 'videos'
            })
        }
        else if (that.state.view == 'videos'){
            that.setState({
                view: null
            })
        }
    }
    /** 
     *function updateCandidate
     *updates state to match input of new comment field
     *member of DetailsView class
     *param - e {object} - event object
    *returns  {Null}  
    */
    update_new_comment = (e) => {
        this.setState({
            new_comment: e.target.value
        })
    }

     /** 
     *function change_video
     *changes the state to match selected video
     *member of DetailsView class
     *param - response {object} - the db item  / index {int} - index of selected properties
     *returns  {Null}        
    */
    change_video = (response, index) => {
        this.setState({
            selected_video: response.src,
            selected_video_comments: response.comments,
            selected_index: index
        })
    }

    /** 
     *function add_comment
     *adds comment to candidate
     *member of DetailsView class
     *param - e {object} - event object
     *returns  {Null}  
    */
    add_comment = async (e) => {
        var that = this;
        if (e.keyCode == 13) {
            var new_comments = that.props.selected.video_responses[this.state.selected_index].comments;
            new_comments.push(that.state.new_comment);
            var updated_candidate = that.props.selected;
            updated_candidate.video_responses[that.state.selected_index].comments = new_comments;
            var response = await Controller.updateCandidate(this.props.selected.id, updated_candidate);
            this.setState({
                selected_video_comments: response.video_responses[this.state.selected_index].comments,
            })
        }
        
    }
    render() {
        var that = this;
        if (!this.props.selected) {
            // no selection view
            return(
                <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <h1 className="display-4">Select a candidate to see details</h1>
                  <p className="lead">Add comments to specific videos!</p>
                </div>
              </div>
            )
        }
        else if (this.state.view == 'videos') {
            // video view
            var questions = this.props.selected.video_responses.map(function(response, index) {
                return(
                    <input readOnly className="form-control form-control-lg comments" type="text" placeholder={response.question}
                    onClick={() => that.change_video(response, index)}/>
                )
            });
            var comments = this.state.selected_video_comments.map(function(comment){
                return(
                    <input readOnly className="form-control form-control-lg comments" type="text" placeholder={comment}/>
                )
            })
            return(
                <div className="container portfolio">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading">				
                                <img src="https://image.ibb.co/cbCMvA/logo.png" />
                                <img className="view-switch" src="http://icons.iconarchive.com/icons/dtafalonso/android-l/256/Youtube-icon.png" onClick={that.change_view} />
                            </div>
                        </div>	
                    </div>
                        <iframe className="video" src={that.state.selected_video}></iframe>
                        <div id="questions">
                        <p className="h3">Questions</p>
                        {questions}
                        </div>
                        <div id="comments">
                        <p className="h3">My Comments</p>
                        {comments}
                        </div>
                        <input className="form-control form-control-lg input-comments" type="text" placeholder="add a comment..." onKeyDown={that.add_comment} onChange={that.update_new_comment} />
                </div>
            )
        }
        else{
            // application view
            var comments = this.props.selected.comments.map(function(comment){
                return(
                    <input readOnly className="form-control form-control-lg comments" type="text" placeholder={comment}/>
                )
            })
            return(
                <div className="container portfolio">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading">				
                            <img src="https://image.ibb.co/cbCMvA/logo.png" />
                            <img className="view-switch" src="http://icons.iconarchive.com/icons/dtafalonso/android-l/256/Youtube-icon.png" onClick={that.change_view} />
                        </div>
                    </div>	
                </div>
                <div className="bio-info">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bio-image">
                                        <img className="profile-img" src={this.props.selected.img_src} alt="image" />
                                    </div>			
                                </div>
                            </div>	
                        </div>
                        <div className="col-md-6">
                            <div className="bio-content">
                                <h1>Hi there, I'm {this.props.selected.name}</h1>
                              <img className="application-view" src={this.props.selected.application_src} alt="No application yet submitted"/>
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
            )
        }
    }
};
export { DetailsView as default }