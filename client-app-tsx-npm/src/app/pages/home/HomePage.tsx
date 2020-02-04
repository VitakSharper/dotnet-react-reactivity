import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Segment, Container, Header, Button, Image, Icon} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import LoginForm from "../../components/Forms/LoginForm.component";
import RegisterForm from "../../components/Forms/RegisterForm.component";

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;
    const {modalState} = rootStore.modalStore;

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image
                        size="massive"
                        src="/assets/logo.png"
                        alt="logo"
                    />
                    Reactivities
                </Header>
                {
                    isLoggedIn && user ? <>
                            <Header as="h2" inverted content={`Welcome back ${user?.displayName}`}/>
                            <Button as={Link} to="/activities" size="huge" inverted>
                                Go to activities!
                            </Button>
                        </>
                        :
                        <>
                            <Header as="h2" inverted content="Welcome to Reactivities"/>
                            <Button.Group>
                                <Button animated inverted size="huge"
                                        onClick={() => modalState(<LoginForm/>, true)}
                                    //as={Link} to="/login"
                                    // loading={submitting}
                                    // disabled={invalid && !dirtySinceLastSubmit || pristine}
                                        type={'button'}>
                                    <Button.Content hidden><Icon name={'sign-in'}/></Button.Content>
                                    <Button.Content visible>
                                        Login
                                    </Button.Content>
                                </Button>
                                <Button.Or/>
                                <Button animated type={'button'} inverted size="huge"
                                        onClick={() => modalState(<RegisterForm/>, true)}
                                >
                                    <Button.Content hidden> <Icon name={'edit'}/></Button.Content>
                                    <Button.Content visible>
                                        Register
                                    </Button.Content>
                                </Button>
                            </Button.Group>
                        </>
                }
            </Container>
        </Segment>
    );
};

export default HomePage;
