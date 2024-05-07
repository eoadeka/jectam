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
        props.category === 'Frontend' ? 'lightgreen'
        : props.category === 'Backend' ? 'chocolate'
        : props.category === 'Planning' ? 'lightblue'
        : props.category === 'Review' ? 'gainsboro'
        : props.category === 'UI' ? 'lightpink'
        : props.category === 'QA' ? 'beige'
        : props.category === 'DevOps' ? 'lightpink'
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
        : props.status === 'On Hold' ? 'yellow'
        : props.status === 'Under Review' ? 'teal'
        : props.status === 'Done' ? 'lightgreen'
        : props.status === 'Cancelled' ? 'lightgray'
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

