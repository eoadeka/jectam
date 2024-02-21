import styled from 'styled-components';

export const Input = styled.input`
    border: none;
    border-bottom: 1px solid gray;
    padding: 1em 0;
    // margin-bottom: 1em;
    opacity: 0.7;
    font-family: 'Space Grotesk', sans-serif;
    width: 100%;
    &:focus{
        outline: none;
    }
`

export const TextArea = styled.textarea`
    border: none;
    border-bottom: 1px solid gray;
    padding: 1em 0;
    // margin: 1em 0;
    font-family: 'Space Grotesk', sans-serif;
    width: 100%;
    &:focus{
        outline: none;
    }
`
