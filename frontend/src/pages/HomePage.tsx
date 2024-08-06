import './HomePage.css';
import TripCard from '../components/TripCard';


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <p>Countdown to your next trip:</p>
        {/* Countdown timer component here */}
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
