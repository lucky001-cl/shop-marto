
import React from 'react';
import { HomeContainer,Container,CenteredRow,ContentColumn,Heading ,Paragraph,PrimaryButton} from "./styledComponents";
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import About from '../About';
import ContactUs from '../Contact';
import Header from '../Header';

const Home = () => {
  const onShop = () => {
    // Add your logic for the "Shop Now" button click
    console.log('Shop Now clicked');
  };

  return (
    <div>
      <Header/>
      <HomeContainer className="home-container" src="https://img.freepik.com/free-vector/online-grocery-store-banner-design_23-2150089535.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712534400&semt=ais">
      <Container>
        
        <CenteredRow>
          <ContentColumn>
            {/* <img src='https://img.freepik.com/free-vector/online-grocery-store-banner-design_23-2150089535.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712534400&semt=ais' /> */}
            <Heading>Welcome to Our Grocery Web App</Heading>
            <Paragraph>Discover a wide range of Grocery's and Fresh Items for all your needs</Paragraph>
            <PrimaryButton> <Link to='/shopping' style={{textDecoration:'none',color:'white',fontWeight:'bolder'}}>Shop Now</Link> </PrimaryButton>
          </ContentColumn>
        </CenteredRow>
      </Container>
    </HomeContainer>
    <About/>
    <ContactUs/>
    <Footer/>
    </div>
  );
}

export default Home;
