import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailsView from '../components/DetailsView';
import CandidateFeed from '../components/CandidateFeed';

Enzyme.configure({adapter: new Adapter()});
it('detailsview can change view', () => {
    var details = shallow(<DetailsView />);
    var old_view = details.state().view;
    details.instance().change_view();
    var new_view = details.state().view;
    expect(old_view).not.toBe(new_view);
});
it('detailsview can update new comment', () => {
    var details = shallow(<DetailsView />);
    var mock_event = {target: {value: 'plain-text'}};
    details.instance().update_new_comment(mock_event);
    var result = details.state().new_comment;
    expect(result).toEqual(mock_event.target.value);
});
it('candidatefeed renders img with correct src', () => {
    var mock_candidates = [{"id": 1, img_src: '/'},{"id": 2, "img_src": '/'},{"id": 3, "img_src": '/'},{"id": 4, "img_src": '/'}];
    var candidatefeed = shallow(<CandidateFeed candidates={mock_candidates} />);
    var result = candidatefeed.find('img').first().prop("src");
    expect(result.src).toEqual(mock_candidates[0].src)
});