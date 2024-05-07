import styled from 'styled-components';

export const Input = styled.input`
    border: none;
    border-bottom: 1px solid gray;
    padding: 1em 0;
    margin-bottom: 0.6em;
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
    margin-bottom: 1em;
    font-family: 'Space Grotesk', sans-serif;
    font-size: .9em;
    opacity: 0.7;
    width: 100%;
    &:focus{
        outline: none;
    }
`

export const Label = styled.label`
    font-size: .8em;
    font-family: 'Space Grotesk', sans-serif;
`

export const Select = styled.select`
    border: 1px solid gray;
    // padding: 1em 0;
    // height: 100px;
    margin-bottom: 1em;
    opacity: 0.7;
    font-family: 'Space Grotesk', sans-serif;
    font-size: .8em;
    width: 100%;
    &:focus{
        outline: none;
    }
`