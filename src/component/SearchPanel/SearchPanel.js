import React, {PropTypes as type} from 'react';
import SideBar from '../SideBar';

const SearchPanel = (props) => (
    <SideBar>

    </SideBar>
);

SearchPanel.propTypes = {
    searchString: type.string,
    searchResult: type.array
};

export default SearchPanel;
