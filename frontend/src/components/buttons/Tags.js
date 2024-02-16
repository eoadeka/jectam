import styled from 'styled-components';

// Category
export const TagSpanCategory = styled.small`
    margin-right: 1em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    font-size: .8em;
    white-space:nowrap;
    background-color: ${props => 
        props.category === 'Feature Devt' ? 'lightgreen'
        : props.category === 'Backend Devt' ? 'chocolate'
        : props.category === 'Frontend Devt' ? 'lightblue'
        : props.category === 'UI Design' ? 'lightpink'
        : 'orange'
    };
`;

// Status
export const TagSpanStatus = styled.small`
    margin-right: 1em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    font-size: .8em;
    background-color: ${props => 
        props.status === 'To do' ? 'lightgray'
        : props.status === 'In Progress' ? 'lightblue'
        : props.status === 'Done' ? 'lightgreen'
        : 'orange'
    };
`;

// Priority
export const TagSpanPriority = styled.small`
    margin-right: 1em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    font-size: .8em;
    background-color: ${props => 
        props.priority === 'High' ? 'lightcoral'
        : props.priority === 'Medium' ? 'yellow'
        : props.priority === 'Low' ? 'yellowgreen'
        : 'orange'
    };
`;

// Priority
export const EditMode = styled.small`
    margin-right: 1em;
    padding: .5em;
    border-radius: 5px;
    color: black;
    font-size: .8em;
    background-color: lightgray;
`;

