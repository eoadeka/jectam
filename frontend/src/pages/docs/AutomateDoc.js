import React from 'react';
import { GoDotFill } from "react-icons/go";
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import Container from '../../components/layout/Container';
import Editor from '../../components/editor/Editor';


const AutomateDoc = () => {
    const dotFill = { verticalAlign: "middle" };

    return (
        <div>
            <Container>
                <PageHeaderDiv>
                <PageTitleDiv>
                    <PageTitle>Automate Doc</PageTitle>
                    <small>AutoTasker  <GoDotFill style={dotFill} /> Benefits Management Approach  <GoDotFill style={dotFill} /> Version 1</small>
                </PageTitleDiv>
                <PageTitleDiv>
                <PageTitleSpan> <small style={{textDecoration:"underline"}}>view all versions</small></PageTitleSpan>
                </PageTitleDiv>
                </PageHeaderDiv>

                <Editor />
            </Container>
        </div>
    );
}

export default AutomateDoc;