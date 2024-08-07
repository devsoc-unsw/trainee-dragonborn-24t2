import './HomePage.css';
import '../styles.css';
import TripCard from '../components/TripCard';
import TripCountdown from '../components/TripCountdown'



const HomePage = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <p>Countdown to your next trip:</p>
        <TripCountdown tripDate={new Date('2024-12-25')} /> {/*calc date from active trips???*/}
      </div>
      <div className="right-section">
        <p>trip cards tbd</p>
        <TripCard
          title="solo travellign japan"
          location="Japan"
          imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/230210161917-01-japan-never-traveler-culture-tokyo.jpg?c=16x9&q=h_833,w_1480,c_fill"
          linkTo='/'/>
      </div>
    </div>
  );
};

export default HomePage;
