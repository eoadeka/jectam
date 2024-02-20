import styled from 'styled-components';
import { IoHeartOutline } from "react-icons/io5";

const AddToFavBtn = styled.span`
    position: absolute;
    left: 1em;
    bottom: 1em;
`

const AddToFavorites = () => {
    const style = { fontSize: "1em", verticalAlign: "middle", fontFamily: "'Space Grotesk', sans-serif" };
    return (
        <div>
            <AddToFavBtn><IoHeartOutline style={style} /></AddToFavBtn>
        </div>
    )
}

export default AddToFavorites;